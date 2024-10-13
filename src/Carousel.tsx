import "./Carousel.scss";

import {
  Children,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import clsx from "classnames";
import useMeasure from "./hooks/useMeasure";

import CarouselArrows from "./CarouselArrows";
import CarouselDots, { DotRenderFnProps } from "./CarouselDots";
import { clamp } from "./utils/mathUtils";

export interface CarouselProps extends PropsWithChildren {
  shownSlides?: number;
  transitionDuration?: number;
  containerClassName?: string;
  trackClassName?: string;
  slideClassName?: string;
  disableTranslate?: boolean;
  dotsGradient?: boolean;
  dotsFixed?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
  noActiveSlide?: boolean;
  fitHeight?: boolean;
  centered?: boolean;
  transition?: "slide" | "fade";
  keyboardNavigation?: boolean;
  dotRender?: (props: DotRenderFnProps) => ReactNode;
  customDots?:
    | ((props: {
        dots: number;
        activeDot: number;
        onDotClick?: (index: number) => void;
      }) => JSX.Element)
    | null;
  customArrows?:
    | ((props: {
        onNextClick: () => void;
        onPrevClick: () => void;
      }) => JSX.Element)
    | null;
  onSlideChange?: (index: number) => void;
}

export interface CarouselRef {
  nextSlide: () => void;
  prevSlide: () => void;
  setSlide: (index: number) => void;
}

const Carousel = forwardRef<CarouselRef, CarouselProps>(
  (
    {
      customDots,
      customArrows,
      onSlideChange,
      dotRender,
      children,
      containerClassName,
      trackClassName,
      slideClassName,
      disableTranslate,
      fitHeight = false,
      noActiveSlide = false,
      transitionDuration = 0.3,
      shownSlides: shownSlidesProp = 1,
      centered = false,
      autoPlay = false,
      autoPlayInterval = 3,
      dotsFixed,
      dotsGradient,
      pauseOnHover,
      transition = "slide",
      keyboardNavigation = true,
    }: CarouselProps,
    ref,
  ) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const containerReactRef = useRef<HTMLDivElement | null>(null);
    const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const shownSlides = useMemo(
      () => Math.max(shownSlidesProp, 1),
      [shownSlidesProp],
    );

    const [containerRef, { width }] = useMeasure();
    const containerWidth = useMemo(() => width ?? 0, [width]);

    const [currentSlide, setCurrentSlide] = useState(0);

    const [dragStart, setDragStart] = useState({
      x: 0,
      y: 0,
      timestamp: 0,
    });
    const [dragging, setDragging] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    /** Maximum offset when dragging */
    const maxDragOffset = useMemo(() => containerWidth, [containerWidth]);
    /** Maximum offset when dragging out of bounds on last or first slide */
    const maxDragOffsetEnd = useMemo(
      () => containerWidth / 5,
      [containerWidth],
    );

    const mappedChildren = useMemo(
      () => Children.toArray(children).filter(Boolean),
      [children],
    );

    /** Total number of slides */
    const slides = useMemo(() => {
      if (noActiveSlide) {
        return Math.ceil(mappedChildren.length / shownSlides + 0.1);
      } else {
        return mappedChildren.length;
      }
    }, [mappedChildren, shownSlides, noActiveSlide]);

    const slideWidth = useMemo(
      () => containerWidth / shownSlides,
      [containerWidth, shownSlides],
    );

    // ! ############################### Slide change logic

    const onDotClick = useCallback((index: number) => {
      handleSetSlide(index);
    }, []);

    const onPrevClick = useCallback(() => {
      resetAutoPlay();
      setCurrentSlide((slide) => (slide - 1 + slides) % slides);
    }, [slides]);

    const onNextClick = useCallback(() => {
      resetAutoPlay();
      setCurrentSlide((slide) => (slide + 1) % slides);
    }, [slides]);

    const handleSetSlide = useCallback(
      (index: number) => {
        resetAutoPlay();
        setCurrentSlide((index + slides) % slides);
      },
      [slides],
    );

    useImperativeHandle(ref, () => ({
      nextSlide: onNextClick,
      prevSlide: onPrevClick,
      setSlide: handleSetSlide,
    }));

    // ! ############################### Dragging logic

    const translateX = useMemo(() => {
      if (disableTranslate) return 0;
      if (shownSlides >= slides && !noActiveSlide) {
        if (centered) {
          const emptySpace = containerWidth - slideWidth * slides;
          return -emptySpace / 2;
        }
        return 0;
      }
      const maxTranslateX =
        (slides - shownSlides) * (containerWidth / shownSlides);
      const calculatedTranslateX =
        currentSlide * (containerWidth / shownSlides);

      if (noActiveSlide) {
        return calculatedTranslateX;
      }

      if (centered) {
        const centerOffset = (containerWidth - slideWidth) / 2;
        return calculatedTranslateX - centerOffset;
      }

      return Math.min(calculatedTranslateX, maxTranslateX);
    }, [
      currentSlide,
      containerWidth,
      shownSlides,
      slides,
      slideWidth,
      centered,
      noActiveSlide,
    ]);

    const handleDragStart = useCallback((event: MouseEvent | TouchEvent) => {
      const clientX =
        "touches" in event ? event.touches[0].clientX : event.clientX;
      const clientY =
        "touches" in event ? event.touches[0].clientY : event.clientY;

      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }

      setDragStart({ x: clientX, y: clientY, timestamp: Date.now() });
    }, []);

    const handleDragMove = useCallback(
      (event: MouseEvent | TouchEvent) => {
        if (!trackRef.current || scrolling) return;

        const clientX =
          "touches" in event ? event.touches[0].clientX : event.clientX;

        const dragOffsetX = clientX - dragStart.x;

        if (!dragging && Math.abs(dragOffsetX) > 10) {
          setDragging(true);
        }

        if (!dragging) return;

        event.preventDefault();
        event.stopPropagation();

        if (transition === "fade") return;
        trackRef.current.style.transform = `translateX(${
          -translateX +
          clamp(
            dragOffsetX,
            currentSlide === slides - shownSlides
              ? -maxDragOffsetEnd
              : -maxDragOffset,
            currentSlide === 0 ? maxDragOffsetEnd : maxDragOffset,
          )
        }px)`;
      },
      [
        dragging,
        dragStart.x,
        dragStart.y,
        translateX,
        trackRef.current,
        containerWidth,
        scrolling,
        transition,
      ],
    );

    const handleDragEnd = useCallback(
      (event: MouseEvent | TouchEvent) => {
        if (!dragging) return;

        const clientX =
          "touches" in event ? event.changedTouches[0].clientX : event.clientX;
        const dragOffset = clientX - dragStart.x;

        // Maximum allowable translation in pixels
        const maxTranslateX =
          (containerWidth * (slides - shownSlides)) / shownSlides;

        // Determine the new slide index based on drag offset
        let newSlide = currentSlide;
        if (
          dragOffset > containerWidth / 2 ||
          (Date.now() - dragStart.timestamp < 200 && dragOffset > 20)
        ) {
          newSlide = Math.max(0, currentSlide - 1);
        } else if (
          dragOffset < -containerWidth / 2 ||
          (Date.now() - dragStart.timestamp < 200 && dragOffset < -20)
        ) {
          newSlide = Math.min(slides - shownSlides, currentSlide + 1);
        }

        resetAutoPlay();
        setCurrentSlide(newSlide);
        setDragging(false);

        // Snap the track back to the nearest slide
        if (trackRef.current && transition === "slide") {
          const newTranslateX = Math.max(
            0,
            Math.min(maxTranslateX, (newSlide * containerWidth) / shownSlides),
          );
          trackRef.current.style.transform = `translateX(-${newTranslateX}px)`;
        }
      },
      [
        dragging,
        dragStart.x,
        containerWidth,
        slides,
        shownSlides,
        currentSlide,
        trackRef.current,
        transition,
      ],
    );

    const trackStyle = useMemo(() => {
      if (!disableTranslate) {
        return {
          transform: `translateX(${-translateX}px)`,
          transitionDuration: `${dragging ? 0.05 : transitionDuration}s`,
          transitionTimingFunction: dragging ? "linear" : undefined,
          height: fitHeight ? "fit-content" : undefined,
        };
      }
      return undefined;
    }, [translateX, transitionDuration, disableTranslate, dragging]);

    // ! ############################### Misc event handlers

    const handleScroll = () => {
      setScrolling(true);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(handleScrollEnd, 300);
    };

    const handleScrollEnd = () => {
      setScrolling(false);
    };

    const handleKeyPress = useCallback(
      (event: KeyboardEvent) => {
        if (keyboardNavigation) {
          if (event.key === "ArrowRight") {
            onNextClick();
          }
          if (event.key === "ArrowLeft") {
            onPrevClick();
          }
        }
      },
      [keyboardNavigation],
    );

    const resetAutoPlay = () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
      if (autoPlay) {
        autoPlayIntervalRef.current = setInterval(
          () => {
            onNextClick();
          },
          Math.max(autoPlayInterval * 1000, transitionDuration * 1000),
        );
      }
    };

    const handleMouseEnter = () => {
      if (autoPlay && autoPlayIntervalRef.current && pauseOnHover) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };

    const handleMouseLeave = () => {
      if (autoPlay && pauseOnHover) {
        resetAutoPlay();
      }
    };

    // ! ############################### Effects

    useEffect(() => {
      if (containerReactRef.current) {
        containerReactRef.current.addEventListener(
          "touchstart",
          handleDragStart,
        );
        containerReactRef.current.addEventListener("touchmove", handleDragMove);
        containerReactRef.current.addEventListener("touchend", handleDragEnd);
        window.addEventListener("scroll", handleScroll);
        return () => {
          containerReactRef.current?.removeEventListener(
            "touchstart",
            handleDragStart,
          );
          containerReactRef.current?.removeEventListener(
            "touchmove",
            handleDragMove,
          );
          containerReactRef.current?.removeEventListener(
            "touchend",
            handleDragEnd,
          );
          window.removeEventListener("scroll", handleScroll);
        };
      }
    }, [handleDragStart, handleDragMove, handleDragEnd]);

    useEffect(() => {
      if (containerReactRef.current) {
        containerReactRef.current.addEventListener(
          "mouseenter",
          handleMouseEnter,
        );
        containerReactRef.current.addEventListener(
          "mouseleave",
          handleMouseLeave,
        );

        return () => {
          containerReactRef.current?.removeEventListener(
            "mouseenter",
            handleMouseEnter,
          );
          containerReactRef.current?.removeEventListener(
            "mouseleave",
            handleMouseLeave,
          );
        };
      }
    }, [containerReactRef, autoPlay, pauseOnHover]);

    useEffect(() => {
      resetAutoPlay();
      return () => {
        if (autoPlayIntervalRef.current) {
          clearInterval(autoPlayIntervalRef.current);
        }
      };
    }, [autoPlay, autoPlayInterval]);

    useEffect(() => {
      onSlideChange?.(currentSlide);
    }, [currentSlide]);

    useEffect(() => {
      window.addEventListener("keydown", handleKeyPress);
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }, [handleKeyPress]);

    return (
      <div
        ref={(node) => {
          containerReactRef.current = node;
          containerRef(node);
        }}
        className={clsx("Carousel", containerClassName)}
        style={{
          height: fitHeight ? "fit-content" : undefined,
        }}
      >
        {transition === "fade" && (
          <div
            ref={trackRef}
            className={clsx("Carousel__fadeTrack", trackClassName)}
          >
            {Children.toArray(children)
              .filter(Boolean)
              .map((child, i) => (
                <div
                  key={`slide-${i}`}
                  data-index={i}
                  style={{
                    opacity: currentSlide === i ? 1 : 0,
                    transition: `opacity ${transitionDuration}s ease-in-out`,
                    position: currentSlide === i ? "relative" : "absolute",
                    width: "100%",
                    pointerEvents: currentSlide === i ? "auto" : "none",
                  }}
                  className={clsx({
                    Carousel__slide: true,
                    "Carousel__slide--active":
                      currentSlide === i && !noActiveSlide,
                    ...(slideClassName && {
                      [slideClassName]: true,
                      [`${slideClassName}--active`]:
                        currentSlide === i && !noActiveSlide,
                    }),
                  })}
                >
                  {child}
                </div>
              ))}
          </div>
        )}

        {transition === "slide" && (
          <div
            ref={trackRef}
            style={trackStyle}
            className={clsx("Carousel__track", trackClassName)}
          >
            {Children.toArray(children)
              .filter(Boolean)
              .map((child, i) => {
                return (
                  <div
                    key={`slide-${i}`}
                    data-index={i}
                    style={{
                      width: slideWidth,
                    }}
                    className={clsx({
                      Carousel__slide: true,
                      "Carousel__slide--dragging": dragging,
                      "Carousel__slide--active":
                        currentSlide === i && !noActiveSlide,

                      ...(slideClassName && {
                        [slideClassName]: true,
                        [`${slideClassName}--dragging`]: dragging,
                        [`${slideClassName}--active`]:
                          currentSlide === i && !noActiveSlide,
                      }),
                    })}
                  >
                    {child}
                  </div>
                );
              })}
          </div>
        )}
        {customDots &&
          customDots({
            dots: slides,
            activeDot: currentSlide,
            onDotClick: onDotClick,
          })}

        {!customDots && customDots !== null && (
          <CarouselDots
            dots={slides}
            activeDot={currentSlide}
            onDotClick={onDotClick}
            fixed={dotsFixed}
            gradient={dotsGradient}
            dotRender={dotRender}
            transitionDuration={transitionDuration}
          />
        )}

        {customArrows && customArrows({ onNextClick, onPrevClick })}
        {!customArrows && customArrows !== null && (
          <CarouselArrows onNextClick={onNextClick} onPrevClick={onPrevClick} />
        )}
      </div>
    );
  },
);

export default Carousel;

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
import useMeasure from "react-use-measure";

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
      transitionDuration = 0.3,
      shownSlides = 1,
      dotsFixed,
      dotsGradient,
    }: CarouselProps,
    ref,
  ) => {
    const [containerRef, containerBounds] = useMeasure({ debounce: 100 });
    const trackRef = useRef<HTMLDivElement>(null);

    const [currentSlide, setCurrentSlide] = useState(0);

    const [dragStartX, setDragStartX] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [disableDrag, setDisableDrag] = useState(false);

    /** Maximum offset when dragging */
    const maxDragOffset = useMemo(
      () => containerBounds.width,
      [containerBounds.width],
    );
    /** Maximum offset when dragging out of bounds on last or first slide */
    const maxDragOffsetEnd = useMemo(
      () => containerBounds.width / 5,
      [containerBounds.width],
    );

    /** Total number of slides */
    const slides = useMemo(() => Children.count(children), [children]);

    // Slide change logic

    const onDotClick = useCallback((index: number) => {
      setCurrentSlide(index);
    }, []);

    const onPrevClick = useCallback(() => {
      setCurrentSlide((slide) => (slide - 1 + slides) % slides);
    }, [slides]);

    const onNextClick = useCallback(() => {
      setCurrentSlide((slide) => (slide + 1) % slides);
    }, [slides]);

    const handleSetSlide = useCallback((index: number) => {
      setCurrentSlide((index + slides) % slides);
    }, []);

    useImperativeHandle(ref, () => ({
      nextSlide: onNextClick,
      prevSlide: onPrevClick,
      setSlide: handleSetSlide,
    }));

    useEffect(() => {
      onSlideChange?.(currentSlide);
    }, [currentSlide]);

    // Dragging logic

    const translateX = useMemo(() => {
      if (slides <= shownSlides) {
        return 0;
      }
      const maxTranslateX =
        (slides - shownSlides) * (containerBounds.width / shownSlides);
      const calculatedTranslateX =
        currentSlide * (containerBounds.width / shownSlides);
      return Math.min(calculatedTranslateX, maxTranslateX);
    }, [currentSlide, containerBounds.width, shownSlides, slides]);

    const handleDragStart = useCallback(
      (event: React.MouseEvent | React.TouchEvent) => {
        const clientX =
          "touches" in event ? event.touches[0].clientX : event.clientX;
        setDragStartX(clientX);
        setDragging(true);
      },
      [],
    );

    const handleDragMove = useCallback(
      (event: React.MouseEvent | React.TouchEvent) => {
        if (!dragging || !trackRef.current || disableDrag) return;

        const clientX =
          "touches" in event ? event.touches[0].clientX : event.clientX;
        const dragOffset = clientX - dragStartX;

        trackRef.current.style.transform = `translateX(${
          -translateX +
          clamp(
            dragOffset,
            currentSlide === slides - shownSlides
              ? -maxDragOffsetEnd
              : -maxDragOffset,
            currentSlide === 0 ? maxDragOffsetEnd : maxDragOffset,
          )
        }px)`;
      },
      [
        dragging,
        dragStartX,
        translateX,
        disableDrag,
        trackRef.current,
        containerBounds.width,
      ],
    );

    const handleDragEnd = useCallback(
      (event: React.MouseEvent | React.TouchEvent) => {
        if (!dragging) return;

        const clientX =
          "touches" in event ? event.changedTouches[0].clientX : event.clientX;
        const dragOffset = clientX - dragStartX;

        // Maximum allowable translation in pixels
        const maxTranslateX =
          (containerBounds.width * (slides - shownSlides)) / shownSlides;

        // Determine the new slide index based on drag offset
        let newSlide = currentSlide;
        if (dragOffset > containerBounds.width / 2) {
          newSlide = Math.max(0, currentSlide - 1);
        } else if (dragOffset < -containerBounds.width / 2) {
          newSlide = Math.min(slides - shownSlides, currentSlide + 1);
        }

        setCurrentSlide(newSlide);
        setDragging(false);

        // Snap the track back to the nearest slide
        if (trackRef.current) {
          const newTranslateX = Math.max(
            0,
            Math.min(
              maxTranslateX,
              (newSlide * containerBounds.width) / shownSlides,
            ),
          );
          trackRef.current.style.transform = `translateX(-${newTranslateX}px)`;
        }
      },
      [
        dragging,
        dragStartX,
        containerBounds.width,
        slides,
        shownSlides,
        currentSlide,
        trackRef.current,
      ],
    );

    const handleWindowScroll = () => {
      setDisableDrag(true);
    };

    const handleWindowScrollEnd = () => {
      setDisableDrag(false);
    };

    useEffect(() => {
      window.addEventListener("scroll", handleWindowScroll);
      window.addEventListener("scrollend", handleWindowScrollEnd);
      return () => {
        window.removeEventListener("scroll", handleWindowScroll);
        window.removeEventListener("scrollend", handleWindowScrollEnd);
      };
    }, []);

    const trackStyle = useMemo(() => {
      if (!disableTranslate) {
        return {
          transform: `translateX(${-translateX}px)`,
          transitionDuration: `${dragging ? 0.01 : transitionDuration}s`,
          transitionTimingFunction: dragging ? "linear" : undefined,
          touchAction: dragging ? "none" : undefined,
        };
      }
      return undefined;
    }, [translateX, transitionDuration, disableTranslate, dragging]);

    return (
      <div
        ref={containerRef}
        className={clsx("Carousel", containerClassName)}
        style={{
          touchAction: dragging ? "none" : undefined,
        }}
      >
        <div
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          ref={trackRef}
          style={trackStyle}
          className={clsx("Carousel__track", trackClassName)}
        >
          {Children.map(children, (child, i) => (
            <div
              key={`slide-${i}`}
              style={{
                width: containerBounds.width / shownSlides,
                height: containerBounds.height,
              }}
              className={clsx({
                Carousel__slide: true,
                "Carousel__slide--dragging": dragging,
                "Carousel__slide--active": currentSlide === i,

                ...(slideClassName && {
                  [slideClassName]: true,
                  [`${slideClassName}--dragging`]: dragging,
                  [`${slideClassName}--active`]: currentSlide === i,
                }),
              })}
            >
              {child}
            </div>
          ))}
        </div>

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

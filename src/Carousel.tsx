import "./Carousel.scss";

import {
  Children,
  forwardRef,
  PropsWithChildren,
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
import CarouselDots from "./CarouselDots";

export interface CarouselProps extends PropsWithChildren {
  shownSlides?: number;
  transitionDuration?: number;
  containerClassName?: string;
  trackClassName?: string;
  slideClassName?: string;
  disableTranslate?: boolean;
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
}

const Carousel = forwardRef<CarouselRef, CarouselProps>(
  (
    {
      customDots,
      customArrows,
      onSlideChange,
      children,
      containerClassName,
      trackClassName,
      slideClassName,
      disableTranslate,
      transitionDuration = 0.3,
      shownSlides = 1,
    }: CarouselProps,
    ref,
  ) => {
    const [containerRef, containerBounds] = useMeasure();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragging, setDragging] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    const slides = useMemo(() => Children.count(children), [children]);

    const onDotClick = useCallback((index: number) => {
      setCurrentSlide(index);
    }, []);

    const onPrevClick = useCallback(() => {
      setCurrentSlide((slide) => (slide - 1 + slides) % slides);
    }, [slides]);

    const onNextClick = useCallback(() => {
      setCurrentSlide((slide) => (slide + 1) % slides);
    }, [slides]);

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
        if (!dragging || !trackRef.current) return;
        const clientX =
          "touches" in event ? event.touches[0].clientX : event.clientX;
        const dragOffset = clientX - dragStartX;

        trackRef.current.style.transform = `translateX(${-translateX + dragOffset}px)`;
      },
      [dragging, dragStartX, translateX, trackRef.current],
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

    useEffect(() => {
      onSlideChange?.(currentSlide);
    }, [currentSlide]);

    useImperativeHandle(ref, () => ({
      nextSlide: onNextClick,
      prevSlide: onPrevClick,
    }));

    const trackStyle = useMemo(() => {
      if (!disableTranslate) {
        return {
          transform: `translateX(-${translateX}px)`,
          transition: `transform ${transitionDuration}s`,
        };
      }
      return undefined;
    }, [translateX, transitionDuration, disableTranslate]);

    return (
      <div
        ref={containerRef}
        className={clsx({ Carousel: !containerClassName }, containerClassName)}
      >
        <div
          ref={trackRef}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={trackStyle}
          className={clsx({ Carousel__track: !trackClassName }, trackClassName)}
        >
          {Children.map(children, (child, i) => (
            <div
              style={{
                width: containerBounds.width / shownSlides,
                height: containerBounds.height,
              }}
              className={clsx({
                ...(!slideClassName && {
                  Carousel__slide: true,
                  "Carousel__slide--dragging": dragging,
                  "Carousel__slide--active": currentSlide === i,
                }),
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

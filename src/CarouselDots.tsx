import "./CarouselDots.scss";

import { memo, useCallback, useMemo } from "react";

import clsx from "classnames";
import useMeasure from "react-use-measure";

export interface CarouselDotsProps {
  dots: number;
  activeDot: number;
  containerClassName?: string;
  wrapperClassName?: string;
  trackClassName?: string;
  dotClassName?: string;
  onDotClick?: (dot: number) => void;
}

const CarouselDots = ({
  dots,
  activeDot,
  containerClassName,
  trackClassName,
  wrapperClassName,
  dotClassName,
  onDotClick: onDotClickProp,
}: CarouselDotsProps) => {
  const [containerRef, containerBounds] = useMeasure();
  const [trackRef, trackBounds] = useMeasure();
  const [dotRef, dotBounds] = useMeasure();

  const dotsArray = useMemo(
    () => Array.from({ length: dots }, (_, index) => index),
    [dots],
  );

  const translateX = useMemo(
    () =>
      containerBounds.width / 2 -
      trackBounds.width / dots / 2 -
      (trackBounds.width / dots) * activeDot,
    [
      containerBounds.width,
      dotBounds.width,
      activeDot,
      trackBounds.width,
      dots,
    ],
  );

  const onDotClick = useCallback((dot: number) => {
    onDotClickProp?.(dot);
  }, []);

  return (
    <div
      className={clsx({ CarouselDots: !wrapperClassName }, wrapperClassName)}
    >
      <div
        ref={containerRef}
        className={clsx(
          { CarouselDots__container: !containerClassName },
          containerClassName,
        )}
      >
        <div
          ref={trackRef}
          style={{
            transform: `translateX(${translateX}px)`,
          }}
          className={clsx(
            { CarouselDots__track: !trackClassName },
            trackClassName,
          )}
        >
          {dotsArray.map((dot) => (
            <div
              onClick={() => onDotClick?.(dot)}
              ref={dotRef}
              key={dot}
              className={clsx({
                CarouselDots__dot: !dotClassName,
                "CarouselDots__dot--active": dot === activeDot && !dotClassName,
                ...(dotClassName && {
                  [dotClassName]: true,
                  [`${dotClassName}--active`]: dot === activeDot,
                }),
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(CarouselDots);

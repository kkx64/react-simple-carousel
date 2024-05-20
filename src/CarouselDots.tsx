import "./CarouselDots.scss";

import { memo, useCallback, useMemo } from "react";

import clsx from "classnames";
import useMeasure from "react-use-measure";

export interface DotRenderFnProps {
  dot: number;
  isActive: boolean;
  ref: (element: HTMLElement | null) => void;
  onDotClick?: (index: number) => void;
}
export interface CarouselDotsProps {
  dots: number;
  activeDot: number;
  containerClassName?: string;
  wrapperClassName?: string;
  trackClassName?: string;
  dotClassName?: string;
  gradient?: boolean;
  fixed?: boolean;
  transitionDuration?: number;
  onDotClick?: (dot: number) => void;
  dotRender?: (props: DotRenderFnProps) => React.ReactNode;
}

const CarouselDots = ({
  dots,
  activeDot,
  containerClassName,
  trackClassName,
  wrapperClassName,
  dotClassName,
  gradient,
  fixed,
  transitionDuration,
  onDotClick: onDotClickProp,
  dotRender,
}: CarouselDotsProps) => {
  const [containerRef, containerBounds] = useMeasure({ debounce: 100 });
  const [trackRef, trackBounds] = useMeasure({ debounce: 100 });
  const [dotRef, dotBounds] = useMeasure({ debounce: 100 });

  const dotsArray = useMemo(
    () => Array.from({ length: dots }, (_, index) => index),
    [dots],
  );

  const dotGap = useMemo(
    () => (trackBounds.width - dotBounds.width * dots) / (dots - 1),
    [dotBounds.width],
  );

  const translateOffsetLeft = useMemo(
    () => containerBounds.width / 2 - dotBounds.width / 2,
    [containerBounds.width, trackBounds.width],
  );

  const translateX = useMemo(
    () => translateOffsetLeft - (dotBounds.width + dotGap) * activeDot,
    [translateOffsetLeft, activeDot, dots],
  );

  const onDotClick = useCallback((dot: number) => {
    onDotClickProp?.(dot);
  }, []);

  return (
    <div
      style={{
        width: fixed
          ? "fit-content"
          : `min(${dotBounds.width * 3 + 36}px, 80%)`,
      }}
      className={clsx("CarouselDots", wrapperClassName)}
    >
      <div
        ref={containerRef}
        className={clsx(
          "CarouselDots__container",
          {
            "CarouselDots__container--no-gradient":
              gradient === false || fixed === true,
          },
          containerClassName,
        )}
      >
        <div
          ref={trackRef}
          style={{
            ...(!fixed && { transform: `translateX(${translateX}px)` }),
            transitionDuration: transitionDuration
              ? `${transitionDuration}s`
              : undefined,
          }}
          className={clsx("CarouselDots__track", trackClassName)}
        >
          {dotsArray.map((dot) =>
            dotRender ? (
              dotRender({
                dot,
                isActive: dot === activeDot,
                ref: dotRef,
                onDotClick: onDotClick,
              })
            ) : (
              <div
                onClick={() => onDotClick?.(dot)}
                ref={dotRef}
                key={`dot-${dot}`}
                className={clsx("CarouselDots__dot", {
                  "CarouselDots__dot--active":
                    dot === activeDot && !dotClassName,
                  ...(dotClassName && {
                    [dotClassName]: true,
                    [`${dotClassName}--active`]: dot === activeDot,
                  }),
                })}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(CarouselDots);

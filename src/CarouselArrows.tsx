import { memo } from "react";
import "./CarouselArrows.scss";

import clsx from "classnames";

import ArrowIcon from "./icons/ArrowIcon";

export interface CarouselArrowsProps {
  onNextClick: () => void;
  onPrevClick: () => void;
  arrowRender?: (props: { direction: "prev" | "next" }) => JSX.Element;
  containerClassName?: string;
  arrowClassName?: string;
  wrapperClassName?: string;
}

const CarouselArrows = ({
  onNextClick,
  onPrevClick,
  wrapperClassName,
  containerClassName,
  arrowClassName,
  arrowRender,
}: CarouselArrowsProps) => {
  return (
    <div className={clsx("CarouselArrows", wrapperClassName)}>
      <div className={clsx("CarouselArrows__container", containerClassName)}>
        <button
          onClick={onPrevClick}
          className={clsx("CarouselArrows__arrow", {
            "CarouselArrows__arrow--prev CarouselArrows__styledArrow":
              !arrowRender,
            ...(arrowClassName && {
              [arrowClassName]: true,
              [`${arrowClassName}--prev`]: true,
            }),
          })}
        >
          {arrowRender?.({ direction: "prev" }) || <ArrowIcon />}
        </button>
        <button
          onClick={onNextClick}
          className={clsx("CarouselArrows__arrow", {
            "CarouselArrows__arrow--next CarouselArrows__styledArrow":
              !arrowRender,
            ...(arrowClassName && {
              [arrowClassName]: true,
              [`${arrowClassName}--next`]: true,
            }),
          })}
        >
          {arrowRender?.({ direction: "next" }) || <ArrowIcon />}
        </button>
      </div>
    </div>
  );
};

export default memo(CarouselArrows);

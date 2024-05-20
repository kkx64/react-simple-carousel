import { memo } from "react";
import "./CarouselArrows.scss";

import clsx from "classnames";

import ArrowIcon from "./icons/ArrowIcon";

export interface CarouselArrowsProps {
  onNextClick: () => void;
  onPrevClick: () => void;
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
}: CarouselArrowsProps) => {
  return (
    <div className={clsx("CarouselArrows", wrapperClassName)}>
      <div className={clsx("CarouselArrows__container", containerClassName)}>
        <button
          onClick={onPrevClick}
          className={clsx("CarouselArrows__arrow CarouselArrows__arrow--prev", {
            ...(arrowClassName && {
              [arrowClassName]: true,
              [`${arrowClassName}--prev`]: true,
            }),
          })}
        >
          <ArrowIcon />
        </button>
        <button
          onClick={onNextClick}
          className={clsx({
            "CarouselArrows__arrow CarouselArrows__arrow--next":
              !arrowClassName,
            ...(arrowClassName && {
              [arrowClassName]: true,
              [`${arrowClassName}--next`]: true,
            }),
          })}
        >
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
};

export default memo(CarouselArrows);

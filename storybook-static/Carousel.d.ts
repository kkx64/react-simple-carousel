import { PropsWithChildren } from '../node_modules/.pnpm/react@18.3.1/node_modules/react';

export interface CarouselProps extends PropsWithChildren {
    shownSlides?: number;
    transitionDuration?: number;
    containerClassName?: string;
    trackClassName?: string;
    slideClassName?: string;
    disableTranslate?: boolean;
    customDots?: ((props: {
        dots: number;
        activeDot: number;
        onDotClick?: (index: number) => void;
    }) => JSX.Element) | null;
    customArrows?: ((props: {
        onNextClick: () => void;
        onPrevClick: () => void;
    }) => JSX.Element) | null;
    onSlideChange?: (index: number) => void;
}
export interface CarouselRef {
    nextSlide: () => void;
    prevSlide: () => void;
}
declare const Carousel: import('../node_modules/.pnpm/react@18.3.1/node_modules/react').ForwardRefExoticComponent<CarouselProps & import('../node_modules/.pnpm/react@18.3.1/node_modules/react').RefAttributes<CarouselRef>>;
export default Carousel;


export interface CarouselDotsProps {
    dots: number;
    activeDot: number;
    containerClassName?: string;
    wrapperClassName?: string;
    trackClassName?: string;
    dotClassName?: string;
    onDotClick?: (dot: number) => void;
}
declare const _default: import('../node_modules/.pnpm/react@18.3.1/node_modules/react').MemoExoticComponent<({ dots, activeDot, containerClassName, trackClassName, wrapperClassName, dotClassName, onDotClick: onDotClickProp, }: CarouselDotsProps) => import("react/jsx-runtime").JSX.Element>;
export default _default;

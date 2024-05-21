import { MutableRefObject, useEffect, useRef, useState } from "react";

const useMeasure = () => {
  const observer = useRef<ResizeObserver | null>(null);
  const measureRef: MutableRefObject<HTMLElement | null> =
    useRef<HTMLElement | null>(null);

  const setRef = (element: HTMLElement | null) => {
    measureRef.current = element;
  };

  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  const onResize = ([entry]: ResizeObserverEntry[]) => {
    if (!entry) return;
    if (entry.contentRect.width !== width) setWidth(entry.contentRect.width);
    if (entry.contentRect.height !== height)
      setHeight(entry.contentRect.height);
  };

  useEffect(() => {
    if (observer && observer.current && measureRef.current) {
      observer.current.unobserve(measureRef.current);
    }
    observer.current = new ResizeObserver(onResize);
    observe();

    return () => {
      if (observer.current && measureRef.current) {
        observer.current.unobserve(measureRef.current);
      }
    };
  }, [measureRef.current]);

  const observe = () => {
    if (measureRef.current && observer.current) {
      observer.current.observe(measureRef.current);
    }
  };

  return [setRef, { width, height }] as const;
};

export default useMeasure;

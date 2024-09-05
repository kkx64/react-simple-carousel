import { useCallback, useEffect, useRef, useState } from "react";

const useMeasure = () => {
  const [observer, setObserver] = useState<ResizeObserver | null>(null);
  const measureRef = useRef<HTMLElement | null>(null);

  const [dimensions, setDimensions] = useState<{
    width: number | null;
    height: number | null;
  }>({
    width: null,
    height: null,
  });

  const onResize = useCallback((entries: ResizeObserverEntry[]) => {
    const entry = entries[0];
    if (entry) {
      const { width, height } = entry.contentRect;
      setDimensions({ width, height });
    }
  }, []);

  const setRef = useCallback(
    (element: HTMLElement | null) => {
      if (measureRef.current) {
        observer?.unobserve(measureRef.current);
      }

      measureRef.current = element;

      if (element) {
        observer?.observe(element);
      }
    },
    [observer],
  );

  useEffect(() => {
    const newObserver = new ResizeObserver(onResize);
    setObserver(newObserver);

    return () => {
      newObserver.disconnect();
    };
  }, [onResize]);

  useEffect(() => {
    if (measureRef.current && observer) {
      observer.observe(measureRef.current);
    }

    return () => {
      if (measureRef.current) {
        observer?.unobserve(measureRef.current);
      }
    };
  }, [observer]);

  return [setRef, dimensions] as const;
};

export default useMeasure;

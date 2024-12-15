import {
  animate,
  KeyframeOptions,
  useIsomorphicLayoutEffect,
} from "framer-motion";
import React, { useRef } from "react";

type GTCounterProps = {
  options?: KeyframeOptions;
  to: number;
};

const GTCounter = ({ options, to }: GTCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const fromRef = useRef<number>(to);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const from = fromRef.current;

    const controls = animate(from, to, {
      duration: 0.5,
      ease: "easeOut",
      ...options,
      onUpdate(value) {
        element.textContent = value.toFixed(0);
      },
    });

    fromRef.current = to;

    return () => controls.stop();
  }, [ref, to]);

  return to > 0 && <span ref={ref} />;
};

export default GTCounter;

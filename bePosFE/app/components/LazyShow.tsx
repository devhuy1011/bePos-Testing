"use client";

import { motion, useAnimation, AnimationControls } from "framer-motion";
import React, { useEffect, useRef } from "react";

function useOnScreen(
  ref: React.RefObject<HTMLElement>,
  rootMargin = "0px"
): boolean {
  const [isIntersecting, setIntersecting] = React.useState(false);

  useEffect(() => {
    let currentRef: HTMLElement | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );

    if (ref.current) {
      currentRef = ref.current;
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}

interface LazyShowProps {
  children: React.ReactNode;
}

const LazyShow: React.FC<LazyShowProps> = ({ children }) => {
  const controls = useAnimation();
  const rootRef = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(rootRef);

  useEffect(() => {
    if (onScreen) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      });
    }
  }, [onScreen, controls]);

  return (
    <motion.div
      className="lazy-div"
      ref={rootRef}
      initial={{ opacity: 0, x: -10 }}
      animate={controls as AnimationControls}
    >
      {children}
    </motion.div>
  );
};

export default LazyShow;

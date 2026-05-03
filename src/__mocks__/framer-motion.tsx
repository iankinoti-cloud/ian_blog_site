import React from 'react';

// Minimal stub so Vite can resolve the import at transform time.
// vi.mock('framer-motion', factory) in the test overrides this entirely at runtime.

const createComponent = (tag: string) =>
  React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & Record<string, unknown>>(
    function MotionComponent({ children, ...props }, ref) {
      const domProps: Record<string, unknown> = {};
      const strip = new Set([
        'initial','animate','exit','variants','transition',
        'whileHover','whileTap','whileFocus','whileDrag','whileInView',
        'viewport','drag','dragConstraints','dragElastic','dragMomentum',
        'onHoverStart','onHoverEnd','onDragStart','onDragEnd',
        'layout','layoutId','suppressHydrationWarning',
      ]);
      for (const [k, v] of Object.entries(props)) {
        if (!strip.has(k)) domProps[k] = v;
      }
      return React.createElement(tag, { ...domProps, ref }, children);
    }
  );

export const motion = new Proxy({} as Record<string, ReturnType<typeof createComponent>>, {
  get: (_, tag: string) => createComponent(tag),
});

export const AnimatePresence = ({ children }: { children?: React.ReactNode }) =>
  React.createElement(React.Fragment, null, children);

export const useAnimation = () => ({
  start: () => Promise.resolve(),
  stop: () => {},
  set: () => {},
});

export const useInView = () => [React.createRef<HTMLElement>(), true] as const;

export const useScroll = () => ({
  scrollY: { get: () => 0 },
  scrollYProgress: { get: () => 0 },
});

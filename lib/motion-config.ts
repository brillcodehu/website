// Framer Motion performance optimizations
export const motionConfig = {
  // Reduce animations on low-end devices or when user prefers reduced motion
  reducedMotion: typeof window !== 'undefined' && 
    (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),
  
  // Default transition settings for better performance
  defaultTransition: {
    duration: 0.3,
    ease: [0.23, 1, 0.32, 1], // Custom easing for smoother animations
  },
  
  // Scroll-based animation settings
  scrollSettings: {
    // Throttle scroll events
    layoutScroll: true,
  },
};

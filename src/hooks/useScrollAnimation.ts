import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('✅ Element became visible:', entry.target.className);
            setIsVisible(true);
          }
        });
      },
      { 
        threshold,
        rootMargin: '0px'
      }
    );

    observer.observe(element);
    console.log('👀 Observer attached to:', element.className);

    return () => {
      observer.disconnect();
      console.log('🔌 Observer disconnected');
    };
  }, [threshold]);

  return { ref, isVisible };
}

import { useState, useEffect } from 'react';

interface RotatingTextProps {
  words: string[];
  interval?: number;
}

export default function RotatingText({ words, interval = 2000 }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 400);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className="inline-block min-w-0">
      <span
        className={`inline-block transition-all duration-400 ${
          isAnimating 
            ? 'opacity-0 -translate-y-5' 
            : 'opacity-100 translate-y-0'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
      >
        {words[currentIndex]}
      </span>
    </span>
  );
}

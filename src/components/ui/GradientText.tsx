import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export default function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span 
      className={`
        bg-gradient-to-r from-energy-green via-white to-cyber-blue 
        bg-clip-text text-transparent
        ${className}
      `}
    >
      {children}
    </span>
  );
}

import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <div 
      className={`
        relative backdrop-blur-xl bg-white/5 
        border border-white/10 rounded-2xl 
        shadow-lg shadow-black/20
        ${hover ? 'transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:shadow-energy-green/20' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

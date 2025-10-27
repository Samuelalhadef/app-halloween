import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  icon?: string;
  hover?: boolean;
  className?: string;
}

export default function Card({
  children,
  title,
  icon,
  hover = true,
  className = '',
}: CardProps) {
  const hoverEffect = hover
    ? 'hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:border-accent-gold/60'
    : '';

  return (
    <div
      className={`bg-secondary-bg border border-accent-gold/30 rounded-lg p-8 transition-all duration-300 ${hoverEffect} ${className}`}
    >
      {icon && (
        <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mb-6 border border-accent-gold/30">
          <span className="text-3xl">{icon}</span>
        </div>
      )}

      {title && (
        <h3 className="font-playfair text-2xl font-bold text-accent-gold mb-4">
          {title}
        </h3>
      )}

      <div className="text-text-gray font-inter leading-relaxed">
        {children}
      </div>
    </div>
  );
}

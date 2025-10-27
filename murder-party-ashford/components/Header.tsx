import React from 'react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({
  title = 'Murder Party Ashford',
  subtitle = 'Une soirée mystère dans les années 20',
}: HeaderProps) {
  return (
    <header className="border-b border-accent-gold/20 bg-primary-dark/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-6">
        <h1 className="font-playfair text-4xl font-bold text-accent-gold tracking-wide">
          {title}
        </h1>
        <p className="text-text-gray mt-2 font-inter text-sm">
          {subtitle}
        </p>
      </div>
    </header>
  );
}

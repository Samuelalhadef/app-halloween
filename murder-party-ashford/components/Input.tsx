import React from 'react';

interface InputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export default function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className = '',
}: InputProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <label
        htmlFor={name}
        className="block text-text-light font-inter font-medium mb-2"
      >
        {label}
        {required && <span className="text-accent-crimson ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 bg-secondary-bg border rounded-md font-inter text-text-light placeholder-text-muted focus:outline-none focus:ring-2 transition-all ${
          error
            ? 'border-accent-crimson focus:ring-accent-crimson'
            : 'border-accent-gold/30 focus:ring-accent-gold focus:border-accent-gold'
        }`}
      />
      {error && (
        <p className="mt-2 text-sm text-accent-crimson font-inter">{error}</p>
      )}
    </div>
  );
}



import React from 'react';
import { cn } from '@/lib/utils/cn';
import { ButtonProps } from '@/types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className,
  icon,
  'aria-label': ariaLabel,
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',

  secondary:
    `
    bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300
    dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600
    text-neutral-900 dark:text-neutral-100
    border border-neutral-200 dark:border-neutral-700
    `,

  destructive:
    `
    bg-red-600 text-white hover:bg-red-700 active:bg-red-800
    dark:bg-red-700 dark:hover:bg-red-600 dark:active:bg-red-500
    `,

  ghost:
    `
    bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800
    text-neutral-900 dark:text-neutral-100
    `,
};


  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
     {...(loading && { 'aria-busy': 'true' })}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        loading && 'cursor-wait',
        className
      )}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && !loading && icon}
      {children}
    </button>
  );
};

export default Button;
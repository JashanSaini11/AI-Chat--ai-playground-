// lib/utils/cn.ts

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper precedence
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 * 
 * @example
 * cn('px-4 py-2', 'bg-blue-500', isActive && 'bg-red-500')
 * // Result: 'px-4 py-2 bg-red-500' (red overrides blue if isActive is true)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
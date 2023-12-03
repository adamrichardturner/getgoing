import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertDateFormat(inputDate: string): string {
  const parts = inputDate.split('-')
  if (parts.length !== 3) {
    throw new Error('Invalid date format')
  }
  return `${parts[2]}-${parts[1]}-${parts[0]}`
}

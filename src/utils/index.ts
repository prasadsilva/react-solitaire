import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type Immutable<T> = {
  readonly [K in keyof T]: Immutable<T[K]>;
};

// Shadcn created helper
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function deepFreeze<T>(obj: T) {
  const propNames = Object.getOwnPropertyNames(obj);
  for (const name of propNames) {
    const value = (obj as Record<PropertyKey, unknown>)[name];
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }
  return Object.freeze(obj);
}

export function objectHasValue<T>(object: { [key: string]: T }, value: T) {
  return Object.values(object).includes(value);
}

export function notNull<T>(value: T | null | undefined): NonNullable<T> {
  if (value === null) {
    throw new Error('Value is expected to be not null!');
  }
  return value as NonNullable<T>;
}

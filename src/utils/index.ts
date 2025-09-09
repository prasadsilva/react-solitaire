import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Shadcn created helper
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Immutable<T> = {
  readonly [K in keyof T]: T[K] extends (infer U)[]
    ? readonly Immutable<U>[]
    : T[K] extends ReadonlyArray<infer U>
      ? ReadonlyArray<Immutable<U>>
      : T[K] extends Map<infer K, infer V>
        ? ReadonlyMap<Immutable<K>, Immutable<V>>
        : T[K] extends Set<infer U>
          ? ReadonlySet<Immutable<U>>
          : T[K] extends object
            ? Immutable<T[K]>
            : T[K];
};

type Mutable<T> = {
  -readonly [K in keyof T]: T[K] extends readonly (infer U)[]
    ? Mutable<U>[]
    : T[K] extends ReadonlyArray<infer U>
      ? Mutable<U>[]
      : T[K] extends ReadonlyMap<infer K, infer V>
        ? Map<Mutable<K>, Mutable<V>>
        : T[K] extends ReadonlySet<infer U>
          ? Set<Mutable<U>>
          : T[K] extends object
            ? Mutable<T[K]>
            : T[K];
};

export function deepCopy<T>(obj: T | Immutable<T>): T | Mutable<Immutable<T>> {
  if (typeof structuredClone !== 'undefined') {
    return structuredClone(obj) as T;
  }

  // Fallback implementation
  const copied = new WeakMap();

  function copy(target: any): any {
    if (target === null || typeof target !== 'object') {
      return target;
    }

    if (copied.has(target)) {
      return copied.get(target);
    }

    let result: any;

    if (Array.isArray(target)) {
      result = [];
      copied.set(target, result);
      for (let i = 0; i < target.length; i++) {
        result[i] = copy(target[i]);
      }
      return result;
    }

    if (target instanceof Map) {
      result = new Map();
      copied.set(target, result);
      target.forEach((value, key) => {
        result.set(copy(key), copy(value));
      });
      return result;
    }

    if (target instanceof Set) {
      result = new Set();
      copied.set(target, result);
      target.forEach((value) => {
        result.add(copy(value));
      });
      return result;
    }

    result = {};
    copied.set(target, result);
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        result[key] = copy(target[key]);
      }
    }
    return result;
  }

  return copy(obj);
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

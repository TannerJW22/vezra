import type { ClassValue } from "@/lib/types";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// -=-=-= Types -=-=-= //

// =-=-=- Constants =-=-=- //
export const _baseURL_ =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "http://vezra.io";

// =-=-=- Utility Functions =-=-=- //

// :::
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// :::
export function toTitleCase(string: string) {
  const words = string.split(" ");

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" ");
}

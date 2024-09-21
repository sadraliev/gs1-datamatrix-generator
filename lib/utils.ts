import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function refineCis(code: string): string {
  const GS = String.fromCharCode(29);
  const FunctionCode1 = "^FNC1";

  const refined = code.replace(/\\x1D/g, GS);

  return code.startsWith(FunctionCode1)
    ? refined
    : `${FunctionCode1}${refined}`;
}

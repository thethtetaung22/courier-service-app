import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getYears = () => {
    let years = [];
    let start = 1990;
    while (start <= new Date().getFullYear()) {
        years.push(start);
        start++;
    }
    return years;
}

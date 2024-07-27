import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let formattedDay = day < 10 ? "0" + day : day.toString();
  let formattedMonth = month < 10 ? "0" + month : month.toString();

  return `${formattedDay}-${formattedMonth}-${year}`;
}

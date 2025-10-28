import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}






export const SAMPLE_JSON = {
  user: {
    name: "Vilok",
    role: "Frontend Developer",
    location: {
      city: "Bangalore",
      country: "India"
    },
    skills: ["JavaScript", "React", "Next.js", "TailwindCSS"]
  }
};

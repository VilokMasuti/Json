"use client"

import { ThemeProvider } from "@/context/ThemeContext"



export default function LayoutClient({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>
}

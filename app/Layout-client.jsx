"use client"

import { ReactFlowProvider } from 'reactflow';
import { ThemeProvider } from "../context/ThemeContext";


export default function LayoutClient({ children }) {
  return (
    <ThemeProvider>
      <ReactFlowProvider>
        {children}
      </ReactFlowProvider>

    </ThemeProvider>
  )

}

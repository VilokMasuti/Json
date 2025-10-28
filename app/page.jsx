"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/hook/useTheme"

import { ArrowRight, Moon, Sun } from "lucide-react"
import Link from "next/link"

export default function Welcome() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300  font-sans">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1
            className={`text-2xl font-sans font-light uppercase ${theme === "light" ? "textLight" : "textbg"
              }`}
          >
            JSON Tree Visualizer
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans
        ${theme === "light" ? "textLight" : "textbg "}

        `}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl mb-4 textbg font-sans font-light uppercase" >Visualize JSON Data</h2>
              <p className="text-lg mb-6 textbg">
                Transform complex JSON structures into interactive, hierarchical tree visualizations. Search, explore,
                and understand your data with ease.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center  mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold textbg">Interactive Tree Visualization</h3>
                  <p className="text-sm text-muted-foreground">Powered by React Flow for smooth navigation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center  mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold textbg">Smart Search</h3>
                  <p className="text-sm text-muted-foreground">Find nodes by JSON path (e.g-{">"} user.address.city)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center  mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold textbg">Dark & Light Mode</h3>
                  <p className="text-sm text-muted-foreground">Comfortable viewing in any lighting condition</p>
                </div>
              </div>
            </div>

            <Link href="/tree">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="w-4 h-4 textbg cursor-pointer" />
              </Button>
            </Link>
          </div>

          {/* Right Section - Feature Preview */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-4">
            <h3 className="font-semibold text-lg ">Example JSON</h3>
            <pre className="bg-muted p-4 rounded text-sm overflow-auto max-h-96 font-mono text-foreground">
              {`{
  "user": {
    "id": 1,
    "name": "John Doe",
    "address": {
      "city": "New York",
      "country": "USA"
    }
  },
  "items": [
    { "name": "item1" },
    { "name": "item2" }
  ]
}`}
            </pre>
            <p className="text-sm text-muted-foreground ">
              Paste your JSON and watch it transform into an interactive tree visualization.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

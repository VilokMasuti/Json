"use client"

import { useState } from "react"
import Header from "../../components/Header/Header"
import JsonInput from "../../components/JsonInput"
const Flowpage = () => {

  const [jsonData, setJsonData] = useState(null)
  const [error, setError] = useState("")
  const [searchPath, setSearchPath] = useState("")
  const [highlightedNode, setHighlightedNode] = useState(null)


  const handleError = (err) => {
    setError(err)
    setJsonData(null)
  }
  const handleReset = () => {
    setJsonData(null)
    setError("")
    setSearchPath("")
    setHighlightedNode(null)
  }
  return (
    <section className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header
        jsonData={jsonData}

        handleReset={handleReset}
      />
      {/* Main Content */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Input */}
          <div className="space-y-4">
            <JsonInput onError={handleError} />
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive animate-in fade-in">
                <p className="font-medium">Error</p>
                <p className="mt-1">{error}</p>
              </div>
            )}
          </div>
          {/* Right Panel - Visualization-React-Flow */}
          <div className="lg:col-span-2 space-y-4">


          </div>
        </div>
      </main>


    </section>
  )
}
export default Flowpage

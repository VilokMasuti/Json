"use client"

import { useRef, useState } from "react"
import Header from "../../components/Header/Header"
import JsonInput from "../../components/Json-Input/JsonInput"
import Searchbar from "../../components/Search/Searchbar"
import TreeFlow from "../../components/Tree-Flow/TreeFlow"
const Flowpage = () => {

  const [jsonData, setJsonData] = useState(null)
  const [error, setError] = useState("")
  const [searchPath, setSearchPath] = useState("")
  const [highlightedNode, setHighlightedNode] = useState(null)
  const treeRef = useRef(null)

  const handleGenerateTree = (data) => {
    setJsonData(data)
    setError("")
    setSearchPath("")
    setHighlightedNode(null)
  }

  const handleError = (err) => {
    setError(err)
    setJsonData(null)
  }

  const handleSearch = (path) => {
    setSearchPath(path)
    setHighlightedNode(path)
  }

  const handleReset = () => {
    setJsonData(null)
    setError("")
    setSearchPath("")
    setHighlightedNode(null)
  }

  const handleCopyPath = (path) => {
    navigator.clipboard.writeText(path)
    setCopiedPath(path)
    setTimeout(() => setCopiedPath(null), 2000)
  }

  const handleDownloadImage = async () => {
    if (!treeRef.current) return

    try {
      const canvas = await html2canvas(treeRef.current)
      const link = document.createElement("a")
      link.href = canvas.toDataURL()
      link.download = "json-tree.png"
      link.click()
    } catch (err) {
      console.error("Failed to download image:", err)
    }
  }
  return (
    <section className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans">
      <Header
        jsonData={jsonData}
        DownloadImage={handleDownloadImage}
        handleReset={handleReset}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Flex Container for Large Screens */}
        <div className="lg:flex lg:gap-8">

          {/* Left Panel - JSON Input */}
          <div className="flex-1 ">
            <JsonInput onGenerate={handleGenerateTree} onError={handleError} />
            {error && (
              <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-sm text-red-700 transition-colors hover:bg-red-200">
                <p className="font-medium">Error</p>
                <p className="mt-1">{error}</p>
              </div>
            )}
          </div>

          {/* Right Panel - Visualization & Controls */}
          <div className="flex-2 flex-col mt-8 lg:mt-0">

            <>
              {/* Search Bar */}
              <div className="mb-4">
                <Searchbar onSearch={handleSearch} />
              </div>
              {/* Visualization Box */}
              <div className="  bg-white dark:bg-zinc-900 border shadow-2xl border-gray-300 dark:border-zinc-950 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 min-h-[600px]">
                {/* Using full width and height for ReactFlow container */}
                <TreeFlow className="w-full h-full" />
              </div>
            </>


            {/* Placeholder for no data */}
            {!jsonData && !error && (
              <div className="flex items-center justify-center h-[600px] border-2 border-dashed border-gray-300 dark:border-zinc-950 rounded-lg bg-white dark:bg-zinc-900  text-center text-gray-500 text-lg font-medium">
                <div>
                  <p>No JSON data loaded</p>
                  <p className="mt-2 text-sm">
                    Paste JSON data on the left and click "Generate Tree" to visualize
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </section>
  )
}
export default Flowpage

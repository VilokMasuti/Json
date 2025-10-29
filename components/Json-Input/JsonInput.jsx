"use client"

import { useState } from "react"
import { useTheme } from "../../hooks/useTheme"
import { SAMPLE_JSON } from "../../lib/utils"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"

const JsonInput = ({ onError, onGenerate }) => {
  const { theme } = useTheme()
  const handleGenerateTree = () => {
    if (!input.trim()) {
      onError("Please enter JSON data")
      return
    }

    try {
      const parsed = JSON.parse(input)
      onGenerate(parsed)
    } catch (err) {
      onError(`Invalid JSON: ${err.message}`)
    }
  }

  const handleUseSample = () => {

    const text =
      typeof SAMPLE_JSON === "string"
        ? SAMPLE_JSON
        : JSON.stringify(SAMPLE_JSON, null, 2)
    setInput(text)
  }


  const [input, setInput] = useState('')


  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg p-6 space-y-6 font-sans font-light antialiased">

      <div>
        <h2 className={` text-2xl  mb-2  font-sans font-light        ${theme === "light" ? "  text-zinc-800" : "textbg"} `}>JSON Input</h2>
        <p className={`not-[]:text-sm tracking-wider font-sans font-light   ${theme === "light" ? "textLight" : "textbg"} `}>Paste or type JSON data</p>
      </div>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your JSON here..."
        className="font-sans text-sm h-64 resize-none"
      />
      <div className="flex gap-2">
        <Button className="flex-1 cursor-pointer"
          onClick={handleGenerateTree}
        >
          Generate Tree
        </Button>
        <Button variant="outline" onClick={handleUseSample} className="flex-1 bg-transparent  cursor-pointer">
          Use Sample
        </Button>
      </div>
    </div>
  )
}
export default JsonInput

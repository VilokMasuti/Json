"use client"

import { Search } from 'lucide-react'
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const Searchbar = ({ onSearch }) => {
  const [path, setPath] = useState("")
  const handleSearch = () => {
    if (path.trim()) {
      onSearch(path)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3 shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-none transition-shadow">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search by JSON path (e.g-> .user.address.city)"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={handleSearch} size="sm" className="gap-2  bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer">
          <Search className="w-4 h-4" />
          Search
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Use JSON path notation: <code className="bg-muted px-1.5 py-0.5 rounded">.key</code>,{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded">.array[0]</code>,{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded">.nested.key</code>
      </p>
    </div>
  )
}
export default Searchbar

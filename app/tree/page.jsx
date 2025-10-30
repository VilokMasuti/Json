'use client';

import { X } from 'lucide-react';
import { useRef, useState } from 'react';

import Header from '../../components/Header/Header';
import JsonInput from '../../components/Json-Input/JsonInput';
import Searchbar from '../../components/Search/Searchbar';
import { TreeFlow } from '../../components/Tree-Flow/TreeFlow';
import { Button } from '../../components/ui/button';

const Flowpage = () => {
  const [jsonData, setJsonData] = useState();
  const [error, setError] = useState('');
  const [searchPath, setSearchPath] = useState('');
  const [highlightedNode, setHighlightedNode] = useState(null);

  const [searchFeedback, setSearchFeedback] = useState('');
  const jsonInputRef = useRef(null);

  // Handle tree generation from JSON input
  const handleGenerateTree = data => {
    setJsonData(data);
    setError('');
    setSearchPath('');
    setHighlightedNode(null);
    setSearchFeedback('');
  };

  const handleError = err => {
    setError(err);
    setJsonData(null);
  };

  // Shows feedback message and highlights matching node
  const handleSearch = (path, matchFound) => {
    setSearchPath(path);
    setHighlightedNode(path);
    setSearchFeedback(matchFound ? `Match found: ${path}` : `No match found for: ${path}`);
    setTimeout(() => setSearchFeedback(''), 4000);
  };

  // Reset all data and return to initial state
  const handleReset = () => {
    setJsonData(null);
    setError('');
    setSearchPath('');
    setHighlightedNode(null);
    setSearchFeedback('');
    // Clear JSON input textarea
    if (jsonInputRef.current) {
      jsonInputRef.current.clearInput();
    }
  };

  // Clear search and return to normal view
  const handleClearSearch = () => {
    setSearchPath('');
    setHighlightedNode(null);
    setSearchFeedback('');
  };

  //  tried but not bale to do only getting teh nodes but not edges - todo

  // const handleDownloadImage = async () => {
  //   if (!treeRef.current) return;
  //   try {
  //     const dataUrl = await toPng(treeRef.current);
  //     const link = document.createElement("a");
  //     link.href = dataUrl;
  //     link.download = `json-tree-${Date.now()}.png`;
  //     link.click();
  //   } catch (err) {
  //     setError("Failed to download image. Please try again.");
  //   }
  // };

  return (
    <section className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans">
      <Header jsonData={jsonData} handleReset={handleReset} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="lg:flex lg:gap-8">
          {/* Left Panel - JSON Input */}
          <div className="flex-1">
            <JsonInput onGenerate={handleGenerateTree} onError={handleError} ref={jsonInputRef} />
            {error && (
              <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-sm text-red-700 transition-colors hover:bg-red-200">
                <p className="font-medium">Error</p>
                <p className="mt-1">{error}</p>
              </div>
            )}
          </div>

          {/* Right Panel - Visualization & Controls */}
          <div className="flex-2 flex-col mt-8 lg:mt-0">
            {jsonData && (
              <>
                {/* Search Bar */}
                <div className="mb-4">
                  <Searchbar onSearch={handleSearch} data={jsonData} />
                  {highlightedNode && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearSearch}
                      className="w-full gap-2 bg-transparent hover:bg-muted"
                    >
                      <X className="w-4 h-4" />
                      Clear Search
                    </Button>
                  )}

                  {/* Search feedback message */}
                  {searchFeedback && (
                    <div
                      className={`p-3 rounded-lg text-sm font-medium animate-in fade-in ${
                        searchFeedback.includes('Match found')
                          ? 'bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400'
                          : 'bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400'
                      }`}
                    >
                      {searchFeedback}
                    </div>
                  )}
                </div>

                {/* Tree-Flow Box with ref */}
                <div className=" bg-accent dark:bg-zinc-900 border shadow-2xl border-gray-300 dark:border-zinc-950 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 min-h-[600px]">
                  <TreeFlow data={jsonData} highlightedNode={highlightedNode} />
                </div>
              </>
            )}

            {/* Placeholder for no data */}
            {!jsonData && !error && (
              <div className="flex items-center justify-center h-[600px] border-2 border-dashed border-gray-300 dark:border-zinc-950 rounded-lg bg-white dark:bg-zinc-900 text-center text-gray-500 text-lg font-medium">
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
  );
};

export default Flowpage;

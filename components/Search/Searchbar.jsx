'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Searchbar = ({ onSearch, data }) => {
  const [path, setPath] = useState('');

  const pathExists = (jsonData, searchPath) => {
    if (!jsonData || !searchPath.trim()) return false;

    try {
      let normalizedPath = searchPath.trim();
      if (!normalizedPath.startsWith('$')) {
        normalizedPath = '$.' + normalizedPath;
      }

      let current = jsonData;
      const parts = normalizedPath
        .slice(2) // Remove "$."
        .split(/\.|\[|\]/)
        .filter(p => p !== '');

      for (const part of parts) {
        if (current === null || current === undefined) {
          return false;
        }

        if (Array.isArray(current)) {
          const index = Number.parseInt(part, 10);
          if (isNaN(index) || index < 0 || index >= current.length) {
            return false;
          }
          current = current[index];
        } else if (typeof current === 'object') {
          if (!(part in current)) {
            return false;
          }
          current = current[part];
        } else {
          return false;
        }
      }

      return true;
    } catch (err) {
      console.error('Path exists error:', err);
      return false;
    }
  };

  const handleSearch = () => {
    if (path.trim() && data) {
      const matchFound = pathExists(data, path);
      onSearch(path, matchFound);
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3 shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-none transition-shadow">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Search by JSON path (e.g., $.user.address.city)"
          value={path}
          onChange={e => setPath(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button
          variant="outline" size="sm"
          onClick={handleSearch}

          className="gap-2  cursor-pointer"
        >
          <Search className="w-4 h-4" />
          Search
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Use JSON path notation: <code className="bg-muted px-1.5 py-0.5 rounded">$.user.name</code>,{' '}
        <code className="bg-muted px-1.5 py-0.5 rounded">$.array[0]</code>

      </p>
    </div>
  );
};
export default Searchbar;

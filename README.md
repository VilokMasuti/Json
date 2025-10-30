## Project Overview

JSON tree visualization application built with Next.js, React Flow, and Tailwind CSS. The application allows users to input JSON data and visualize it as an interactive tree structure with search, filtering, etc

## Core Features

**JSON Input & Validation**: Text area with real-time validation and error messages

**Tree Visualization**: Interactive React Flow visualization with color-coded nodes

- Blue nodes: Objects
- Green nodes: Arrays
- Orange nodes: Primitives

**Search Functionality**: Search by JSON path (e.g., `$.user.address.city`)

- Auto-centers on matching node
- Visual feedback with match/no-match messages
- Clear search button to return to normal view

**Dark/Light Mode**: Theme toggle with persistent storage using Context API

**Reset Button**: Clears all data including JSON input

### Bonus Features Implemented

✓ Dark/Light mode toggle with Context API
✓ Clear/Reset button
✓ Auto-centering on search results
✓ Smooth animations on nodes and edges
✓ Responsive 50/50 layout

## Technology Stack

- **Framework**: Next.js (App Router)
- **Visualization**: React Flow
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Icons**: Lucide React
- **Language**: JavaScript

## Performance Optimizations

- Memoized tree generation to prevent unnecessary recalculations
- Efficient state management with Context API

# File Tree:

```
├── 📁 app
│   ├── 📁 tree
│   │   └── 📄 page.jsx
│   ├── 📄 Layout-client.jsx
│   ├── 📄 favicon.ico
│   ├── 🎨 globals.css
│   ├── 📄 layout.jsx
│   └── 📄 page.jsx
├── 📁 components
│   ├── 📁 Download
│   ├── 📁 Header
│   │   └── 📄 Header.jsx
│   ├── 📁 Json-Input
│   │   └── 📄 JsonInput.jsx
│   ├── 📁 Search
│   │   └── 📄 Searchbar.jsx
│   ├── 📁 Tree-Flow
│   │   ├── 📄 TreeFlow.jsx
│   │   └── 📄 TreeNode.jsx
│   └── 📁 ui
│       ├── 📄 button.jsx
│       ├── 📄 input.jsx
│       └── 📄 textarea.jsx
├── 📁 context
│   └── 📄 ThemeContext.jsx
├── 📁 hooks
│   ├── 📄 use-mobile.js
│   └── 📄 useTheme.jsx
├── 📁 lib
│   ├── 📄 Theme-toggle.jsx
│   ├── 📄 generateTreeStructure.js
│   └── 📄 utils.js
├── 📁 public
│   ├── 🖼️ file.svg
│   ├── 🖼️ globe.svg
│   ├── 🖼️ next.svg
│   ├── 🖼️ vercel.svg
│   └── 🖼️ window.svg
├── ⚙️ .gitignore
├── 📝 README.md
├── ⚙️ biome.json
├── ⚙️ components.json
├── ⚙️ jsconfig.json
├── 📄 next.config.mjs
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── 📄 postcss.config.mjs
└── ⚙️ tsconfig.json
```

---

### Key Components

#### JsonInput Component

- Manages JSON input with validation
- Provides sample JSON for testing
- Exposes `clearInput()` method for reset functionality
- Sticky positioning for better UX

#### TreeFlow Component

- Uses React Flow for interactive visualization
- Auto-fits view to show all nodes
- Implements auto-centering on search results
- Exposes screenshot functionality for image download
- Animated edges and nodes

#### TreeNode Component

- Color-coded based on type (object/array/primitive)
- Highlights when search matches
- Smooth transitions and animations
- Displays path on hover

#### SearchBar Component

- Validates JSON paths against actual data
- Provides real-time feedback
- Supports standard JSON path notation (e.g., `$.user.address.city`)

#### ThemeToggle Component

- Dark/light mode toggle
- Persistent storage using localStorage
- Smooth transitions between themes

**Key Functions:**

- `handleGenerateTree()`: Processes JSON input and generates tree
- `handleSearch()`: Validates search path and highlights matching node
- `handleClearSearch()`: Clears search and returns to normal view
- `handleReset()`: Clears all data and resets to initial state



## Getting Started

### Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd json-tree-visualizer

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Usage

1. **Navigate to the tree**: Click "Get Start " on the welcome page
2. **Paste JSON**: Enter or paste JSON data in the input area (left panel)
3. **Generate Tree**: Click "Generate Tree" to visualize (right panel)
4. **Explore**:
   - Zoom in/out with controls or scroll
   - Pan by dragging the canvas
   - Hover over nodes to see full paths
5. **Search**:
   - Use the search bar to find nodes by JSON path
   - Matched node will be highlighted in yellow and auto-centered
   - Click "Clear Search" to return to normal view
6. **Theme**: Toggle dark/light mode with the theme toggle button

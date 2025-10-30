// look the main purpse of this fucntion is this much

// Convert a JSON object into nodes & edges
// for React Flow tree visualization.

// how it works:

// 1- It initializes empty arrays for nodes and edges.

// 2 - It defines a helper function createNode to create nodes with specific properties.

// 3- It walks through the JSON recursively.

// 4- It creates nodes and edges based on the JSON structure. For each key/value:
//       It creates a node Object, Array, or Primitive
//      It connects parent → child using an edge.

// 5- It returns the nodes and edges arrays To draw  the visual tree

function generateTreeStructure(jsonData, highlightedPath) {
  // If JSON is empty or invalid, return empty tree
  if (!jsonData) return { nodes: [], edges: [] };

  const nodes = [];
  const edges = [];

  // track of where each node should appear vertically  Used to vertically space nodes (each node goes below previous)
  let verticalPosition = 0;

  //  Creates one visual "box" (a node) in React Flow.
  //     Parameters:
  //  nodeId: unique ID (usually JSON path like $.user.name)

  function createNode(nodeId, displayText, nodeType, jsonPath, level, options = {}) {
    const isRoot = options.isRoot || false; // true only for root ($)
    const hasChildNodes = options.hasChildren || false; // true if object/array has children
    const isSearchHighlighted = highlightedPath === jsonPath; // highlight if search matches

    // Push a formatted node object for React Flow
    nodes.push({
      id: nodeId, // unique ID (React Flow requires it)
      type: 'treeNode', // our custom React Flow node type
      position: { x: level * 240, y: verticalPosition * 90 }, // layout position
      data: {
        label: displayText, // node's text label
        type: nodeType, // helps decide color
        path: jsonPath, // complete JSON path
        isRoot, // used to style root
        hasChildren: hasChildNodes, // used to hide connectors on leaf
        isHighlighted: isSearchHighlighted, // highlight if searched
      },
    });

    // Move next node slightly lower
    verticalPosition += 1;
  }

  // This is the recursive function that:
  //  Checks the type of current JSON value
  // Creates the node for it
  //  Calls itself again for its children

  function JsonRecursive(currentValue, currentPath, depthLevel, currentKeyLabel) {
    //   if this is a Primitive Value  stop going deeper
    if (currentValue === null || typeof currentValue !== 'object') {
      // Display with quotes for strings, plain for others
      const valueLabel =
        typeof currentValue === 'string' ? `"${currentValue}"` : String(currentValue);
      // Create orange node (primitive)
      createNode(currentPath, valueLabel, 'primitive', currentPath, depthLevel, {
        hasChildren: false,
      });
      // Return this path so parent can connect edge to it
      return currentPath;
    }

    //  Array Value (like ["JS", "React"])

    if (Array.isArray(currentValue)) {
      // Label shows name and length (like skills[4])
      const arrayLabel = `${currentKeyLabel}[${currentValue.length}]`;

      // Create green node (array)
      createNode(currentPath, arrayLabel, 'array', currentPath, depthLevel, {
        isRoot: currentPath === '$', // mark root
        hasChildren: currentValue.length > 0, // mark if array not empty
      });
      // Loop through each array element
      currentValue.forEach((item, index) => {
        // Build unique child path like $.user.skills[0]
        const childPath = `${currentPath}[${index}]`;
        // Recurse into each item
        const childNodeId = JsonRecursive(item, childPath, depthLevel + 1, `[${index}]`);
        // Create arrow connection (edge) parent → child
        edges.push({
          id: `${currentPath}->${childNodeId}`, // edge unique ID
          source: currentPath, // parent
          target: childNodeId, // child
          animated: true, // visually dotted
        });
      });
      // After processing all items, return current array path
      return currentPath;
    }

    //  Object Value (like {name: "Vilok"})

    const objectKeys = Object.keys(currentValue); // list of keys inside this object like ["name", "age"]

    // Label shows name and number of keys (like user{3})
    const objectLabel = `${currentKeyLabel}{${objectKeys.length}}`;

    // Create blue node (object)
    createNode(currentPath, objectLabel, 'object', currentPath, depthLevel, {
      isRoot: currentPath === '$',
      hasChildren: objectKeys.length > 0,
    });
    // For each key in object, recurse deeper
    objectKeys.forEach(key => {
      // Build child path like $.user.name or $.user.location.city
      const childPath = currentPath === '$' ? `$.${key}` : `${currentPath}.${key}`;

      // Get value of that key
      const childValue = currentValue[key];

      // Recursively process that child
      const childNodeId = JsonRecursive(childValue, childPath, depthLevel + 1, key);
      // Connect current object → that key
      edges.push({
        id: `${currentPath}->${childNodeId}`,
        source: currentPath,
        target: childNodeId,
        animated: true,
      });
    });
    // Return current object path after processing its children
    return currentPath;
  }
  JsonRecursive(jsonData, '$', 0, '$');
  return { nodes, edges };
}

export { generateTreeStructure };

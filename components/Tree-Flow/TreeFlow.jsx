'use client';

import { useEffect, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useTheme } from '../../hooks/useTheme';
import TreeNode from './TreeNode';

import { generateTreeStructure } from '../../lib/generateTreeStructure';

const nodeTypes = {
  treeNode: TreeNode, // custom node renderer component
};

export const TreeFlow = function TreeFlow({
  data, // jSON object
  highlightedNode, //  highlight
}) {
  const { theme } = useTheme();
  const { fitView } = useReactFlow(); // Function to auto-center view

  //  recompute tree nodes & edges only when data or highlightedNode changes
  //  prevents unnecessary re-renders → better performance.

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    return generateTreeStructure(data, highlightedNode ?? null);
  }, [data, highlightedNode]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  //   auto fit the entire tree view every time new JSON is loaded.
  //  fitView() makes sure all nodes are visible in viewport

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);

    // delay slightly to let DOM render before adjusting camera
    const timeout = setTimeout(() => fitView({ padding: 0.2, duration: 300 }), 120);

    return () => clearTimeout(timeout);
  }, [initialNodes, initialEdges, setNodes, setEdges, fitView]);

  //  when a node is highlighted ( search)
  //   find that node by ID
  //    smoothly zoom camera to center on it

  useEffect(() => {
    if (!highlightedNode) return;

    // locate the node to focus on
    const nodeToHighlight = nodes.find(n => n.id === highlightedNode);
    if (!nodeToHighlight) return;

    // smooth scroll/zoom into the highlighted node
    const timeout = setTimeout(() => {
      fitView({
        nodes: [nodeToHighlight],
        padding: 0.8,
        duration: 600,
        maxZoom: 1.5,
        minZoom: 0.5,
      });
    }, 200);

    return () => clearTimeout(timeout);
  }, [highlightedNode, nodes, fitView]);

  return (
    <div className="h-96 lg:h-[600px] overflow-hidden bg-card rounded-lg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={2}
      >
        {/* grid background color depends on theme */}
        <Background color={theme === 'dark' ? '#333' : '#e5e7eb'} gap={16} />
        {/* zoom / pan / reset controls */}
        <Controls />
      </ReactFlow>
    </div>
  );
};

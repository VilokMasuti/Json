"use client";

import { Handle, Position } from "reactflow";
import { useTheme } from "../../hooks/useTheme";

const TreeNode = ({ data }) => {
  const { label, type, isHighlighted, path, isRoot, hasChildren } = data;
  const { theme } = useTheme();

  // common styles for all nodes
  const baseStyle = {
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 500,
    border: "2px solid",
    minWidth: 90,
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative",
  };


  //   object -> blue
  //  array ->green
  //   primitive -> orange

  const styleByType = {
    object: {
      backgroundColor: theme === "dark" ? "#3b82f6" : "#2563eb",
      borderColor: theme === "dark" ? "#1e40af" : "#1d4ed8",
      color: "#fff",
      boxShadow: "0 0 16px rgba(37, 99, 235, 0.6), 0 0 0 3px rgba(37, 99, 235, 0.1)",
    },
    array: {
      backgroundColor: theme === "dark" ? "#10b981" : "#059669",
      borderColor: "#047857",
      color: "#fff",
      boxShadow: "0 0 16px rgba(16, 185, 129, 0.6), 0 0 0 3px rgba(16, 185, 129, 0.1)",
    },
    primitive: {
      backgroundColor: theme === "dark" ? "#f97316" : "#ea580c",
      borderColor: "#c2410c",
      color: "#fff",
      boxShadow: "0 0 16px rgba(249, 115, 22, 0.6), 0 0 0 3px rgba(249, 115, 22, 0.1)",
    },
  };


  // Highlight when searched/focused

  const style = isHighlighted
    ? {
      ...baseStyle,
      backgroundColor: "#fbbf24",
      borderColor: "#f59e0b",
      color: "#000",
      boxShadow: "0 0 16px rgba(251, 191, 36, 0.6), 0 0 0 3px rgba(251, 191, 36, 0.1)",
      transform: "scale(1.05)", // slight zoom effect
    }
    : { ...baseStyle, ...(styleByType[type] || {}) };


  return (
    <div style={style} title={`Path: ${path}`}>
      {/* Target handle (top connector) only if not root   */}
      {!isRoot && <Handle type="target" position={Position.Top} />}

      <div className="truncate">{label}</div>

      {/* Source handle (bottom connector) if children exist */}
      {hasChildren && <Handle type="source" position={Position.Bottom} />}
    </div>
  );
};

export default TreeNode;

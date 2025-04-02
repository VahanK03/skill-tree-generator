import React, { useRef, useEffect, useState } from "react";
import Tree from "react-d3-tree";

const Node = ({ nodeDatum, isRoot, isMainNode, isSubNode }) => {
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      setTextWidth(bbox.width);
    }
  }, [textRef.current]);

  const nodeStyle = {
    fill: isRoot ? "#000" : isMainNode ? "#ecfa70" : "#ffffff",
    stroke: "#000",
    strokeWidth: isSubNode ? 0.5 : 0,
    borderRadius: "5px",
  };

  const textStyle = {
    fill: isRoot ? "#fff" : "#000",
    fontSize: isRoot ? "20px" : isMainNode ? "14px" : "12px",
    textAnchor: "middle",
    stroke: "none",
    fontWeight: "bold",
  };

  // Calculate node width based on text width
  const nodeWidth = textWidth + 20;
  const nodeHeight = 80; // Fixed height for the node

  return (
    <g>
      <rect
        x={-(nodeWidth / 2)}
        y={-(nodeHeight / 2)}
        width={nodeWidth}
        height={nodeHeight}
        style={nodeStyle}
        rx="15"
        ry="15"
      />
      <text ref={textRef} dy="5" style={textStyle}>
        {nodeDatum.name}
       
      </text>
    </g>
  );
};

const TreeDiagram = ({ data }) => {
  // Customize node appearance
  const renderRectSvgNode = ({ nodeDatum, toggleNode }) => {
    const isRoot = nodeDatum.__rd3t.depth === 0;
    const isMainNode = nodeDatum.__rd3t.depth === 1;
    const isSubNode = nodeDatum.__rd3t.depth >= 2;

    return (
      
      <Node
        nodeDatum={nodeDatum}
        isRoot={isRoot}
        isMainNode={isMainNode}
        isSubNode={isSubNode}
        separation={{ siblings: 2.5, nonSiblings: 2 }}
      />
    );
  };

  return (
    <div style={{ height: "600px", border: "1px solid #ccc"}} className="tree">
      <Tree
        data={data}
        orientation="vertical"
        pathFunc="step" // Set path function to "step"
        collapsible={true}
        zoomable={true}
        translate={{ x: 300, y: 50 }}
        renderCustomNodeElement={renderRectSvgNode}
        separation={{ siblings: 2.6, nonSiblings: 2.4 }}
        dimensions={{ width: 1000, height: 400 }}
      />
    </div>
  );
};

export default TreeDiagram;
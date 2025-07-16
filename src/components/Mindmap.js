import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import "./Mindmap.css";

import {initialNodes, CENTER_NODE_ID} from "../data/Mind-nodes";
import {initialEdges} from "../data/Mind-edges";

export default function Mindmap() {
  const history = useHistory();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (event, node) => {
      if (node.id !== CENTER_NODE_ID) {
        history.push(`/page/${node.id}`);
      } else {
        alert("페이지 정보가 없습니다.");
      }
    },
    [history]
  );

  const handleAddNode = () => {
    const newId = (nodes.length + 1).toString();

    const newNode = {
      id: newId,
      type: "default",
      data: { label: `Node ${newId}` },
      position: {
        x: Math.random() * 500,
        y: Math.random() * 300,
      },
      className: "my-node",
    };

    const newEdge = {
      id: `e-center-${newId}`,
      source: CENTER_NODE_ID,
      target: newId
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <button onClick={handleAddNode} style={{ margin: 10, zIndex: 10 }}>
        Add Node
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      />
    </div>
  );
}
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Handle, Position } from 'reactflow';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import "./styles.css";

const CENTER_NODE_ID = "center";

const initialNodes = [
  {
    id: CENTER_NODE_ID,
    type: "default",
    data: { label: "Center Node", page: "/center" },
    position: { x: 300, y: 200 },
    draggable: false,
    className: "my-node center-node",
  },
  {
    id: "1",
    type: "default",
    data: { label: "Node 1"},
    position: { x: 100, y: 100 },
    className: "my-node",
  },
  {
    id: "2",
    type: "default",
    data: { label: "Node 2"},
    position: { x: 500, y: 100 },
    className: "my-node",
  },
];

const initialEdges = [
  {
    id: "e-center-1",
    source: CENTER_NODE_ID,
    target: "1",
  },
  {
    id: "e-center-2",
    source: CENTER_NODE_ID,
    target: "2",
  },
];

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
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { initialNodes, CENTER_NODE_ID } from "../data/Mind-nodes";
import { initialEdges } from "../data/Mind-edges";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import "./Mindmap.css";

export default function Mindmap(props) {
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
      target: newId,
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
  };

  // props.onAddNode를 전달해주었다면 Mindmap 외부에서 trigger 할 수 있게 연결
  if (props.onReady) {
    props.onReady({
      handleAddNode,
    });
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      fitView
    />
  );
}
import { useRef } from "react";
import Mindmap from "../components/Mindmap";

function DetailHome() {
  const mindmapAPI = useRef(null);

  const handleAddNode = () => {
    if (mindmapAPI.current) {
      mindmapAPI.current.handleAddNode();
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <button onClick={handleAddNode} style={{ margin: 10 }}>
        Add Node
      </button>
      <Mindmap
        onReady={(api) => {
          mindmapAPI.current = api;
        }}
      />
    </div>
  );
}

export default DetailHome;
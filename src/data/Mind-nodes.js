export const CENTER_NODE_ID = "center";

export const initialNodes = [
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

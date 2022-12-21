"use client";

import {
  Sigma,
  RelativeSize,
  RandomizeNodePositions,
  SigmaEnableWebGL,
} from "react-sigma";

let myGraph = {
  nodes: [
    { id: "n1", label: "Alice" },
    { id: "n2", label: "Rabbit" },
    { id: "n3", label: "Cat" },
    { id: "n4", label: "Dog" },
    { id: "n5", label: "Rabbit" },
    { id: "n6", label: "Mouse" },
  ],
  edges: [
    { id: "e1", source: "n1", target: "n2", label: "SEES" },
    { id: "e2", source: "n2", target: "n3", label: "SEES" },
    { id: "e3", source: "n3", target: "n4", label: "SEES" },
    { id: "e4", source: "n4", target: "n5", label: "SEES" },
    { id: "e5", source: "n5", target: "n1", label: "SEES" },
  ],
};

export default function Viewport({ data }) {
  return (
    <Sigma
      style={{
        height: "100vh",
      }}
      graph={myGraph}
      settings={{ drawEdges: true, clone: false, animationsTime: 3000 }}
    >
      <RelativeSize initialSize={8} />
      <RandomizeNodePositions />
    </Sigma>
  );
}

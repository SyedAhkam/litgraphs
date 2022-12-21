"use client";

import { useLoadGraph } from "@react-sigma/core";
import { DirectedGraph } from "graphology";
import { useEffect } from "react";

export default function GraphDataController({ data }) {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    if (data == null) return;

    // Create the graph
    const graph = new DirectedGraph();

    // Add nodes
    for (const node of data.nodes) {
      graph.addNode(node.key, {
        ...node,
      });
    }

    // Add edges
    data.edges.forEach(([source, target]) =>
      graph.addEdge(source, target, { size: 1 })
    );

    // Use degrees as node sizes:
    const scores = graph
      .nodes()
      .map((node) => graph.getNodeAttribute(node, "score"));
    const minDegree = Math.min(...scores);
    const maxDegree = Math.max(...scores);
    const MIN_NODE_SIZE = 3;
    const MAX_NODE_SIZE = 30;
    graph.forEachNode((node) =>
      graph.setNodeAttribute(
        node,
        "size",
        ((graph.getNodeAttribute(node, "score") - minDegree) /
          (maxDegree - minDegree)) *
          (MAX_NODE_SIZE - MIN_NODE_SIZE) +
          MIN_NODE_SIZE
      )
    );

    loadGraph(graph);
  }, [loadGraph, data]);

  return null;
}

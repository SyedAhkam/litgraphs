"use client";

import { useLoadGraph } from "@react-sigma/core";
import { DirectedGraph } from "graphology";
import { useEffect } from "react";
import { DEFAULT_EDGE_COLOR, DEFAULT_NODE_COLOR } from "../constants";

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
        color: DEFAULT_NODE_COLOR,
      });
    }

    // Add edges
    for (const edge of data.edges) {
      try {
        graph.addEdge(edge[0], edge[1], { color: DEFAULT_EDGE_COLOR });
      } catch (e) {
        console.log(e);
      }
    }

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

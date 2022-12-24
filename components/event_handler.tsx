import { useRegisterEvents, useSigma } from "@react-sigma/core";
import { useEffect } from "react";
import { DEFAULT_NODE_COLOR, HOVER_NODE_COLOR } from "../constants";

export default function EventHandler() {
  const registerEvents = useRegisterEvents();
  const sigma = useSigma();

  useEffect(() => {
    let graph = sigma.getGraph();

    registerEvents({
      enterNode: (e) => {
        let node = e.node;

        // Color the node
        graph.setNodeAttribute(node, "color", HOVER_NODE_COLOR);

        graph.forEachNeighbor(node, (neighbor) => {
          // Color the neighboring nodes
          graph.setNodeAttribute(neighbor, "color", HOVER_NODE_COLOR);

          // Activate the labels of the neighboring nodes
          // graph.setNodeAttribute(neighbor, "label", neighbor);
          // graph.setAttribute("renderLabels", true);
        });
      },
      leaveNode: (e) => {
        let node = e.node;

        // Un-color the node
        graph.setNodeAttribute(node, "color", DEFAULT_NODE_COLOR);

        // Un-color the neighboring nodes
        graph.forEachNeighbor(node, (neighbor) => {
          graph.setNodeAttribute(neighbor, "color", DEFAULT_NODE_COLOR);
        });
      },
      downNode: (e) => {
        let clickedNode = e.node;

        // Show all nodes if they are hidden
        if (graph.getAttribute("hiddenNeighbors")) {
          graph.setAttribute("hiddenNeighbors", false);
          graph.forEachNode((node) => {
            graph.setNodeAttribute(node, "hidden", false);
          });
          return;
        }

        // Hide all except the clicked node and neighbors
        graph.setAttribute("hiddenNeighbors", true);
        graph.forEachNode((node) => {
          if (node == clickedNode) return;
          if (graph.areNeighbors(node, clickedNode)) return;

          graph.setNodeAttribute(node, "hidden", true);
        });
      },
    });
  }, [registerEvents]);

  return null;
}

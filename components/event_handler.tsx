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

          // Display the edges connected between the neighbors
          let edge = graph.edge(node, neighbor) ?? graph.edge(neighbor, node);
          graph.setEdgeAttribute(edge, "hidden", false);
        });
      },
      leaveNode: (e) => {
        let node = e.node;

        // Un-color the node
        graph.setNodeAttribute(node, "color", DEFAULT_NODE_COLOR);

        graph.forEachNeighbor(node, (neighbor) => {
          // Un-color the neighboring nodes
          graph.setNodeAttribute(neighbor, "color", DEFAULT_NODE_COLOR);

          // Hide the edges while leaving
          let edge = graph.edge(node, neighbor) ?? graph.edge(neighbor, node);
          if (graph.getEdgeAttribute(edge, "activeEdge") == true) return;

          graph.setEdgeAttribute(edge, "hidden", true);
        });
      },
      downNode: (e) => {
        let clickedNode = e.node;

        // Mark neighbor edges visible
        graph.forEachNeighbor(clickedNode, (neighbor) => {
          let edge = graph.edge(clickedNode, neighbor) ?? graph.edge(neighbor, clickedNode);

          // Reset if already marked active
          if (graph.getEdgeAttribute(edge, "activeEdge") === true) {
            graph.setEdgeAttribute(edge, "activeEdge", false);
            return;
          }

          graph.setEdgeAttribute(edge, "hidden", false);
          graph.setEdgeAttribute(edge, "activeEdge", true);
        })

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
  }, [registerEvents, sigma]);

  return null;
}

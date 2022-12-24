import { useRegisterEvents, useSigma } from "@react-sigma/core";
import { useState, useEffect } from "react";

const useSelectedNode = () => {
  const [node, setNode] = useState("");
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();

  useEffect(() => {
    let graph = sigma.getGraph();

    registerEvents({
      downNode: (e) => {
        let clickedNode = e.node;

        // Reset the selected node attribute
        if (node !== "") {
          graph.setAttribute("selectedNode", "");
          setNode("");
          return;
        }

        // Select the clicked node
        graph.setAttribute("selectedNode", clickedNode);
        setNode(clickedNode);
      },
    });
  }, [node, registerEvents, sigma]);

  return node;
};

export default useSelectedNode;

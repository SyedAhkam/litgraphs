import { ControlsContainer, SigmaContainer } from "@react-sigma/core";
import { useEffect, useState } from "react";
import GraphDataController from "./graph_data_controller";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";

export default function Root({ data }) {
  const [dataReady, setDataReady] = useState(false);

  const Fa2: React.FC = () => {
    const { start, kill, isRunning } = useWorkerLayoutForceAtlas2({
      settings: { slowDown: 10 },
    });

    useEffect(() => {
      // start FA2
      start();
      return () => {
        // Kill FA2 on unmount
        kill();
      };
    }, [start, kill]);

    return null;
  };

  if (data == null) return <p>Loading...</p>;

  return (
    <SigmaContainer
      settings={{
        renderEdgeLabels: true,
        defaultEdgeType: "arrow",
        labelDensity: 0.07,
        labelGridCellSize: 60,
        labelRenderedSizeThreshold: 15,
        labelFont: "Lato, sans-serif",
        zIndex: true,
      }}
      style={{
        background: "transparent",
      }}
    >
      <GraphDataController data={data} />
      <Fa2 />
      <ControlsContainer position="bottom-left" />
    </SigmaContainer>
  );
}

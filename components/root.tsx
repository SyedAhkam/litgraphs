import {
  ControlsContainer,
  FullScreenControl,
  SigmaContainer,
  useSigma,
  ZoomControl,
} from "@react-sigma/core";
import { useState } from "react";
import GraphDataController from "./graph_data_controller";
import "@react-sigma/core/lib/react-sigma.min.css";
import { LayoutForceAtlas2Control } from "@react-sigma/layout-forceatlas2";
import EventHandler from "./event_handler";
import {
  BsFullscreen,
  BsFullscreenExit,
  BsPlay,
  BsStop,
  BsZoomIn,
  BsZoomOut,
} from "react-icons/bs";
import { BiReset } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import SelectedNodeDetail from "./selected_node_detail";

export default function Root({ data }: any) {
  const [dataReady, setDataReady] = useState(false);

  if (data == null) return <p>Loading...</p>;

  const ResetControl = () => {
    const sigma = useSigma();

    return (
      <div className="react-sigma-control">
        <button
          title="Reset the viewport"
          onClick={() => {
            let graph = sigma.getGraph();
            graph.forEachNode((node) => {
              graph.setAttribute("hiddenNeighbors", false);
              graph.setNodeAttribute(node, "hidden", false);

              // Unselect the node
              // FIXME: the hook state is not updated
              graph.setNodeAttribute(node, "selected", false);
            });

            graph.forEachEdge((edge) => {
              graph.setEdgeAttribute(edge, "hidden", true);
              graph.setEdgeAttribute(edge, "activeEdge", false);
            })
          }}
        >
          <GrView />
        </button>
      </div>
    );
  };

  return (
    <SigmaContainer
      settings={{
        renderLabels: false,
        defaultEdgeType: "arrow",
        labelDensity: 0.07,
        labelGridCellSize: 60,
        labelRenderedSizeThreshold: 15,
        labelFont: "Lato, sans-serif",
        zIndex: true,
        labelColor: {
          color: "green",
        },
      }}
      style={{
        background: "transparent",
      }}
    >
      <GraphDataController data={data} />
      <EventHandler />
      <ControlsContainer position="top-left" className="mx-2 p-2 rounded">
        <ZoomControl>
          <BsZoomIn />
          <BsZoomOut />
          <BiReset />
        </ZoomControl>
        <FullScreenControl>
          <BsFullscreen />
          <BsFullscreenExit />
        </FullScreenControl>
        <LayoutForceAtlas2Control autoRunFor={4000}>
          <BsPlay />
          <BsStop />
        </LayoutForceAtlas2Control>
        <ResetControl />
      </ControlsContainer>
      <div className="absolute top-2 right-2">
        <SelectedNodeDetail />
      </div>
    </SigmaContainer>
  );
}

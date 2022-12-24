import {
  ControlsContainer,
  FullScreenControl,
  SigmaContainer,
  ZoomControl,
} from "@react-sigma/core";
import { useEffect, useState } from "react";
import GraphDataController from "./graph_data_controller";
import "@react-sigma/core/lib/react-sigma.min.css";
import { LayoutForceAtlas2Control } from "@react-sigma/layout-forceatlas2";
import { LayoutNoverlapControl } from "@react-sigma/layout-noverlap";
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

export default function Root({ data }) {
  const [dataReady, setDataReady] = useState(false);

  if (data == null) return <p>Loading...</p>;

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
      <ControlsContainer position="top-left">
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
      </ControlsContainer>
    </SigmaContainer>
  );
}

import { useSigma } from "@react-sigma/core";
import { useEffect } from "react";
import useSelectedNode from "../hooks/useSelectedNode";

export default function SelectedNodeDetail() {
  const sigma = useSigma();
  const selectedNode = useSelectedNode();

  const getAttribute = (attr: string) =>
    sigma.getGraph().getNodeAttribute(selectedNode, attr);

  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
    >
      <div className="collapse-title text-xl font-medium">
        {selectedNode == "" ? "Select a node" : selectedNode}
      </div>
      <div className="collapse-content">
        {selectedNode == "" ? (
          <p>No selected node</p>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Value</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Label</td>
                <td>{getAttribute("label")}</td>
              </tr>
              <tr>
                <td>Tag</td>
                <td>{getAttribute("tag")}</td>
              </tr>
              <tr>
                <td>URL</td>
                <td>{getAttribute("URL")}</td>
              </tr>
              <tr>
                <td>Cluster</td>
                <td>{getAttribute("cluster")}</td>
              </tr>
              <tr>
                <td>Score</td>
                <td>{getAttribute("score")}</td>
              </tr>
              <tr>
                <td>Size</td>
                <td>{getAttribute("size")}</td>
              </tr>
              <tr>
                <td>Coords</td>
                <td>
                  {getAttribute("x")}
                  <br />
                  {getAttribute("y")}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

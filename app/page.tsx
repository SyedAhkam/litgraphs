"use client";

import SearchBar from "../components/filter_bar";

import Root from "../components/root";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

const getDataset = async () => {
  let res = await fetch("/dataset.json");
  let data = await res.json();

  return data;
};

export default function Home() {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    getDataset().then((data) => setData(data));
  }, []);

  useEffect(() => {
    if (filter == null) return;

    if (filter.length === 0) {
      getDataset().then((data) => setData(data));
      return;
    }

    getDataset().then((data) => {
      const fuse = new Fuse(data.nodes, {
        keys: ["label"],
        threshold: 0.3,
      });

      const filtered = fuse.search(filter);
      const filteredKeys = filtered.map((item) => item.item.key);

      const filteredData = {
        nodes: data.nodes.filter((node) => filteredKeys.includes(node.key)),
        edges: data.edges.filter(
          (edge) =>
            filteredKeys.includes(edge[0]) && filteredKeys.includes(edge[1])
        ),
      };

      setData(filteredData);
    });
  }, [filter]);

  return (
    <div className="flex flex-row">
      <div className="w-1/4 bg-base-200  px-8 py-8">
        <h2 className="text-2xl text-lime-300">Nodes</h2>
        <div className="flex flex-row justify-between">
          <h3 className="text-zinc-200">The nodes in graph</h3>
          <p className="text-sm">{data?.nodes.length}</p>
        </div>

        <SearchBar onFilterChange={(text) => setFilter(text)} />
        <div className="flex flex-col h-[100vh] overflow-y-scroll space-y-4 first:pt-16">
          {/* @ts-ignore */}
          {data?.nodes.map((node, idx) => (
            <label
              key={node.id}
              className="rounded-lg border py-4 px-4 hover:bg-slate-400 hover:text-white"
            >
              <span className="font-extrabold text-green">{idx + 1}.</span>{" "}
              {node.label}
            </label>
            // <button key={node.id} className="btn btn-outline">
            //   {node.label}
            // </button>
          ))}
        </div>
      </div>

      <div className="grow bg-base-300">
        <Root data={data} />
      </div>
    </div>
  );
}

"use client";

import SearchBar from "../components/search_bar";

import Root from "../components/root";
import { useEffect, useState } from "react";

const getDataset = async () => {
  let res = await fetch("/dataset.json");
  let data = await res.json();

  return data;
};

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDataset().then((data) => setData(data));
  }, []);

  return (
    <div className="flex flex-row">
      <div className="w-1/4 bg-base-200  px-8 py-8">
        <h2 className="text-2xl text-lime-300">Nodes</h2>
        <h3 className="text-zinc-200">The nodes in graph</h3>

        <SearchBar />
        <div className="flex flex-col h-[100vh] overflow-y-scroll">
          {data?.nodes.map((node) => (
            <p>{node.label}</p>
          ))}
        </div>
      </div>

      <div className="grow bg-base-300">
        <Root data={data} />
      </div>
    </div>
  );
}

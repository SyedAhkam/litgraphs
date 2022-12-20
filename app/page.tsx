import SearchBar from "../components/search_bar";

export default function Home() {
  return (
    <div className="flex flex-row">
      <div className="w-1/4 bg-base-200 h-[100vh] px-8 py-8">
        <h2 className="text-2xl text-lime-300">Nodes</h2>
        <h3 className="text-zinc-200">The nodes in graph</h3>

        <SearchBar />
      </div>
      <div className="grow bg-base-300"></div>
    </div>
  );
}

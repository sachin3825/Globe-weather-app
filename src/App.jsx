import React from "react";
import WheatherSearch from "./pages/WheatherSearch";
import Home from "./pages/Home";
import CanvasModel from "./canvas";

function App() {
  return (
    <main className='app transition-all ease-in bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-600'>
      <Home />
      <WheatherSearch />
      <CanvasModel />
    </main>
  );
}

export default App;

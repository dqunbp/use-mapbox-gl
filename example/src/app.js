import React from "react";

import BasicMap from "./map-examples/basic";
import WithoutToken from "./map-examples/without-token";

function App() {
  return (
    <div className="app">
      <header className="container">
        <h1 className="logo">
          <a href="https://github.com/dqunbp/use-mapbox-gl">use-mapbox-gl</a>{" "}
          react hook
        </h1>
      </header>
      <main>
        <BasicMap />
        <WithoutToken />
      </main>
    </div>
  );
}

export default App;

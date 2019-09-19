import React from "react";

import useMapboxGl from "use-mapbox-gl";
import { STYLES } from "./mapStyles";

const INITIAL_VIEWPORT = {
  latitude: 44.634507629603483,
  longitude: 48.818963526964204,
  zoom: 10,
  bearing: -0,
  pitch: 0
};

const App = () => {
  const [style, setStyle] = React.useState("OSM");
  const mapDivRef = React.useRef();
  const { setViewport } = useMapboxGl({
    mapNodeRef: mapDivRef,
    initialViewport: INITIAL_VIEWPORT,
    style: STYLES[style],
    onViewportChanged: v => console.log("viewport changed", v),
    onLoaded: () => console.log("map loaded")
  });
  return (
    <React.Fragment>
      <p>
        Select map style{" "}
        <select
          name="style"
          value={style}
          onChange={e => setStyle(e.target.value)}
        >
          <option value="OSM">open street maps</option>
          <option value="OTP">open topo map</option>
        </select>{" "}
        <button
          onClick={() =>
            setViewport(INITIAL_VIEWPORT, {
              speed: 1,
              curve: 1,
              easing: t => t
            })
          }
        >
          reset vieport
        </button>
      </p>
      <div className="map-container">
        <div id="map" ref={mapDivRef}></div>
      </div>
    </React.Fragment>
  );
};
export default App;

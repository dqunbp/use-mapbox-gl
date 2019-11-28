import React, { useState, useRef } from "react";

import useMapboxGl, { ViewportUpdatingMode as mode } from "use-mapbox-gl";
import { STYLES } from "./mapStyles";

const INITIAL_VIEWPORT = {
  latitude: 44.634507629603483,
  longitude: 48.818963526964204,
  zoom: 10,
  bearing: -0,
  pitch: 0
};

const Map = () => {
  const [updatingMode, setUpdatingMode] = useState(mode.MOVEEND);
  const [style, setStyle] = useState("OSM");
  const mapDivRef = useRef();

  // This is example of using without token
  const { getMap, setViewport } = useMapboxGl({
    mapNodeRef: mapDivRef,
    initialViewport: INITIAL_VIEWPORT,
    style: STYLES[style],
    onViewportChanged: v => console.log("viewport changed", v),
    onLoaded: () => console.log("map zoom", getMap().getZoom()),
    viewportUpdatingMode: updatingMode
  });
  return (
    <div className="app">
      <div className="options">
        <div>
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
          <p>
            Select viewport updating mode{" "}
            <select
              name="mode"
              value={updatingMode}
              onChange={e => setUpdatingMode(e.target.value)}
            >
              <option value={mode.MOVEEND}>MOVEEND</option>
              <option value={mode.MOVE}>MOVE</option>
            </select>{" "}
            (check the console)
          </p>
        </div>
        <h1>
          <a href="https://github.com/dqunbp/use-mapbox-gl">use-mapbox-gl</a>
        </h1>
      </div>
      <div className="map-container">
        <div id="map" ref={mapDivRef}></div>
      </div>
    </div>
  );
};
export default Map;

import React, { useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useMapboxGl } from "use-mapbox-gl";

const code = `import React from "react";
import { useMapboxGl } from "use-mapbox-gl";

const osmStyle = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "osm",
      source: "osm",
      type: "raster",
    },
  ],
};

function WithoutTokenMap() {
  const containerRef = useRef();

  useMapboxGl(containerRef, {
    style: osmStyle,
    zoom: 9,
    center: [30, 50],
  });

  return <div ref={containerRef} />;
}

export default WithoutTokenMap
`;

const osmStyle = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "osm",
      source: "osm",
      type: "raster",
    },
  ],
};

function WithoutTokenMap() {
  const containerRef = useRef();

  useMapboxGl(containerRef, {
    style: osmStyle,
    zoom: 9,
    center: [30, 50],
  });

  return (
    <section className="container example">
      <h2 className="title">Without token</h2>
      <div className="map" ref={containerRef} />
      <div>
        <SyntaxHighlighter
          language="javascript"
          style={atomOneDark}
          customStyle={{ borderRadius: "5px", padding: "1.5rem" }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </section>
  );
}

export default WithoutTokenMap;

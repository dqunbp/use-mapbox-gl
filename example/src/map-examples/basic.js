import React, { useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useMapboxGl } from "use-mapbox-gl";

const code = `import React from "react";
import { useMapboxGl } from "use-mapbox-gl";

function BasicMap() {
  const containerRef = useRef();

  useMapboxGl(containerRef, {
    style: "mapbox://styles/mapbox/streets-v11",
    accessToken: "your_access_token",
  });

  return <div ref={containerRef} />;
}

export default BasicMap
`;

const token =
  process.env.REACT_APP_MAPBOX_TOKEN ||
  "pk.eyJ1IjoiZHF1bmJwIiwiYSI6ImNrZjEwNGphNzBuczQyd2xuYng4cjN4MjEifQ.oNhRDejc1ELUrre1pVL4EA";

function BasicMap() {
  const containerRef = useRef();

  useMapboxGl(containerRef, {
    style: "mapbox://styles/mapbox/streets-v11",
    accessToken: token,
  });

  return (
    <section className="container example">
      <h2 className="title">Basic Map</h2>
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

export default BasicMap;

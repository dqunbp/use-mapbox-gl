# use-mapbox-gl

> mapbox-gl react hook

[![NPM](https://img.shields.io/npm/v/use-mapbox-gl.svg)](https://www.npmjs.com/package/use-mapbox-gl) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-mapbox-gl
```

## Usage

```tsx
import * as React from "react";
import useMapboxGl from "use-mapbox-gl";

const Example = () => {
  const mapDivRef = React.useRef();
  useMapboxGl({
    mapNodeRef: mapDivRef,
    initialViewport: viewport,
    style: mapStyle,
    onViewportChanged: v => console.log("viewport changed", v),
    onLoaded: () => console.log("map loaded")
  });
  return <div ref={mapDivRef}>{example}</div>;
};
```

See extended case in the example.

## Api

Options:

- **mapNodeRef** - mapbox-gl map container ref
- **initialViewport** - initial map `viewport`
- **style** - mapbox-gl map style
- **onViewportChanged** - calls when `viewport` updated
- **onLoaded** - calls when map `load` event fired

Returns object with shape:

- **mapRef**
- **setViewport**

Supported `viewport` shape:

```tsx
{
  latitude;
  longitude;
  zoom;
  bearing;
  pitch;
}
```

## License

MIT © [dqunbp](https://github.com/dqunbp)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).

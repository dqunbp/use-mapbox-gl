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

## API

Options:

- **mapNodeRef** - mapbox-gl map container ref
- **initialViewport** - initial map `viewport`
- **style** - mapbox-gl [style](https://docs.mapbox.com/mapbox-gl-js/style-spec/)
- **onViewportChanged** - called when `viewport` updated
- **onLoaded** - called when map `load` event fired
- **viewportUpdatingMode** - `mapbox-gl` [event](https://docs.mapbox.com/mapbox-gl-js/api/#events) to viewport updating
  - accepted values:
    - `move` - update on each `viewport` change tick
    - `moveend` - update `viewport` when the map is stopped moving

Returns object with shape:

- **getMap** - returns map instance
- **setViewport** - returns `viewport`

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

> `onViewportChanged` callback invokes on `moveend` mapbox-gl event

## License

MIT © [dqunbp](https://github.com/dqunbp)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).

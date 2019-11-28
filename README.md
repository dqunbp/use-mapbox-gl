# use-mapbox-gl

> mapbox-gl react hook

[![NPM](https://img.shields.io/npm/v/use-mapbox-gl.svg)](https://www.npmjs.com/package/use-mapbox-gl) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Install

```bash
npm install --save use-mapbox-gl
```

> Don't forget install `mapbox-gl`

```bash
npm install --save mapbox-gl
```

> You may also need to use `mapbox-gl` styles

```html
<link
  href="https://api.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css"
  rel="stylesheet"
/>
```

## Usage

```tsx
import * as React from "react";
import useMapboxGl from "use-mapbox-gl";

const Example = () => {
  const mapDivRef = React.useRef();
  useMapboxGl({
    mapboxAccessToken: "your_access_token",
    mapNodeRef: mapDivRef,
    initialViewport: {
      latitude: 44.634507629603483,
      longitude: 48.818963526964204,
      zoom: 10
    },
    style: "mapbox://styles/mapbox/streets-v11",
    onViewportChanged: v => console.log("viewport changed", v),
    onLoaded: () => console.log("map loaded")
  });
  return <div ref={mapDivRef}>{example}</div>;
};
```

See extended case in the [example](https://github.com/dqunbp/use-mapbox-gl/tree/master/example).

## API

Options:

- **mapboxAccessToken** - mapbox-gl access token
- **mapNodeRef** - mapbox-gl map container ref
- **initialViewport** - initial map `viewport`
- **style** - mapbox-gl map [style](https://docs.mapbox.com/mapbox-gl-js/style-spec/)
- **onViewportChanged** - called when `viewport` updated
- **onLoaded** - called when map `load` event fired
- **viewportUpdatingMode** - `mapbox-gl` [event](https://docs.mapbox.com/mapbox-gl-js/api/#events) to viewport updating
  - accepted values:
    - `move` - update on each `viewport` change tick
    - `moveend` - update `viewport` when the map is stopped moving

Returns object with shape:

- **getMap** - returns the map instance
- **setViewport** - sets the map `viewport`
  - args
    - Viewport [mapbox description](https://docs.mapbox.com/mapbox-gl-js/api/#cameraoptions)
      - `latitude` (optional)
      - `longitude` (optional)
      - `zoom` (optional)
      - `bearing` (optional)
      - `pitch` (optional)
    - Options [mapbox description](https://docs.mapbox.com/mapbox-gl-js/api/#animationoptions)
      - `speed` (optional)
      - `curve` (optional)
      - `easing` (optional)

> `setViewport` calls one of mapbox-gl methods, depends on options

| Will called \ Passed options | `speed` | `easing` | `curve` |
| :--------------------------: | ------- | -------- | ------- |
|           `flyTo`            | +       | +        | +       |
|           `easeTo`           | +       | +        | -       |
|           `jumpTo`           | -       | -        | -       |

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

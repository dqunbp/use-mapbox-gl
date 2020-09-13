# use-mapbox-gl

Simple, 0 dependency hook around [mapbox-gl](https://docs.mapbox.com/mapbox-gl-js/api/)

[![NPM](https://img.shields.io/npm/v/use-mapbox-gl.svg)](https://www.npmjs.com/package/use-mapbox-gl) 
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## 🖥 Demo
Check out the [demo](https://dqunbp.github.io/use-mapbox-gl/)


## 📦 Installation

  ##### with npm

    $ npm install --save use-mapbox-gl

  ##### with yarn

    $ yarn add use-mapbox-gl

## ⚠️ Don't forget install peer dependencies! If it not alredy installed
  ##### with npm

    $ npm install --save mapbox-gl

  ##### with yarn

    $ yarn add mapbox-gl


## 💅 Import styles. You also need to use `mapbox-gl` styles


If you are using `create-react-app` add this link to the `public/index.html` into the `head` tag

```html
<link
  href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
  rel="stylesheet"
/>
```

**OR** You can also import styles from `mapbox-gl` dependencies

Add this import to your `src/index.js`
```js
import "mapbox-gl/dist/index.css"
```


## 📖 Examples

### 🔗 With token

```jsx
import React from "react";
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
```

### 🔗 Without token

For using without token, you need to define custom base map style, as example:

```js
import React from "react";
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
```

## 🕹 API

#### 🔗 useMapboxGl

- **container** - The HTML element `React` `ref` in which Mapbox GL JS will render the map
- **options** *(optional)* - object with native [mapbox-gl](https://docs.mapbox.com/mapbox-gl-js/api/map/#map-parameters) parameters, without container prop
- **setMapApi** *(optional)* - map load callback, called when [mapbox-gl load event](https://docs.mapbox.com/mapbox-gl-js/api/map/#map.event:load) is fired

```ts
useMapboxGl(
  container: React.MutableRefObject<HTMLDivElement> 
  options?: Omit<MapboxOptions, "container">
  setMapApi?: (map: mapboxgl.Map) => void 
)
```

---

## License

MIT © [dqunbp](https://github.com/dqunbp)

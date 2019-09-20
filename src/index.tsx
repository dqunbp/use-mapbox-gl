import * as React from "react";
import mapboxgl from "mapbox-gl";

export interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
}

enum ViewportUpdatingMode {
  moveend = "moveend",
  move = "move"
}

export interface MapEventTarget {
  target: mapboxgl.Map;
}

export interface MapboxGlHookOptions {
  mapNodeRef: React.RefObject<HTMLDivElement>;
  initialViewport: Viewport;
  style: mapboxgl.Style;
  onViewportChanged?: (viewport: Viewport) => void;
  onLoaded?: (map: mapboxgl.Map) => void;
  mapboxAccessToken?: string;
  viewportUpdatingMode?: ViewportUpdatingMode;
}

export interface ChangeViewportOptions {
  speed?: number;
  curve?: number;
  easing?: (t: number) => number;
}

interface MapOptions {
  container: HTMLDivElement;
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
  accessToken?: string;
}

function buildCenter(longitude: number, latitude: number) {
  return new mapboxgl.LngLat(latitude, longitude);
}

export function getMapViewport(map: mapboxgl.Map): Viewport {
  const [latitude, longitude] = map.getCenter().toArray();
  const zoom = map.getZoom();
  const bearing = map.getBearing();
  const pitch = map.getPitch();
  return { longitude, latitude, zoom, bearing, pitch };
}

enum MoveFunctions {
  jumpTo = "jumpTo",
  easeTo = "easeTo",
  flyTo = "flyTo"
}

function getMoveParams(
  options?: ChangeViewportOptions
): [MoveFunctions, ChangeViewportOptions] {
  let moveFn = MoveFunctions.jumpTo;
  let moveOptions = {};
  if (options) {
    const { speed, curve, easing } = options;
    if (speed && curve && easing) {
      moveFn = MoveFunctions.flyTo;
      moveOptions = options;
    } else if (speed && easing) {
      moveFn = MoveFunctions.easeTo;
      moveOptions = { speed, easing };
    }
  }
  return [moveFn, moveOptions];
}

function setMapViewport(
  map: mapboxgl.Map,
  viewport: Viewport,
  options?: ChangeViewportOptions
): void {
  const center = buildCenter(viewport.longitude, viewport.latitude);
  const [moveFn, moveOptions] = getMoveParams(options);
  map[moveFn]({
    center,
    zoom: viewport.zoom,
    ...moveOptions
  });
}

function getMapOptions(
  container: HTMLDivElement,
  viewport: Viewport,
  token?: string
): MapOptions {
  let center: [number, number];
  center = [viewport.latitude, viewport.longitude];
  const mapOptions = {
    container,
    center,
    zoom: viewport.zoom,
    bearing: viewport.bearing,
    pitch: viewport.pitch
  };
  if (token) mapOptions["accessToken"] = token;
  return mapOptions;
}

export default function useMapboxGl({
  mapNodeRef,
  initialViewport,
  style,
  onViewportChanged,
  onLoaded,
  mapboxAccessToken,
  viewportUpdatingMode = ViewportUpdatingMode.moveend
}: MapboxGlHookOptions): {
  mapRef: React.RefObject<mapboxgl.Map>;
  setViewport: (viewport: Viewport, options: ChangeViewportOptions) => void;
  getMap: () => mapboxgl.Map | null;
} {
  const mapRef = React.useRef<null | mapboxgl.Map>(null);

  React.useEffect((): (() => void) | void => {
    if (mapNodeRef.current) {
      const mapOptions = getMapOptions(
        mapNodeRef.current,
        initialViewport,
        mapboxAccessToken
      );
      mapRef.current = new mapboxgl.Map(mapOptions);

      const viewportChanged = ({ target: map }: MapEventTarget): void => {
        const viewport = getMapViewport(map);
        onViewportChanged && onViewportChanged(viewport);
      };
      const handleMapLoad = ({ target: map }: MapEventTarget): void => {
        viewportChanged({ target: map });
        if (onLoaded) onLoaded(map);
      };
      mapRef.current.on(viewportUpdatingMode, viewportChanged);
      mapRef.current.on("load", handleMapLoad);

      return () => {
        if (mapRef.current) mapRef.current.remove();
      };
    }
  }, [mapNodeRef]);

  React.useEffect(() => {
    if (mapRef.current) if (style) mapRef.current.setStyle(style);
  }, [mapRef, style]);

  const getMap = React.useCallback((): mapboxgl.Map | null => {
    if (mapRef.current) return mapRef.current;
    else return null;
  }, [mapRef]);

  const setViewport = React.useCallback(
    (viewport: Viewport, options?: ChangeViewportOptions): void => {
      if (mapRef.current) {
        const currentViewport = getMapViewport(mapRef.current);
        setMapViewport(
          mapRef.current,
          { ...currentViewport, ...viewport },
          options
        );
      }
    },
    [mapRef]
  );
  return { mapRef, setViewport, getMap };
}

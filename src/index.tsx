import * as React from "react";
import mapboxgl from "mapbox-gl";

export interface IViewport {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
}

export enum ViewportUpdatingMode {
  moveend = "moveend",
  move = "move"
}

export interface IMapEventTarget {
  target: mapboxgl.Map;
}

export interface IMapboxGlHookOptions {
  mapNodeRef: React.RefObject<HTMLDivElement>;
  initialViewport: IViewport;
  style: mapboxgl.Style;
  onViewportChanged?: (viewport: IViewport) => void;
  onLoaded?: (map: mapboxgl.Map) => void;
  mapboxAccessToken?: string;
  viewportUpdatingMode?: ViewportUpdatingMode;
}

export interface IChangeViewportOptions {
  speed?: number;
  curve?: number;
  easing?: (t: number) => number;
}

interface IMapOptions {
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

export function getMapViewport(map: mapboxgl.Map): IViewport {
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
  options?: IChangeViewportOptions
): [MoveFunctions, IChangeViewportOptions] {
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
  viewport: IViewport,
  options?: IChangeViewportOptions
): void {
  const center = buildCenter(viewport.longitude, viewport.latitude);
  const [moveFn, moveOptions] = getMoveParams(options);
  map[moveFn]({
    ...moveOptions,
    ...viewport,
    center
  });
}

function getMapOptions(
  container: HTMLDivElement,
  viewport: IViewport,
  token?: string
): IMapOptions {
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

function getViewportUpdatingMode(
  modeName: ViewportUpdatingMode
): ViewportUpdatingMode {
  const mode = ViewportUpdatingMode[modeName];
  if (!mode)
    throw new Error(
      "Bad value, viewport updating mode shoud be one of [move, moveend]"
    );
  return mode;
}

export default function useMapboxGl({
  mapNodeRef,
  initialViewport,
  style,
  onViewportChanged,
  onLoaded,
  mapboxAccessToken,
  viewportUpdatingMode = ViewportUpdatingMode.moveend
}: IMapboxGlHookOptions): {
  mapRef: React.RefObject<mapboxgl.Map>;
  setViewport: (viewport: IViewport, options: IChangeViewportOptions) => void;
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

      const viewportChanged = ({ target: map }: IMapEventTarget): void => {
        const viewport = getMapViewport(map);
        onViewportChanged && onViewportChanged(viewport);
      };
      const handleMapLoad = ({ target: map }: mapboxgl.MapboxEvent): void => {
        viewportChanged({ target: map });
        if (onLoaded) onLoaded(map);
      };
      mapRef.current.on(
        getViewportUpdatingMode(viewportUpdatingMode),
        viewportChanged
      );
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
    (viewport: IViewport, options?: IChangeViewportOptions): void => {
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

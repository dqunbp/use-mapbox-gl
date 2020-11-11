import mapboxgl, { MapboxOptions } from "mapbox-gl";
import { useEffect } from "react";

type MapOptions = Omit<MapboxOptions, "container">;

export const defaultMapOptions: MapOptions = {
  style: "mapbox://styles/mapbox/streets-v11",
  center: [0, 0],
  zoom: 0,
};

export function useMapboxGl(
  cotainerRef: React.MutableRefObject<HTMLElement>,
  options?: MapOptions,
  setMapAPI?: (map: mapboxgl.Map) => void,
  cleanMapAPI?: () => void
) {
  useEffect(() => {
    const container = cotainerRef.current;
    if (!container) return;

    const userOptions = options ?? {};

    const mapOptions = { ...defaultMapOptions, ...userOptions, container };

    const mapboxGlMap = new mapboxgl.Map(mapOptions);

    mapboxGlMap.once("load", () => setMapAPI && setMapAPI(mapboxGlMap));

    return () => {
      mapboxGlMap.remove();
      if (cleanMapAPI) cleanMapAPI();
    };
  }, []);
}

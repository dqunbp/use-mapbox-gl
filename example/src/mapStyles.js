// Custom base styles for using without token
export const STYLES = {
  OSM: {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: [
          "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
          "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
          "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ],
        tileSize: 256
      }
    },
    layers: [
      {
        id: "osm",
        source: "osm",
        type: "raster"
      }
    ]
  },

  OTP: {
    version: 8,
    sources: {
      otp: {
        type: "raster",
        tiles: [
          "https://a.tile.opentopomap.org/{z}/{x}/{y}.png",
          "https://b.tile.opentopomap.org/{z}/{x}/{y}.png",
          "https://c.tile.opentopomap.org/{z}/{x}/{y}.png"
        ],
        tileSize: 256
      }
    },
    layers: [
      {
        id: "otp",
        source: "otp",
        type: "raster"
      }
    ]
  }
};

import { RecordsItem } from "../../../index";
import { Marker, Tooltip, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store";

type DistanceSignsProps = { path: RecordsItem[] };
type CustomMarkerProps = { position: LatLngExpression; label: number; timestamp: string };

const CustomMarker = ({ position, label, timestamp }: CustomMarkerProps) => {
  const customIcon = L.divIcon({
    className: "custom-marker",
    html: `<span>${label} km</span>`,
    iconSize: [40, 20]
  });

  return (
    <Marker position={position} icon={customIcon}>
      <Tooltip direction="top" offset={[0, -10]}>
        {dayjs(timestamp).format("HH:mm:ss")}
      </Tooltip>
    </Marker>
  );
};

const DistanceSigns = ({ path }: DistanceSignsProps) => {
  const settings = useAppStore((state) => state.settings);
  const [zoomLevel, setZoomLevel] = useState(0);
  const map = useMap();

  let nextDistanceThreshold = 1000;
  const result = [];

  for (const pathKey of path) {
    if (pathKey.distance >= nextDistanceThreshold) {
      result.push({
        coordinates: [pathKey.position_lat, pathKey.position_long] as LatLngExpression,
        distance: nextDistanceThreshold / 1000,
        timestamp: pathKey.timestamp
      });
      nextDistanceThreshold += 1000;
    }
  }

  useEffect(() => {
    const handleZoom = () => {
      setZoomLevel(map.getZoom());
    };

    map.on("zoomend", handleZoom);
    setZoomLevel(map.getZoom());

    return () => {
      map.off("zoomend", handleZoom);
    };
  }, [map]);

  return settings.distanceSignsVisibleZoomLevel < zoomLevel ? (
    <div>
      {result.map(({ distance, coordinates, timestamp }) => {
        return <CustomMarker key={distance} position={coordinates} label={distance} timestamp={timestamp} />;
      })}
    </div>
  ) : null;
};

export default DistanceSigns;

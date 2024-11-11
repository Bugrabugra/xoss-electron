import { RecordsItem } from "../../../index";
import { useEffect, useMemo } from "react";
import { useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";

type PathProps = { path: RecordsItem[]; color: string; width: number };

const Path = ({ path, width, color }: PathProps) => {
  const map = useMap();

  const coordinates = useMemo(() => {
    return path.map((item) => {
      return [item.position_lat, item.position_long] as LatLngExpression;
    });
  }, [path]);

  const polyline = L.polyline(coordinates, { weight: width, color });

  useEffect(() => {
    if (path?.length > 0) {
      polyline.addTo(map);

      map.fitBounds(polyline.getBounds(), { animate: true });
    }

    return () => {
      map.removeLayer(polyline);
    };
  }, [polyline, map, path]);

  return <></>;
};

export default Path;

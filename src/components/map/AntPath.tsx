import { RecordsItem } from "../../../index";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { antPath } from "leaflet-ant-path";

type AntPathProps = { path: RecordsItem[] };

export const AntPath = ({ path }: AntPathProps) => {
  const map = useMap();

  const convertedPath = path.map((p) => {
    return [p.position_lat, p.position_long];
  });

  const antPolyline = antPath(convertedPath, { weight: 3, delay: 1000 });

  useEffect(() => {
    if (path?.length > 0) {
      antPolyline.addTo(map);

      map.fitBounds(antPolyline.getBounds(), { animate: true, padding: [1, 1] });
    }

    return () => {
      map.removeLayer(antPolyline);
    };
  }, [antPolyline, map, path]);

  return <></>;
};

import { RecordsItem } from "../../../index";
import { Marker, Tooltip } from "react-leaflet";
import flagStart from "../../assets/flag-start.png";
import flagEnd from "../../assets/flag-end.png";
import L from "leaflet";
import dayjs from "dayjs";

type StartAndEndPointsProps = { points: { first: RecordsItem; last: RecordsItem } };

const StartAndEndPoints = ({ points }: StartAndEndPointsProps) => {
  const [startPointCoordinates, endPointCoordinates] = [
    { lat: points.first.position_lat, lng: points.first.position_long },
    { lat: points.last.position_lat, lng: points.last.position_long }
  ];

  const iconCreator = (icon: string) => {
    return L.icon({
      iconUrl: icon,
      iconAnchor: [16, 32],
      iconSize: [32, 32],
      tooltipAnchor: [16, -16]
    });
  };

  return (
    <div>
      <Marker icon={iconCreator(flagStart)} position={startPointCoordinates}>
        <Tooltip direction="top" offset={[-16, -16]}>
          {dayjs(points.first.timestamp).format("DD-MM-YYYY HH:mm:ss")}
        </Tooltip>
      </Marker>
      <Marker icon={iconCreator(flagEnd)} position={endPointCoordinates}>
        <Tooltip direction="top" offset={[-16, -16]}>
          {dayjs(points.last.timestamp).format("DD-MM-YYYY HH:mm:ss")}
        </Tooltip>
      </Marker>
    </div>
  );
};

export default StartAndEndPoints;

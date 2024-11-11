import { MapContainer, TileLayer } from "react-leaflet";
import { useAppStore } from "@/store";
import { AntPath } from "@/components/map/AntPath";
import StartAndEndPoints from "@/components/map/StartAndEndPoints";
import Path from "@/components/map/Path";
import DistanceSigns from "@/components/map/DistanceSigns";
import useGetSelectedWorkout from "@/hooks/useGetSelectedWorkout";

const WorkoutMap = () => {
  const settings = useAppStore((state) => state.settings);
  const { workoutData } = useGetSelectedWorkout();

  return (
    <MapContainer center={[40.9999, 29.068894]} zoom={11} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {workoutData && workoutData.records.length > 0 && (
        <>
          {settings.isStartAndEndPointsEnabled && (
            <StartAndEndPoints
              points={{
                first: workoutData.records[0],
                last: workoutData.records[workoutData.records.length - 1]
              }}
            />
          )}
          {settings.isDistanceSignsEnabled && <DistanceSigns path={workoutData.records} />}
          {settings.isAntPathEnabled && <AntPath path={workoutData.records} />}
          {!settings.isAntPathEnabled && (
            <Path path={workoutData.records} color={settings.pathColor} width={settings.pathWidth} />
          )}
        </>
      )}
    </MapContainer>
  );
};

export default WorkoutMap;

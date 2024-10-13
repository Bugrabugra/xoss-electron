import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useAppStore } from "@/store";
import { useEffect, useState } from "react";
import { JSONFile, WorkoutRecord } from "../../index";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { antPath } from "leaflet-ant-path";

const AntPathComp = ({ path }: { path: WorkoutRecord[] }) => {
  const convertedPath = path.map((p) => {
    return [p.position_lat, p.position_long];
  });

  const map = useMap();

  const antPolyline = antPath(convertedPath, { weight: 3, delay: 1000 });

  useEffect(() => {
    if (path && path.length > 0) {
      antPolyline.addTo(map);

      map.fitBounds(antPolyline.getBounds(), { animate: true, padding: [1, 1] });
    }

    return () => {
      map.removeLayer(antPolyline);
    };
  }, [antPolyline, map, path]);

  return <></>;
};

const WorkoutMap = () => {
  const { selectedWorkout } = useAppStore();
  const [workoutData, setWorkoutData] = useState<JSONFile | null>();

  const getWorkout = async (): Promise<void> => {
    const workout = await window.xossApi.getWorkouts(selectedWorkout);
    const parsedWorkout = JSON.parse(workout);
    setWorkoutData(parsedWorkout);
  };

  useEffect(() => {
    if (selectedWorkout) {
      getWorkout();
    }
  }, [selectedWorkout]);

  return (
    <MapContainer center={[40.9999, 29.068894]} zoom={11} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {workoutData && workoutData.records.length > 0 && <AntPathComp path={workoutData.records} />}
    </MapContainer>
  );
};

export default WorkoutMap;

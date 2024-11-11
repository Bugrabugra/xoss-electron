import { useEffect, useState } from "react";
import { ConvertedJSONFile } from "../../index";
import { useAppStore } from "@/store";

const useGetSelectedWorkout = () => {
  const selectedWorkout = useAppStore((state) => state.selectedWorkout);
  const [workoutData, setWorkoutData] = useState<ConvertedJSONFile | null>();

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

  return { workoutData };
};

export default useGetSelectedWorkout;

import { StateCreator } from "zustand/vanilla";
import { JSONFileWithId } from "../../../index";

type State = {
  workouts: JSONFileWithId[];
  selectedWorkout?: string;
};

type Action = {
  setWorkouts: () => Promise<void>;
  setSelectedWorkout: (workoutId: string) => void;
};

export type WorkoutSlice = State & Action;

export const createWorkoutSlice: StateCreator<WorkoutSlice> = (set) => ({
  workouts: [],
  selectedWorkout: undefined,
  setWorkouts: async () => {
    const result = await window.xossApi.getWorkouts();
    const workouts = JSON.parse(result) as JSONFileWithId[];

    set({ workouts });
  },
  setSelectedWorkout: (workoutId: string) => {
    set({ selectedWorkout: workoutId });
  }
});

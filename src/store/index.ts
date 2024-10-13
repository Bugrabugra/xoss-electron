import { create } from "zustand";
import { createWorkoutSlice, WorkoutSlice } from "@/store/slices/workout";

export const useAppStore = create<WorkoutSlice>()((...w) => ({
  ...createWorkoutSlice(...w)
}));

import { create } from "zustand";
import { createWorkoutSlice, WorkoutSlice } from "@/store/slices/workout";
import { createSettingsSlice, SettingsSlice } from "@/store/slices/settings";

export const useAppStore = create<WorkoutSlice & SettingsSlice>()((...w) => ({
  ...createWorkoutSlice(...w),
  ...createSettingsSlice(...w)
}));

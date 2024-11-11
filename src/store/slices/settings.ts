import { StateCreator } from "zustand/vanilla";
import { StoreSchema } from "../../../index";

type State = { settings: StoreSchema };

type Action = {
  updateStore: (object: StoreSchema) => void;
  loadStore: () => Promise<void>;
};

export type SettingsSlice = State & Action;

const initialState = {
  settings: {
    pathColor: "#ff0004",
    pathWidth: 2,
    isAntPathEnabled: true,
    isStartAndEndPointsEnabled: true,
    isDistanceSignsEnabled: true,
    distanceSignsVisibleZoomLevel: 12
  } satisfies StoreSchema
};

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  ...initialState,
  updateStore: (object: StoreSchema) => {
    window.xossApi.updateStore(object);
    set((state) => {
      return {
        ...state,
        settings: { ...state.settings, ...object }
      };
    });
  },
  loadStore: async () => {
    const settings = await window.xossApi.getWholeStore();

    set((state) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...settings
        }
      };
    });
  }
});

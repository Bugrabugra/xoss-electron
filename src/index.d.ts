export interface XossApi {
  selectFitFile: () => Promise<string>;
  convertFitToJson: (fitPath: string) => Promise<void>;
  getWorkouts: (workoutId?: string) => Promise<string>;
}

declare global {
  interface Window {
    xossApi: XossApi;
  }
}

type WorkoutRecord = {
  timestamp: string;
  position_lat: number;
  position_long: number;
  distance: number;
  altitude: number;
  speed: number;
  temperature: number;
};

type JSONFile = {
  records: WorkoutRecord[];
  details: {
    timestamp: string;
    start_time: string;
    total_elapsed_time: number;
    total_distance: number;
    total_moving_time: number;
    enhanced_avg_speed: number;
    enhanced_max_speed: number;
    enhanced_avg_altitude: number;
    enhanced_min_altitude: number;
    enhanced_max_altitude: number;
    avg_speed: number;
    max_speed: number;
    total_ascent: number;
    total_descent: number;
    num_laps: number;
    avg_altitude: number;
    max_altitude: number;
    min_altitude: number;
    avg_temperature: number;
    max_temperature: number;
  };
};

export type JSONFileWithId = JSONFile & { _id: string };

export interface XossApi {
  selectFitFile: () => Promise<string>;
  convertFitToJson: (fitPath: string) => void;
  getWorkouts: (workoutId?: string) => Promise<string>;
}

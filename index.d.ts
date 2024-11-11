import { StoreSchema } from "./electron/main";

interface FitJSONFile {
  protocolVersion: number;
  profileVersion: number;
  file_creator: File_creator;
  zones_target: Zones_target;
  activity: Activity;
  sessions: SessionsItem[];
  laps: unknown[];
  lengths: unknown[];
  records: RecordsItem[];
  events: unknown[];
  device_infos: unknown[];
  developer_data_ids: unknown[];
  field_descriptions: unknown[];
  hrv: unknown[];
  dive_gases: unknown[];
  course_points: unknown[];
  sports: unknown[];
  devices: unknown[];
  monitors: unknown[];
  stress: unknown[];
  file_ids: FileIdsItem[];
  monitor_info: unknown[];
  definitions: unknown[];
  tank_updates: unknown[];
  tank_summaries: unknown[];
}

interface File_creator {
  software_version: number;
  hardware_version: number;
}

interface Zones_target {
  functional_threshold_power: number;
  max_heart_rate: number;
  threshold_heart_rate: number;
}

interface Activity {
  timestamp: string;
  total_timer_time: number;
  local_timestamp: string;
  num_sessions: number;
  type: string;
  event: string;
  event_type: string;
  event_group: number;
  sessions: SessionsItem[];
  events: unknown[];
  hrv: unknown[];
  device_infos: unknown[];
  developer_data_ids: unknown[];
  field_descriptions: unknown[];
  sports: unknown[];
}

interface SessionsItem {
  timestamp: string;
  start_time: string;
  start_position_lat: number;
  start_position_long: number;
  total_elapsed_time: number;
  total_timer_time: number;
  total_distance: number;
  total_moving_time: number;
  total_calories: number;
  avg_speed: number;
  max_speed: number;
  total_ascent: number;
  total_descent: number;
  num_laps: number;
  left_right_balance: Left_right_balance;
  avg_altitude: number;
  max_altitude: number;
  avg_pos_grade: number;
  avg_neg_grade: number;
  max_pos_grade: number;
  max_neg_grade: number;
  min_altitude: number;
  event: string;
  event_type: string;
  sport: string;
  sub_sport: string;
  avg_heart_rate: number;
  max_heart_rate: number;
  avg_cadence: number;
  max_cadence: number;
  avg_temperature: number;
  max_temperature: number;
  min_heart_rate: number;
  laps: unknown[];
}

interface Left_right_balance {
  0: boolean;
  value: number;
  right: boolean;
}

interface RecordsItem {
  timestamp: string;
  elapsed_time: number;
  timer_time: number;
  position_lat: number;
  position_long: number;
  distance: number;
  altitude: number;
  speed: number;
  temperature: number;
}

interface FileIdsItem {
  serial_number: number;
  time_created: string;
  product_name: string;
  manufacturer: string;
  product: number;
  number: number;
  type: string;
}

type ConvertedJSONFile = {
  records: RecordsItem[];
  details: {
    timestamp: string;
    start_time: string;
    total_elapsed_time: number;
    total_distance: number;
    total_moving_time: number;
    avg_speed: number;
    max_speed: number;
    total_ascent: number;
    total_descent: number;
    avg_altitude: number;
    max_altitude: number;
    min_altitude: number;
    avg_temperature: number;
    max_temperature: number;
  };
};

export type JSONFileWithId = ConvertedJSONFile & { _id: string };

export interface XossApi {
  selectFitFile: () => Promise<undefined | string>;
  convertFitToJson: (fitPath: string) => void;
  getWorkouts: (workoutId?: string) => Promise<string>;
  updateStore: (object: StoreSchema) => void;
  getWholeStore: () => Promise<StoreSchema>;
  setSelectedWorkout: (callback: (workoutId: string) => void) => void;
}

export interface StoreSchema {
  pathColor: string;
  pathWidth: number;
  isAntPathEnabled: boolean;
  isStartAndEndPointsEnabled: boolean;
  isDistanceSignsEnabled: boolean;
  distanceSignsVisibleZoomLevel: number;
}

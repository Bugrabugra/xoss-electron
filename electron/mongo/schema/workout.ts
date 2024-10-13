import { model, Schema } from "mongoose";
import { JSONFile } from "../../../index";

const recordDataSchema = new Schema({
  timestamp: String,
  position_lat: Number,
  position_long: Number,
  distance: Number,
  altitude: Number,
  speed: Number,
  temperature: Number
});

const workoutSchema = new Schema<JSONFile>({
  records: [recordDataSchema],
  details: {
    timestamp: String,
    start_time: String,
    total_elapsed_time: Number,
    total_distance: Number,
    total_moving_time: Number,
    enhanced_avg_speed: Number,
    enhanced_max_speed: Number,
    enhanced_avg_altitude: Number,
    enhanced_min_altitude: Number,
    enhanced_max_altitude: Number,
    avg_speed: Number,
    max_speed: Number,
    total_ascent: Number,
    total_descent: Number,
    num_laps: Number,
    avg_altitude: Number,
    max_altitude: Number,
    min_altitude: Number,
    avg_temperature: Number,
    max_temperature: Number
  }
});

const Workout = model<JSONFile>("Workout", workoutSchema);

export default Workout;

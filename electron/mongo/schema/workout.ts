import { model, Schema } from "mongoose";
import { ConvertedJSONFile } from "../../../index";

const recordDataSchema = new Schema({
  timestamp: String,
  elapsed_time: Number,
  timer_time: Number,
  position_lat: Number,
  position_long: Number,
  distance: Number,
  altitude: Number,
  speed: Number,
  temperature: Number
});

const workoutSchema = new Schema<ConvertedJSONFile>({
  records: [recordDataSchema],
  details: {
    timestamp: String,
    start_time: String,
    total_elapsed_time: Number,
    total_distance: Number,
    total_moving_time: Number,
    avg_speed: Number,
    max_speed: Number,
    total_ascent: Number,
    total_descent: Number,
    avg_altitude: Number,
    max_altitude: Number,
    min_altitude: Number,
    avg_temperature: Number,
    max_temperature: Number
  }
});

const Workout = model<ConvertedJSONFile>("Workout", workoutSchema);

export default Workout;

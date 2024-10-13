import fitDecoder from "fit-decoder";
import { readFile, writeFile } from "node:fs/promises";
import { JSONFile, WorkoutRecord } from "../../index";
import path from "node:path";
import mongoose from "mongoose";
import { exec } from "child_process";
import { Notification } from "electron";

const exportJsonIntoMongoDb = async (fileName: string) => {
  exec(
    `/opt/homebrew/bin/mongoimport --db bicycle-app --collection workouts --file /Users/bugraotken/Desktop/${fileName}.json`,
    (err) => {
      if (err) {
        new Notification({ title: "Error", body: err.message }).show();
      } else {
        new Notification({
          title: "Success",
          body: "fit file was imported successfully!"
        }).show();
      }
    }
  );
};

const saveJson = async (json: JSONFile, filePath: string) => {
  const fileName = path.parse(filePath).name;

  try {
    await writeFile(`/Users/bugraotken/Desktop/${fileName}.json`, JSON.stringify(json), {
      encoding: "utf8"
    });
    exportJsonIntoMongoDb(fileName);
  } catch (error) {
    new Notification({
      title: "Error",
      body: error
    }).show();
  }
};

export const fitToJsonConverter = async (filePath: string) => {
  const file = await readFile(filePath);
  const buffer = file.buffer;
  const jsonRaw = fitDecoder.fit2json(buffer);
  const json = fitDecoder.parseRecords(jsonRaw);

  const activity = json.records.find((record) => record.type === "session");
  const records = json.records.reduce((acc: WorkoutRecord[], record) => {
    if (record.type === "record") {
      acc.push({
        timestamp: record.data.timestamp,
        position_lat: record.data.position_lat,
        position_long: record.data.position_long,
        distance: record.data.distance,
        altitude: record.data.altitude,
        speed: record.data.speed,
        temperature: record.data.temperature
      });
    }

    return acc;
  }, []);

  const newJson = {
    records,
    details: {
      timestamp: activity.data.timestamp,
      start_time: activity.data.start_time,
      total_elapsed_time: activity.data.total_elapsed_time,
      total_distance: activity.data.total_distance,
      total_moving_time: activity.data.total_moving_time,
      enhanced_avg_speed: activity.data.enhanced_avg_speed,
      enhanced_max_speed: activity.data.enhanced_max_speed,
      enhanced_avg_altitude: activity.data.enhanced_avg_altitude,
      enhanced_min_altitude: activity.data.enhanced_min_altitude,
      enhanced_max_altitude: activity.data.enhanced_max_altitude,
      avg_speed: activity.data.avg_speed,
      max_speed: activity.data.max_speed,
      total_ascent: activity.data.total_ascent,
      total_descent: activity.data.total_descent,
      num_laps: activity.data.num_laps,
      avg_altitude: activity.data.avg_altitude,
      max_altitude: activity.data.max_altitude,
      min_altitude: activity.data.min_altitude,
      avg_temperature: activity.data.avg_temperature,
      max_temperature: activity.data.max_temperature
    }
  };

  await saveJson(newJson, filePath);
};

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/bicycle-app", {
      connectTimeoutMS: 2000
    });

    new Notification({
      title: "Success",
      body: "Connected to MongoDb"
    }).show();
  } catch (error) {
    exec(`brew services start mongodb-community@7.0`, async (err) => {
      if (err) {
        new Notification({
          title: "Error",
          body: "MongoDb service couldn't be started!"
        }).show();
      } else {
        new Notification({
          title: "Success",
          body: "MongoDb service started successfully!"
        }).show();

        await connectDb();
      }
    });
  }
};

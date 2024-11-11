import mongoose from "mongoose";
import { BrowserWindow, Notification } from "electron";
import FitParser from "fit-file-parser";
import { readFile, writeFile } from "node:fs/promises";
import { ConvertedJSONFile, FitJSONFile } from "../../index";
import path from "node:path";
import { exec } from "child_process";
import * as fs from "node:fs";
import * as process from "node:process";

const exportJsonIntoMongoDb = async (fileName: string) => {
  const file = `${fileName}.json`;

  exec(
    `/opt/homebrew/bin/mongoimport --db bicycle-app --collection workouts --file ${path.join("temp", file)}`,
    (err) => {
      if (err) {
        new Notification({ title: "Error", body: err.message }).show();
      } else {
        new Notification({
          title: "Success",
          body: "fit file was imported successfully!"
        }).show();

        fs.unlinkSync(path.join("temp", file));
        BrowserWindow.getAllWindows()[0].reload();
      }
    }
  );
};

const saveJson = async (json: ConvertedJSONFile, filePath: string) => {
  const fileName = path.parse(filePath).name;

  try {
    if (!fs.existsSync("temp")) {
      fs.mkdirSync("temp", { recursive: true });
    }

    await writeFile(path.join("temp", `${fileName}.json`), JSON.stringify(json), {
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

  if (file) {
    const buffer = file.buffer;

    // Create a FitParser instance (options argument is optional)
    const fitParser = new FitParser({
      force: true,
      speedUnit: "km/h",
      lengthUnit: "m",
      temperatureUnit: "celsius",
      pressureUnit: "bar",
      elapsedRecordField: true,
      mode: "both"
    });

    // Parse your file
    fitParser.parse(buffer, async (error, data: FitJSONFile) => {
      // Handle result of parse method
      if (error) {
        new Notification({
          title: "Error",
          body: error
        }).show();
      } else {
        const newJson = {
          records: data.records,
          details: {
            timestamp: data.sessions[0].timestamp,
            start_time: data.sessions[0].start_time,
            total_elapsed_time: data.sessions[0].total_elapsed_time,
            total_distance: data.sessions[0].total_distance,
            total_moving_time: data.sessions[0].total_moving_time,
            avg_speed: data.sessions[0].avg_speed,
            max_speed: data.sessions[0].max_speed,
            total_ascent: data.sessions[0].total_ascent,
            total_descent: data.sessions[0].total_descent,
            avg_altitude: data.sessions[0].avg_altitude,
            max_altitude: data.sessions[0].max_altitude,
            min_altitude: data.sessions[0].min_altitude,
            avg_temperature: data.sessions[0].avg_temperature,
            max_temperature: data.sessions[0].max_temperature
          }
        };

        await saveJson(newJson, filePath);
      }
    });
  }
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
        process.exit(1);
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

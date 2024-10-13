import Workout from "./schema/workout";
import { Notification } from "electron";

export const getWorkoutsHandler = async (id: string = null) => {
  try {
    const result = await (id ? Workout.findById(id) : Workout.find());

    return result;
  } catch (error) {
    new Notification({
      title: "Error",
      body: error
    }).show();
  }
};

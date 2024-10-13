import { useMemo } from "react";
import { Calendar, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { convertMeterToKm } from "@/utils";
import { useAppStore } from "@/store";

const WorkoutsCalendar = () => {
  const { workouts } = useAppStore();

  const workoutDatesWithTotalDistance = useMemo(() => {
    return workouts.map((workout) => {
      return {
        endDate: dayjs(workout.details.timestamp).utc().toDate(),
        totalDistance: workout.details.total_distance
      };
    });
  }, [workouts]);

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current) => {
    const matchedWorkout = workoutDatesWithTotalDistance.filter((workout) => {
      if (dayjs(current).startOf("day").toString() === dayjs(workout.endDate).startOf("day").toString()) {
        return workout;
      }
    });

    return matchedWorkout.length > 0 ? (
      <>
        <div>{`${matchedWorkout.length} ${matchedWorkout.length > 1 ? "rides" : "ride"}`}</div>

        <ul>
          {matchedWorkout.map((workout) => {
            return (
              <li key={`${workout.endDate.toString()}-${workout.totalDistance.toString()}`}>
                {convertMeterToKm(workout.totalDistance)}
              </li>
            );
          })}
        </ul>
      </>
    ) : null;
  };

  return <Calendar cellRender={cellRender} style={{ padding: 20 }} />;
};

export default WorkoutsCalendar;

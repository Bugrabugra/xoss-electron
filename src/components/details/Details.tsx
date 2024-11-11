import { Descriptions, DescriptionsProps } from "antd";
import useGetSelectedWorkout from "@/hooks/useGetSelectedWorkout";
import {
  convertElevationToMeters,
  convertMetersPerSecondToKmPerHour,
  convertMeterToKm,
  convertToTemperature
} from "@/utils";
import dayjs from "dayjs";

const Details = () => {
  const { workoutData } = useGetSelectedWorkout();

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Distance",
      children: workoutData ? convertMeterToKm(workoutData.details.total_distance) : "-"
    },
    {
      key: "2",
      label: "Moving time",
      children: workoutData ? dayjs.duration(workoutData.details.total_moving_time, "seconds").format("HH:mm:ss") : "-"
    },
    {
      key: "3",
      label: "Total time",
      children: workoutData ? dayjs.duration(workoutData.details.total_elapsed_time, "seconds").format("HH:mm:ss") : "-"
    },
    {
      key: "4",
      label: "Start time",
      children: workoutData ? dayjs(workoutData.details.start_time).format("DD-MM-YYYY HH:mm:ss") : "-"
    },
    {
      key: "5",
      label: "End time",
      children: workoutData
        ? dayjs(workoutData.details.start_time)
            .add(workoutData.details.total_elapsed_time, "seconds")
            .format("DD-MM-YYYY HH:mm:ss")
        : "-"
    },
    {
      key: "6",
      label: "Avg. moving speed",
      children: workoutData ? convertMetersPerSecondToKmPerHour(workoutData.details.avg_speed) : "-"
    },
    {
      key: "7",
      label: "Max. speed",
      children: workoutData ? convertMetersPerSecondToKmPerHour(workoutData.details.max_speed) : "-"
    },
    {
      key: "8",
      label: "Elevation gain",
      children: workoutData ? convertElevationToMeters(workoutData.details.total_ascent) : "-"
    },
    {
      key: "9",
      label: "Elevation loss",
      children: workoutData ? convertElevationToMeters(workoutData.details.total_descent) : "-"
    },
    {
      key: "10",
      label: "Min. elevation",
      children: workoutData ? convertElevationToMeters(workoutData.details.min_altitude) : "-"
    },
    {
      key: "11",
      label: "Max. elevation",
      children: workoutData ? convertElevationToMeters(workoutData.details.max_altitude) : "-"
    },
    {
      key: "12",
      label: "Avg. temperature",
      children: workoutData ? convertToTemperature(workoutData.details.avg_temperature) : "-"
    },
    {
      key: "13",
      label: "Max. temperature",
      children: workoutData ? convertToTemperature(workoutData.details.max_temperature) : "-"
    }
  ];

  return <Descriptions items={items} column={1} size="small" bordered />;
};

export default Details;

import { Divider, Radio, Select, Typography } from "antd";
import { useAppStore } from "@/store";
import { useMemo, useState } from "react";
import { convertMeterToKm } from "@/utils";
import dayjs from "dayjs";
import { ConvertedJSONFile } from "../../index";

const SORTERS = ["distance", "date", "duration"] as const;
type SorterValue = (typeof SORTERS)[number];

const SelectWorkout = () => {
  const workouts = useAppStore((state) => state.workouts);
  const setSelectedWorkout = useAppStore((state) => state.setSelectedWorkout);
  const [selectedSorter, setSelectedSorter] = useState<SorterValue>("date");

  const valuesCalculator = (item: ConvertedJSONFile["details"]) => {
    const distance = convertMeterToKm(item.total_distance);
    const date = dayjs(item.start_time).format("DD-MM-YYYY");
    const duration = dayjs.duration(item.total_moving_time, "seconds").format("HH:mm:ss");

    return { distance, date, duration };
  };

  const workoutOptions = useMemo(() => {
    return workouts
      .map((workout) => {
        const { distance, date, duration } = valuesCalculator(workout.details);

        return {
          value: workout._id,
          label: `${distance} - ${date} - ${duration}`,
          details: workout.details
        };
      })
      .sort((a, b) => {
        if (selectedSorter === "date") {
          return dayjs(b.details.start_time).unix() - dayjs(a.details.start_time).unix();
        } else if (selectedSorter === "duration") {
          return b.details.total_moving_time - a.details.total_moving_time;
        } else {
          return b.details.total_distance - a.details.total_distance;
        }
      });
  }, [workouts, selectedSorter]);

  return (
    <div className="select-workout">
      <Divider />
      <div className="sorter">
        <Typography>Sort workouts by</Typography>

        <Radio.Group defaultValue={selectedSorter} onChange={(e) => setSelectedSorter(e.target.value)}>
          {SORTERS.map((sorter) => {
            return (
              <Radio.Button key={sorter} value={sorter}>
                {sorter}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </div>

      <Select
        className="select-input"
        options={workoutOptions}
        onChange={(e) => {
          setSelectedWorkout(e);
        }}
        optionRender={(item) => {
          const { distance, date, duration } = valuesCalculator(item.data.details);

          return (
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Date:</span> {date}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Distance:</span> {distance}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "bold" }}>Duration:</span> {duration}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default SelectWorkout;

import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import useGetSelectedWorkout from "@/hooks/useGetSelectedWorkout";
import {
  convertElevationToMeters,
  convertMetersPerSecondToKmPerHour,
  convertMeterToKm,
  convertToTemperature
} from "@/utils";
import { AxisLabelsFormatterContextObject } from "highcharts";
import DarkUnica from "highcharts/themes/dark-unica";

DarkUnica(Highcharts);

const Charts = (props: HighchartsReact.Props) => {
  const { workoutData } = useGetSelectedWorkout();

  const baseOptions: Highcharts.Options = {
    legend: {
      enabled: false
    },
    chart: {
      style: {
        fontFamily: "Fira Sans"
      },
      zooming: {
        type: "x",
        resetButton: {
          theme: {
            style: { color: "white" }
          }
        }
      }
    },
    lang: { numericSymbols: undefined }
  };

  const optionsDistanceAltitude: Highcharts.Options = {
    ...baseOptions,
    title: {
      text: "Distance - Altitude Chart"
    },
    xAxis: {
      title: {
        text: "Distance"
      },
      breaks: [
        {
          from: 0
        }
      ],
      labels: {
        formatter() {
          return convertMeterToKm(+this.value, 0);
        }
      }
    },
    yAxis: {
      title: {
        text: "Altitude"
      },
      labels: {
        formatter(this: AxisLabelsFormatterContextObject) {
          return convertElevationToMeters(+this.value);
        }
      }
    },
    series: [
      {
        data: workoutData?.records.map((data) => {
          return [data.distance, data.altitude];
        }),
        type: "line",
        name: "Altitude",
        color: "#6262cf"
      }
    ],
    tooltip: {
      formatter() {
        return (
          "Altitude of <b style='color: coral'>" +
          convertMeterToKm(+this.x!) +
          "</b> is <b style='color:" +
          " lawngreen'> " +
          this.y +
          " m" +
          "</b>"
        );
      }
    }
  };

  const optionsDistanceSpeed: Highcharts.Options = {
    ...baseOptions,
    title: {
      text: "Distance - Speed Chart"
    },
    xAxis: {
      title: {
        text: "Distance"
      },
      breaks: [
        {
          from: 0
        }
      ],
      labels: {
        formatter() {
          return convertMeterToKm(+this.value, 0);
        }
      }
    },
    yAxis: {
      title: {
        text: "Speed"
      },
      labels: {
        formatter(this: AxisLabelsFormatterContextObject) {
          return convertMetersPerSecondToKmPerHour(+this.value, 0);
        }
      }
    },
    series: [
      {
        data: workoutData?.records.map((data) => {
          return [data.distance, data.speed];
        }),
        type: "line",
        name: "Speed",
        color: "#65810c"
      }
    ],
    tooltip: {
      formatter() {
        return "Speed is <b style='color:" + " lawngreen'> " + convertMetersPerSecondToKmPerHour(this.y!) + "</b>";
      }
    }
  };

  const optionsDistanceTemperature: Highcharts.Options = {
    ...baseOptions,
    title: {
      text: "Distance - Temperature Chart"
    },
    xAxis: {
      title: {
        text: "Distance"
      },
      breaks: [
        {
          from: 0
        }
      ],
      labels: {
        formatter() {
          return convertMeterToKm(+this.value, 0);
        }
      }
    },
    yAxis: {
      title: {
        text: "Temperature"
      },
      labels: {
        formatter(this: AxisLabelsFormatterContextObject) {
          return convertToTemperature(+this.value);
        }
      }
    },
    series: [
      {
        data: workoutData?.records.map((data) => {
          return [data.distance, data.temperature];
        }),
        type: "line",
        name: "Temperature",
        color: "#8e48b6"
      }
    ],
    tooltip: {
      formatter() {
        return "Temperature is <b style='color:" + " lawngreen'> " + convertToTemperature(this.y!) + "</b>";
      }
    }
  };

  return (
    <div className="charts">
      <HighchartsReact highcharts={Highcharts} options={optionsDistanceAltitude} {...props} />

      <HighchartsReact highcharts={Highcharts} options={optionsDistanceSpeed} {...props} />

      <HighchartsReact highcharts={Highcharts} options={optionsDistanceTemperature} {...props} />
    </div>
  );
};

export default Charts;

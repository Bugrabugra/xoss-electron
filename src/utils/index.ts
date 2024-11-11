export const convertMetersPerSecondToKmPerHour = (value: number, fractionDigits = 2) => {
  return `${value.toFixed(fractionDigits)} km/h`;
};

export const convertMeterToKm = (value: number, fractionDigits = 2) => {
  return `${(value / 1000).toFixed(fractionDigits)} km`;
};

export const convertElevationToMeters = (value: number) => {
  return `${value.toFixed()} m`;
};

export const convertToTemperature = (value: number) => {
  return `${value} °C`;
};

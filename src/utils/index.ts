export const convertMetersPerSecondToKmPerHour = (value: number) => {
  return `${value * 3.6} km/h`;
};

export const convertMeterToKm = (value: number) => {
  return `${(value / 1000).toFixed(2)} km`;
};

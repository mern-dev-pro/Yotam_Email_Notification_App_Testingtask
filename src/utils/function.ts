import { IDay } from "./type";

export const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const calculationDistanceWidthNextDate = (plannedDays: IDay[], currentPlannedDay: IDay) => {
  const mappedPlannedDays = plannedDays.map((day) => days.findIndex((item) => day === item)).sort();
  const currentPlannedDayIndex = mappedPlannedDays?.findIndex(
    (item) => item === days.findIndex((item) => item === currentPlannedDay),
  );

  if (currentPlannedDayIndex === -1) return;
  if (currentPlannedDayIndex === mappedPlannedDays.length - 1)
    return mappedPlannedDays[0] + 6 - mappedPlannedDays[currentPlannedDayIndex];
  return mappedPlannedDays[currentPlannedDayIndex + 1] - mappedPlannedDays[currentPlannedDayIndex];
};

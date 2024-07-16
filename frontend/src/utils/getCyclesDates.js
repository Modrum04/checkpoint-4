import { formatDate } from "./formatDate";

export const getCyclesDates = (data) => {
  const oldestDateCurrent = data.sort((a, b) => new Date(a.visitDate) - new Date(b.visitDate))[0]
    .visitDate;
  const newestDateCurrent = data.sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate))[0]
    .visitDate;
  const oldestNextDate = data.sort(
    (a, b) => new Date(a.nextVisit.expectedDate) - new Date(b.nextVisit.expectedDate),
  )[0].nextVisit.expectedDate;
  const newestNextDate = data.sort(
    (a, b) => new Date(b.nextVisit.expectedDate) - new Date(a.nextVisit.expectedDate),
  )[0].nextVisit.expectedDate;
  return {
    firstCurrentCycleDate: formatDate(oldestDateCurrent),
    lastCurrentCycleDate: formatDate(newestDateCurrent),
    firstNextCycleDate: formatDate(oldestNextDate),
    lastNextCycleDate: formatDate(newestNextDate),
  };
};

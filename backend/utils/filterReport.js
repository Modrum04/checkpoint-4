const filterReport = (filterBy, filterValue, reports) => {
  return (
    filterValue &&
    reports.filter((report) => {
      let selectedField = "";
      if (filterBy.includes(".")) {
        const [parent, child] = filterBy.split(".");
        selectedField = report[parent][child];
      } else {
        selectedField = report[filterBy];
      }
      if (filterBy === "visitDate" || filterBy === "nextVisit.expectedDate") {
        const filterDate = new Date(filterValue);
        const reportDate = new Date(selectedField);
        return reportDate.getTime() === filterDate.getTime();
      }

      return selectedField.toLowerCase().includes(filterValue.toLowerCase());
    })
  );
};
module.exports = filterReport;

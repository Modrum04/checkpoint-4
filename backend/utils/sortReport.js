const sortReport = (reports, sortBy, order) => {
  let fieldA = "";
  let fieldB = "";
  return reports.sort((a, b) => {
    if (sortBy.includes(".")) {
      const [parent, child] = sortBy.split(".");
      fieldA = a[parent][child];
      fieldB = b[parent][child];
    } else {
      fieldA = a[sortBy];
      fieldB = b[sortBy];
    }
    if (fieldA instanceof Date && fieldB instanceof Date) {
      return order === "dsc" ? fieldB - fieldA : fieldA - fieldB;
    }
    return order === "dsc" ? fieldB.localeCompare(fieldA) : fieldA.localeCompare(fieldB);
  });
};

module.exports = sortReport;

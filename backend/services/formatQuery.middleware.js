const formatQuery = (req, res, next) => {
  const { sortBy, order, filterBy, filterValue } = req.query;
  req.sort =
    sortBy && order ? { sortBy: sortBy, order: order } : { sortBy: "client.name", order: "asc" };
  req.filter = filterBy && filterValue ? { filterBy: filterBy, filterValue: filterValue } : "";

  next();
};

module.exports = formatQuery;

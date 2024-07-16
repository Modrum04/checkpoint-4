const Report = require("../models/Report");
const filterReport = require("../utils/filterReport");
const sortReport = require("../utils/sortReport");

getOneReport = (req, res, next) => {
  Report.findOne({ _id: req.params.id })
    .populate("seller", "name")
    .populate("client", "name")
    .then((report) => res.status(200).json(report))
    .catch((e) => res.status(400).json({ e }));
};

getAllReports = (req, res, next) => {
  const { sortBy, order } = req.sort;
  const { filterBy, filterValue } = req.filter;
  Report.find()
    .populate("seller", "name")
    .populate("client", "name")
    .then((reports) => {
      const filteredReports =
        filterBy && filterValue ? filterReport(filterBy, filterValue, reports) : reports;
      const sortedReport = sortReport(filteredReports, sortBy, order);
      return res.status(200).json(sortedReport);
    })
    .catch((error) => res.status(400).json({ error }));
};

deleteOneReport = (req, res, next) => {
  Report.findOne({ _id: req.params.id })
    .then((report) =>
      Report.deleteOne({ _id: req.params.id })
        .then(() => {
          res
            .status(200)
            .json({ message: "Rapport supprimé", identifiant_rapport_supprime: report });
        })
        .catch((error) => res.status(401).json({ error })),
    )
    .catch((error) => {
      res.status(500).json({ error });
    });
};

createReport = (req, res, next) => {
  const report = new Report({
    ...req.body,
  });
  report
    .save()
    .then(() => {
      res.status(201).json({ message: "rapport enregistré" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

modifyOneReport = (req, res, next) => {
  Report.findOne({ _id: req.params.id })
    .then(() => {
      Report.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "rapport modifié" }))
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

module.exports = { getOneReport, getAllReports, deleteOneReport, createReport, modifyOneReport };

const express = require("express");

const router = express.Router();

const reportsRouter = require("./reports/reportsRouter");
const clientsRouter = require("./clients/clientsRouter");
const sellersRouter = require("./sellers/sellersRouter");

router.use("/reports", reportsRouter);
router.use("/sellers", sellersRouter);
router.use("/clients", clientsRouter);

module.exports = router;

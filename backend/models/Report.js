const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReportSchema = new mongoose.Schema({
  seller: { type: Schema.Types.ObjectId, ref: "Seller", required: true },
  client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
  visitDate: { type: Date, required: true },
  reportText: { type: String, required: true },
  orderDetails: {
    articlesOrdered: { type: Number, required: true },
    revenueGenerated: { type: Number, required: true },
  },
  nextVisit: {
    expectedDate: { type: Date, required: true },
    expectedArticles: { type: Number, required: true },
    expectedRevenue: { type: Number, required: true },
  },
});

module.exports = mongoose.model("Report", ReportSchema);

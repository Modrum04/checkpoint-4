const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const SellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

SellerSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Seller", SellerSchema);

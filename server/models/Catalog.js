const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CatalogSchema = new Schema(
  {
    name: { type: String, validate: nameValidator, required: true },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

function nameValidator(val) {
  return val.length < "255";
}

const Catalog = mongoose.model("Catalog", CatalogSchema);
module.exports = Catalog;

import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;
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

const Catalog = model("Catalog", CatalogSchema);
export default Catalog;

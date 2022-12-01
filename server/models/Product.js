const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ProductSchema = new Schema(
  {
    name: { type: String, validate: nameAndPriceValidator, required: true },
    price: { type: String, validate: nameAndPriceValidator, required: true },
    catalogId: { type: Schema.Types.ObjectId, ref: "Catalog" },
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
  }
);

function nameAndPriceValidator(val) {
  return val.length < "255";
}

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;

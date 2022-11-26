import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;
const ProductSchema = new Schema(
  {
    name: { type: String, validate: nameAndPriceValidator, required: true },
    price: { type: String, validate: nameAndPriceValidator, required: true },
    catalogId: [{ type: Schema.Types.ObjectId, ref: "Catalog" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
  }
);

function nameAndPriceValidator(val) {
  return val <= "255";
}

const Product = model("Product", ProductSchema);
export default Product;

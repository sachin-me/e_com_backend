import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;
const OrderSchema = new Schema(
  {
    count: { type: Number, default: 0 },
    userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
    catalogId: [{ type: Schema.Types.ObjectId, ref: "Catalog" }],
    productId: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
  }
);

const Order = model("Order", OrderSchema);
export default Order;

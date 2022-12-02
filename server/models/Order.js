const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const OrderSchema = new Schema(
  {
    count: { type: Number, default: 0 },
    buyerId: { type: Schema.Types.ObjectId, ref: "User" },
    sellerId: { type: Schema.Types.ObjectId, ref: "User" },
    catalog: { type: Schema.Types.ObjectId, ref: "Catalog" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
  }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;

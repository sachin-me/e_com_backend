const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const OrderSchema = new Schema(
  {
    count: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    catalogId: [{ type: Schema.Types.ObjectId, ref: "Catalog" }],
    productId: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
  }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;

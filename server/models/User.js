import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;
const UserSchema = new Schema(
  {
    name: { type: String, validate: nameAndEmailValidator, required: true },
    email: {
      type: String,
      validate: nameAndEmailValidator,
      index: true,
      unique: true,
      required: true,
    },
    password: { type: String, required: true },
    state: { type: String },
    city: { type: String },
    address: { type: String },
    role: {
      type: String,
      enum: {
        values: ["buyer", "seller"],
      },
      default: "buyer",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

function nameAndEmailValidator(val) {
  return val <= "255";
}

const User = model("User", UserSchema);
export default User;

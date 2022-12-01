const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: { type: String, validate: nameAndEmailValidator, required: true },
    email: {
      type: String,
      validate: nameAndEmailValidator,
      index: true,
      unique: true,
      required: true,
      lowercase: true,
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
  return val.length < "255";
}

UserSchema.pre("save", function (next) {
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, SALT_ROUNDS);
    next();
  } else {
    next();
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT;

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, connection) {
    if (err) throw err;
    else console.log("connected to mongodb");
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/api", require("./server/routes/api"));

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

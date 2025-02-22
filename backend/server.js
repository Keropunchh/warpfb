require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes"); // ใช้ index.js

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes); // ตั้ง prefix ให้ API

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

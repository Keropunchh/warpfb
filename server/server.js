require("dotenv").config();
const express = require("express");
const cors = require("cors");
const next = require("next");
const bodyParser = require("body-parser");
const routes = require("./routes/allRoutes"); // ใช้ index.js

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

const server = express();
server.use(cors());
server.use(bodyParser.json());

app.prepare().then(() => {
  // ตัวอย่าง API Route
  server.use("/api", routes); // ตั้ง prefix ให้ API

  // จัดการทุกหน้าโดยใช้ Next.js
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

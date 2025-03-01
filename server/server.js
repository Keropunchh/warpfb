require("dotenv").config();
const express = require("express");
const cors = require("cors");
const next = require("next");

const routes = require("./routes/allRoutes");
const leagueRoutes = require("./routes/leagueRoutes");
const liveStreamRoutes = require("./routes/liveStreamRoutes");
const livescoreRoutes = require("./routes/livescoreRoutes");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  server.use(cors());
  server.use(express.json()); // ✅ ใช้ express.json() แทน body-parser

  // API Routes
  server.use("/api", routes);

  // Next.js Page Routes
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
});

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import userRouter from "./server/routers/user-router.js";
import activityRouter from "./server/routers/activity-router.js";
import slotRouter from "./server/routers/slotlog-router.js";
import subscriptionRouter from "./server/routers/subscription-router.js";
import swaggerUi from "swagger-ui-express";
import { connectDatabase } from "./server/config/database.js";
import { specs } from "./server/config/swagger.js";

const { PORT = 5000 } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//Databse
connectDatabase();

// middleware
app.use(express.json());
app.use(express.urlencoded());

//Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//Routes
app.use("/user", userRouter);
app.use("/activities", activityRouter);
app.use("/slot", slotRouter);
app.use("/subscription", subscriptionRouter);
app.use(express.static("./server/assets"));

app.get("/api/v1", (req, res) => {
  res.json({
    project: "Fitzo",
    from: "Vanaldito",
  });
});

//Serving Static files
app.get("/assets/*", (_req, res) => {
  console.log(_req.url);
  res.sendFile(path.join(__dirname, "public", _req.url));
});

app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});

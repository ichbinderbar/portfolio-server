import express from "express";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";
import videoRoutes from "./routes/videoRoutes.js";
// import { writeToFile } from "./utils/helpers.js";

dotenv.config();
const app = express();
const { PORT, API_KEY, ORIGIN } = process.env;

const pathToLogsData = "./logs/logs.json";

// let logsData = JSON.parse(fs.readFileSync(pathToLogsData));

// this is to serve static images from public
app.use(express.static("public"));

// this is necessary to use body when parcing json
app.use(express.json());

// restrict traffic from only this domain
app.use(cors({ origin: ORIGIN }));

// // middleware function to log requests
// app.use((req, res, next) => {
//   const logEntry = `Incoming request: ${new Date().toISOString()} ${
//     req.path
//   }, Host: ${req.hostname} / IP: ${req.ip}\n`;
//   console.log(logEntry);
//   writeToFile(logEntry, logsData, pathToLogsData);
//   next();
// });

// middleware function to validate API key
const apiKeyValidation = (req, res, next) => {
  const apiKey = req.query.apiKey;
  if (!apiKey || apiKey !== API_KEY) {
    res.status(401).send("Unauthorized: API key is invalid or missing");
    return;
  }
  next();
};

app.use(apiKeyValidation);

app.use("/videos", videoRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

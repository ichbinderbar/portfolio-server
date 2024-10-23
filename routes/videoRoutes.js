import express from "express";
import {
  getAllVideos,
  getSingleVideo,
  addVideo,
} from "../controllers/videoControllers.js";

const router = express.Router();

router.get("/", getAllVideos);

router.get("/:id", getSingleVideo);

router.post("/", addVideo);

export default router;

import crypto from "crypto";
import { writeToFile, videosData, pathToVideosData } from "../utils/helpers.js";

const getAllVideos = (req, res) => {
  res.status(200).json(videosData);
};

const getSingleVideo = (req, res) => {
  if (videosData) {
    const selectedVideo = videosData.find(
      (video) => video.id === req.params.id
    );
    res.status(200).json(selectedVideo);
  }
};

const addVideo = async (req, res) => {
  console.log(req.body);

  const { title, description, image, channel } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Please include both a title and a description" });
  }

  const newVideo = {
    id: crypto.randomUUID(),
    title: title,
    description: description,
    channel: channel,
    image: image,
    views: 0,
    likes: 0,
    duration: 0,
    video: "",
    timestamp: Date.now(),
    comments: [],
  };

  await writeToFile(newVideo, videosData, pathToVideosData);

  res.status(201).json(newVideo);
};

export { getAllVideos, getSingleVideo, addVideo };

import fs from "fs";

const pathToVideosData = "./data/video-details.json";

let videosData = JSON.parse(fs.readFileSync(pathToVideosData));

// function to write data to a file
const writeToFile = (newData, data, pathToFile) => {
  if (data) {
    data.push(newData);
    try {
      fs.writeFileSync(pathToFile, JSON.stringify(data));
    } catch (error) {
      console.log("Error writting to file:", error);
    }
  }
};

export { writeToFile, videosData, pathToVideosData };

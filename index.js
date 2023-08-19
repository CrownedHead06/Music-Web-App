import express from "express";
import axios from "axios";
import { exec } from "child_process";
import bodyParser from "body-parser";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { exit } from "process";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const ip = "192.168.1.6";
const port = 3000;

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        reject(error);
      }
      resolve(stdout.trim());
      console.log(stdout);
    });
  });
}

async function downloadSongAndThumbnail(songName) {
  return await executeCommand(
    `./public/scripts/download_song+thumbnail.sh "${songName}"`,
  );
}

async function getSongFileName(songName) {
  return await executeCommand(
    `./public/scripts/song_filename.sh "${songName}"`,
  );
}

async function getSongThumbnailFileName(songName) {
  return await executeCommand(
    `./public/scripts/song_thumbnail_filename.sh "${songName}"`,
  );
}

async function getSongTitle(songName) {
  return await executeCommand(`./public/scripts/song_title.sh "${songName}"`);
}

app.use((req, res, next) => {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", "0");
  next();
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/play", async (req, res) => {
  try {
    let songName = req.body.songName;
    songName += "song";

    const songFileName = await getSongFileName(songName);
    const songThumbnailFileName = await getSongThumbnailFileName(songName);
    const songTitle = await getSongTitle(songName);

    const filePath = `${__dirname}/public/songs/${songFileName}`;

    let fileExist = false;

    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
      console.log("File Already Exist!");
      fileExist = true;
    } catch (error) {
      console.log("File Doesn't Exist!");
    }

    if (!fileExist) {
      await downloadSongAndThumbnail(songName);
    }

    res.status(200).render("index.ejs", {
      songFileName,
      songThumbnailFileName,
      songTitle,
    });

    console.log(songFileName, songThumbnailFileName, songTitle);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, ip, () => {
  console.log(`Server is listening on port ${port}`);
});

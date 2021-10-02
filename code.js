const express = require("express");
const ytdl = require("ytdl-core");
const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/videoInfo", async function(req, res) {
  const videoURL = req.query.videoURL;
  const info = await ytdl.getInfo(videoURL);
  res.status(200).json(info);
});

app.get("/download", function(req, res) {
  const videoURL = req.query.videoURL;
  const videoId = req.query.videoId;
  const itag = req.query.itag;
  res.header("Content-Disposition", `attachment; \ filename=${videoId}.mp4`);
  ytdl(videoURL, {
    filter: format => format.itag ==itag
  }).pipe(res);
});

app.listen(5000);
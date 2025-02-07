const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to fetch video details
app.get("/video-info", async (req, res) => {
  try {
    const videoUrl = req.query.url;
    console.log(videoUrl);
    if (!ytdl.validateURL(videoUrl)) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    const info = await ytdl.getInfo(videoUrl);
    console.log("INFO:", info);
    const formats = info.formats.map((format) => ({
      qualityLabel: format.qualityLabel,
      quality: format.quality,
      type: format.mimeType,
      url: format.url,
    }));

    res.json({
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails.pop().url,
      duration: info.videoDetails.lengthSeconds,
      formats,
      info, 
    });
  } catch (error) {
    console.error("Error fetching video info:", error);
    res.status(500).json({ error: "Failed to fetch video details" });
  }
});

// Route to handle downloading a selected format
app.get("/download", async (req, res) => {
  try {
    console.log("body", req.body, req.params, req);
    const { url, quality, type } = req.query;

    if (!type) {
      return res.status(400).json({ error: "Invalid format selection" });
    }

    res.header("Content-Disposition", `attachment; filename="snapfetch.mp4"`);

    ytdl(url, { format: "mp4", quality: "highest" }).pipe(res);
  } catch (error) {
    console.error("Error downloading video:", error);
    res.status(500).json({ error: "Failed to process download" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

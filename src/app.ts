import bodyParser from "body-parser";
import express from "express";
import logger from "morgan";
import { ReducedShow, Show } from "./types";

// Create Express app
const app = express();

// Initialize middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("combined"));

// Helper function to filter the payload
const filterPayload = (body: { payload: Show[] }) => {
  // Extract the payload
  const payload = body.payload;

  // Filter the shows with DRM true and at least 1 episode
  const filteredPayload = payload.filter((show) => {
    return show.drm === true && show.episodeCount > 0;
  });

  const reducedPayload: ReducedShow[] = [];
  filteredPayload.forEach((show) => {
    reducedPayload.push({
      image: show["image"]["showImage"],
      slug: show["slug"],
      title: show["title"],
    });
  });

  return reducedPayload;
};

app.post("/", (req, res) => {
  try {
    const result = req.body;
    res.status(200).json({ response: filterPayload(result) });
  } catch {
    res
      .status(400)
      .json({ error: "Could not decode request: JSON parsing failed" });
  }
});

export default app;

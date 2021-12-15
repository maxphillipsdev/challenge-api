import express, { json, NextFunction, Request, Response } from "express";
import logger from "morgan";
import { IResponseShow, IRequestShow } from "./types";

// Create Express app
const app = express();

// Initialize middleware
app.use(logger("combined"));
app.use(json());

// Catch malformed json
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res
      .status(400)
      .send({ error: "Could not decode request: JSON parsing failed" });
  } else {
    next();
  }
});

// Helper function to filter the payload
const filterPayload = (body: { payload: IRequestShow[] }) => {
  // Extract the payload
  const payload = body.payload;

  // Filter the shows with DRM true and at least 1 episode
  const filteredPayload = payload.filter((show) => {
    return show.drm === true && show.episodeCount > 0;
  });

  // Create the reduced array of shows
  const result: IResponseShow[] = [];
  filteredPayload.forEach((show) => {
    result.push({
      image: show["image"]["showImage"],
      slug: show["slug"],
      title: show["title"],
    });
  });

  return result;
};

app.post("/", (req: Request, res: Response) => {
  // Try to filter the JSON
  try {
    const body = req.body;
    res.status(200).json({ response: filterPayload(body) });
    // Catch any errors
  } catch {
    res
      .status(400)
      .json({ error: "Could not decode request: JSON parsing failed" });
  }
});

export default app;

import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(404).send({
    error: "This route does not exist.",
  });
});

export default app;

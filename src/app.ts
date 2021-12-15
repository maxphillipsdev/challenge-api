import bodyParser from "body-parser";
import express from "express";
import logger from "morgan";

// Create Express app
const app = express();

// Initialize middleware
app.use(bodyParser.json());
app.use(logger("combined"));

// Helper functions

// app.get("/", (req, res) => {
//   res.status(404).send({
//     error: "This route does not exist.",
//   });
// });

export default app;

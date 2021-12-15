import app from "./app";

// Listen on PORT or 8000
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

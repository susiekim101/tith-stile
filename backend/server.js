import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import textRoutes from "./routes/textGeneration.js";
// import imageRoutes from "./routes/imageGeneration.js";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// app.use("/api", textRoutes);
// app.use("/api", imageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
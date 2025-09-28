import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import resultsRouter from "./routes/resultsGeneration.js";
import ttsRouter from "./routes/tts.js";

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/api', resultsRouter);
app.use('/api', ttsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
import { GoogleGenAI, Modality } from "@google/genai";
import path from "path";
import process from "process";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

console.log("API Key:", process.env.API_KEY);

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
export default genAI;

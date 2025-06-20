/*import express from "express";
import genAI from "../gemini.js";

const router = express.Router();

router.post("/generate-text", async (req, res) => {
  const { prompt } = req.body;
  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result.candidates[0].content.parts[0].text;
    res.status(200).json({ text: text });
  } catch (error) {
    console.error("Text generation failed:", error.message);
    res.status(500).json({ error: "Text generation failedho" });
  }
});

export default router;
*/
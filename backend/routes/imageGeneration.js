/*import express from "express";
import genAI from "../gemini.js";
import { Modality } from "@google/genai";

const router = express.Router();

router.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    const parts = result?.candidates?.[0]?.content?.parts || [];
    // Look specifically for the part with image data
    const imagePart = parts.find((part) => part.inlineData);

    if (!imagePart) {
      console.log(
        "No image returned. Full response:",
        JSON.stringify(result, null, 2)
      );
      return res
        .status(500)
        .json({ error: "Image generation failed. No image returned." });
    }

    const imageData = imagePart.inlineData.data;
    const mimeType = imagePart.inlineData.mimeType;
    const imageSrc = `data:${mimeType};base64,${imageData}`;

    return res.status(200).json({ imageSrc });
  } catch (error) {
    console.error("Image generation failed:", error.message);
    res.status(500).json({ error: "Image generation failed" });
  }
});

export default router;

// <img src={`data:image/png;base64,${base64}`} />
*/
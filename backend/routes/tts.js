import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const client = new TextToSpeechClient();
const ttsRouter = express.Router();
console.log("GOOGLE_APPLICATION_CREDENTIALS:", process.env.GOOGLE_APPLICATION_CREDENTIALS);

ttsRouter.post('/tts', async(req, res) => {
    console.log("/api/tts endpoint hit");
    try {
        const text = req.body.text;
        if(!text) {
            return res.status(400).json({error: "Text to parse missing from request body"});
        }
        const request = {
            input: {text: text},
            voice: {
                languageCode: 'en-US', 
                name: "en-US-Chirp3-HD-Gacrux"
            },
            audioConfig: {audioEncoding: 'MP3'},
        };

        const [response] = await client.synthesizeSpeech(request);
        const audioContent = response.audioContent.toString("base64");
        res.json({ audioContent });
    } catch (error) {
        console.error("Error in calling TTS: ", error);
        return res.status(500).json({error: "Failed to call TTS"});
    }
});

export default ttsRouter;
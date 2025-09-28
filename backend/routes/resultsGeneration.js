import genAI from "../gemini.js";
import express from "express";
import fs from "fs";

const resultsRouter = express.Router();
const model = genAI.getGenerativeModel({model: "gemini-2.5-flash-lite"});
const scents = JSON.parse(fs.readFileSync(new URL("../scripts/scents.json", import.meta.url)));

resultsRouter.post('/generate-results', async(req, res) => {
    try {
        const userResults = req.body.userResults;
        console.log("User Results: ", userResults);
        if(!userResults) {
            return res.status(400).json({error: "Assessment results missing from request body"});
        }
        
        const prompt = `
            You are a trauma-informed interior design consultant. Your clients come from diverse backgrounds including but not limited to sexual assault, natural disasters, trauma with water, and more. Analyze the clients personal assessment results that include their preferences and triggers.

            ** Scent Bank: **
            ${JSON.stringify(scents, null, 2)}

            ** Client Assessment Results: **
            ${JSON.stringify(userResults, null, 2)}

            ** Instructions **
            Based on the client's results and the scent bank, select three scents and return ONLY a JSON file.
            
            The JSON object must have two properties:
            1.  "scents": An array of strings. Each string must be a URL for the suggested scent's image retrieved from the scent bank.
            2.  "scent_reasoning": A single string containing a 2-3 sentence explanation of why you chose those specific scents for the client. The tone of the reasoning should be in the second person, as if you are speaking directly to the client.

            Return ONLY text that resembles the JSON object and nothing else.
            DO NOT add any code blocks, explanations, or text. DO NOT use triple backticks.
            Only respond with the raw JSON object, like:
            {
                "scent_images": [...],
                "scent_reasoning": "..."
            }`
/*   */
/*             [
                { "scent": "Lavender", "reasoning": "...", "image": "..." },
                ...
            ]
                */
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();
            console.log("Gemini raw output: \n", text);

            try {
                const suggestions = JSON.parse(text);
                res.json(suggestions);
            } catch (error) {
                console.log("Failed to parse Gemini output: ", text);
                res.status(500).json({ error: "Failed to process AI response." });
            }

    } catch(error) {
        console.error("Error calling Gemini API: ", error);
        res.status(500).json({error: "Failed to get suggestions."});
    }
});

export default resultsRouter;

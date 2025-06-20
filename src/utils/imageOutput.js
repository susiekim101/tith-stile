const imageOutput = async (prompt) => {
  const res = await fetch("http://localhost:3001/api/generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Image generation failed: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  return data.imageSrc; // assuming the API returns imageUrl or similar
};

export default imageOutput;

/*
const TextSummary = async (quizResult) => {
  const prompt = `You are an interior design specialist focused on creating trauma-informed spaces. A client has completed a personal assessment describing their preferences, sensory triggers, and lifestyle needs. The assessment is provided below in JSON format.

Please:
1. Analyze the client’s preferences and needs.
2. Identify design elements that support comfort, safety, and emotional well-being.
3. Provide a friendly, empathetic, and insightful summary of recommended interior design strategies tailored to the client.

Here is the client’s assessment:
${JSON.stringify(quizResult, null, 2)}
`;

  const res = await fetch("http://localhost:5000/api/generate-text", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Text generation failed: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  return data.text;
};

export default TextSummary;

/*
import generateImage from "../components/ImageGeneration";
import TextSummary from "./TextSummary";

async function getQuizOutput(quizResponse) {
  const textSummary = await TextSummary(quizResponse);

  const prompt1 = `You are an interior design specialist focused on creating trauma-informed spaces. A client has completed a personal assessment describing their preferences, sensory triggers, and lifestyle needs. The assessment is provided below in JSON format.
Please generate an image for the interior design of the house with the client's preferred themed, colors, and mood.
Here is the client’s assessment:
${JSON.stringify(quizResponse, null, 2)}`;

  const prompt2 = `You are an interior design specialist focused on creating trauma-informed spaces. A client has completed a personal assessment describing their preferences, sensory triggers, and lifestyle needs. The assessment is provided below in JSON format.
Please generate an image simple color palette with 5 color themes that the client prefers.
Here is the client’s assessment:
${JSON.stringify(quizResponse, null, 2)}`;

  const prompt3 = `You are an interior design specialist focused on creating trauma-informed spaces. A client has completed a personal assessment describing their preferences, sensory triggers, and lifestyle needs. The assessment is provided below in JSON format.
Please generate an image of furniture with the client's suitable texture, style, and patterns
Here is the client’s assessment:
${JSON.stringify(quizResponse, null, 2)}`;

  const [interiorDesignRecs, colorPaletteRecs, furnitureDesignRecs] =
    await Promise.all([
      generateImage(prompt1),
      generateImage(prompt2),
      generateImage(prompt3),
    ]);

  return {
    textSummary,
    images: [interiorDesignRecs, colorPaletteRecs, furnitureDesignRecs],
  };
}

export default getQuizOutput;
*/

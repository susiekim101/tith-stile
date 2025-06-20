import imageOutput from "./imageOutput.js";
import textOutput from "./textOutput.js";

async function getQuizOutput(quizResult) {
  const descriptionSummary = await textOutput(quizResult);

  const prompts = [
    `You are an interior design specialist focused on creating trauma-informed spaces. A client has completed a personal assessment describing their preferences, sensory triggers, and lifestyle needs. The assessment is provided below in JSON format.
Please generate an image for the interior design of the house with the client's preferred theme, colors, and mood.
Here is the client’s assessment:
${JSON.stringify(quizResult, null, 2)}`,

    `You are an interior design specialist focused on creating trauma-informed spaces. A client has completed a personal assessment describing their preferences, sensory triggers, and lifestyle needs. The assessment is provided below in JSON format.
Generate a vertical color palette image with exactly 5 horizontal color swatches, arranged from top to bottom.
Each swatch is a solid block of color with no text or patterns.
The background should be fully covered by the swatches with no gaps.

Here is the client’s assessment:
${JSON.stringify(quizResult, null, 2)}`,

    `You are an interior design specialist focused on creating trauma-informed spaces. A client has completed a personal assessment describing their preferences, sensory triggers, and lifestyle needs. The assessment is provided below in JSON format.
Please generate an image of furniture with the client's suitable texture, style, and patterns.
Here is the client’s assessment:
${JSON.stringify(quizResult, null, 2)}`,
  ];

  /* hit quota */
  const images = await Promise.all(prompts.map(imageOutput));

  return {
    descriptionSummary,
    images,
  };
}

export default getQuizOutput;

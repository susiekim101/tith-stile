const textOutput = async (quizResult) => {
  const prompt = `You are an interior design expert specializing in trauma-informed, personalized spaces. A client has just completed a quiz describing their sensory triggers, color preferences, and lifestyle needs.

Based on their answers, please provide a structured JSON response in the following format:

{
  "titleParagraph": "[1–2 short sentences that introduce the client’s design style and what kind of space they would like. Keep it personal and easy to relate to.]",
  "descriptionSummary": "[ 3–5 simple sentences that explain the client’s design likes, things they need for comfort, and the main ideas behind their style. Use clear and everyday language.]",
  "imageCaptions": {
    "interiorDesign": "[ 1 sentence about the interior design image, focusing on how the room looks and feels in an easy way.]",
    "colorPalette": "[ 1 sentence about the colors used, explaining how they make the space feel calm, cozy, or whatever fits the client.]",
    "furnitureDesign": "[ 1 sentence about the furniture, describing its style and texture simply.]"
  },
  "toInclude": [
    "[List 3–5 clear and simple things to add to the space, like types of lighting or materials.]"
  ],
  "toAvoid": [
    "[List 3–5 clear and simple things to avoid, like bright lights or clutter.]"
  ]
}




Here is the client’s assessment in JSON format:
${JSON.stringify(quizResult, null, 2)}
`;

  const res = await fetch("http://localhost:3001/api/generate-text", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const data = await res.json();
  console.log(data.text);

  return data.text;
};

export default textOutput;

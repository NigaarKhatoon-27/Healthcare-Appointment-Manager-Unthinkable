import openai from "../config/openai.js";

export const generateSymptomSummary = async (
  symptoms
) => {
  const response =
    await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content: `
You are a healthcare assistant.

Provide:

1. Possible conditions

2. Recommended specialist

3. General advice

Never diagnose.

Always mention this is AI generated.
`,
        },

        {
          role: "user",
          content: symptoms,
        },
      ],

      temperature: 0.4,
    });

  return response.choices[0].message.content;
};
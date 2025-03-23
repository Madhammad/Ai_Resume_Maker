
import { GoogleGenerativeAI } from "@google/generative-ai";
import  dotenv  from 'dotenv';



export const AiConfig = async (prompt) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,

        // "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
        // "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.

        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-r1-zero:free",
        "messages": [
          {
            "role": "user", "content": prompt
          }
        ],
        "top_p": 1,
        "temperature": 0.85,
        "repetition_penalty": 1
      })
    });

    const data = await response.json();

    console.log("response generate", data.choices[0].message.content);

    return data.choices[0].message.content.trim();

  } catch (error) {
    throw new Error('AI generation failed: ' + error.message);
  }
};

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "learnlm-1.5-pro-experimental",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

 export  const sumaryfn= async  (prompt) => {
  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  // console.log(result.response.text());

  return result.response.text()
}




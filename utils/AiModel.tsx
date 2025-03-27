import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
<<<<<<< HEAD
 
  
=======

>>>>>>> b6ae3b25a2ecd93755132d75be2b62f201b9797d
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY is not defined");
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });

  

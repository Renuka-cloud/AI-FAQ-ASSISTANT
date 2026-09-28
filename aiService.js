const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateAnswerFromAI = async (question) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a concise, professional answer for the following customer FAQ question: ${question}`,
    });
    return response.text;
  } catch (error) {
    throw new Error('AI Generation failed: ' + error.message);
  }
};

const generateFAQFromAI = async (topic) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a detailed FAQ pair (Question, Answer, and Category) for the topic: "${topic}". Response format must be JSON with keys "question", "answer", and "category".`,
    });

    let text = response.text.trim();
    if (text.startsWith('```json')) {
      text = text.replace(/^```json/, '').replace(/```$/, '').trim();
    }
    
    return JSON.parse(text);
  } catch (error) {
    return {
      question: `What is ${topic}?`,
      answer: `This is an auto-generated placeholder answer for ${topic}.`,
      category: 'General',
    };
  }
};

module.exports = {
  generateAnswerFromAI,
  generateFAQFromAI,
};
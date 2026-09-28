// geminiService-kku badhula aiService import பண்றோம்
const { generateAnswerFromAI, generateFAQFromAI } = require('../services/aiService');

const generateAIAnswer = async (req, res, next) => {
  try {
    const { question } = req.body;
    const answer = await generateAnswerFromAI(question);

    res.status(200).json({
      success: true,
      data: {
        question,
        answer,
      },
    });
  } catch (error) {
    next(error);
  }
};

const generateAIFAQ = async (req, res, next) => {
  try {
    const { topic } = req.body;
    const generatedFAQ = await generateFAQFromAI(topic);

    res.status(200).json({
      success: true,
      data: generatedFAQ,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateAIAnswer,
  generateAIFAQ,
};
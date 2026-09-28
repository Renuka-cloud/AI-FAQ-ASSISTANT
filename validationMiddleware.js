const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please include all fields' });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please include email and password' });
  }
  next();
};

const validateFAQ = (req, res, next) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ success: false, message: 'Question and answer are required' });
  }
  next();
};

const validateAIAnswer = (req, res, next) => {
  if (!req.body.question) {
    return res.status(400).json({ success: false, message: 'Question is required' });
  }
  next();
};

const validateAIFaq = (req, res, next) => {
  if (!req.body.topic) {
    return res.status(400).json({ success: false, message: 'Topic is required' });
  }
  next();
};

module.exports = { validateRegister, validateLogin, validateFAQ, validateAIAnswer, validateAIFaq };
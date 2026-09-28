const FAQ = require('../models/FAQ'); // <-- FAQ.js model import

// Create FAQ
const createFAQ = async (req, res, next) => {
  try {
    const { question, answer, category } = req.body;

    const faq = await FAQ.create({
      question,
      answer,
      category: category || 'General',
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'FAQ created successfully',
      data: faq,
    });
  } catch (error) {
    next(error);
  }
};

// Get All FAQs
const getAllFAQs = async (req, res, next) => {
  try {
    const faqs = await FAQ.find().populate('createdBy', 'name email');
    res.status(200).json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    next(error);
  }
};

// Get Single FAQ
const getFAQById = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id).populate('createdBy', 'name email');
    if (!faq) {
      res.status(404);
      throw new Error('FAQ not found');
    }
    res.status(200).json({
      success: true,
      data: faq,
    });
  } catch (error) {
    next(error);
  }
};

// Update FAQ
const updateFAQ = async (req, res, next) => {
  try {
    let faq = await FAQ.findById(req.params.id);

    if (!faq) {
      res.status(404);
      throw new Error('FAQ not found');
    }

    if (faq.createdBy.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this FAQ');
    }

    faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'FAQ updated successfully',
      data: faq,
    });
  } catch (error) {
    next(error);
  }
};

// Delete FAQ
const deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      res.status(404);
      throw new Error('FAQ not found');
    }

    if (faq.createdBy.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this FAQ');
    }

    await faq.deleteOne();

    res.status(200).json({
      success: true,
      message: 'FAQ deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Search FAQs
const searchFAQs = async (req, res, next) => {
  try {
    const { q } = req.query;
    let query = {};

    if (q) {
      query = {
        $or: [
          { question: { $regex: q, $options: 'i' } },
          { answer: { $regex: q, $options: 'i' } },
          { category: { $regex: q, $options: 'i' } },
        ],
      };
    }

    const faqs = await FAQ.find(query).populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
  searchFAQs,
};
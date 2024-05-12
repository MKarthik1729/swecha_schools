const express = require('express');
const router = express.Router();
const { createTerm , getAllTerms } = require('../controllers/termController');

router.post('/terms', (req, res) => {
    const { schoolId, term } = req.body;
    createTerm(schoolId, term, (error, termId) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.status(201).json({ termId });
    });
  });
  
  // Route to get all terms
  router.get('/terms/:school_id', (req, res) => {
    getAllTerms(req.params.school_id,(error, terms) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.json(terms);
    });
  });

  module.exports = router
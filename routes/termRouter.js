const express = require('express');
const router = express.Router();
const { createTerm , getAllTerms,add_term_to_students,get_class_terms } = require('../controllers/termController');

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


  router.post('/add_term_to_students', (req, res) => {
    const {fee,class_id,term_id}  = req.body
    add_term_to_students(term_id, class_id, fee,(error, terms) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.json(terms);
    });
  });

  router.get('/get_class_terms/:term_id', (req, res) => {
    const term_id = req.params.term_id
    get_class_terms(term_id,(error, terms) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.json(terms);
    });
  });


  module.exports = router
const express = require('express');
const router = express.Router();
const { createSubject, deleteSubject } = require('../controllers/subjectController');

// Route to create a new subject
router.post('/subjects', (req, res) => {
    const { name, classId } = req.body;
    createSubject(name, classId, (error, subjectId) => {
        if (error) {
            res.status(500).json({ error: 'Unable to create subject' });
            return;
        }
        res.status(201).json({ id: subjectId, name, classId });
    });
});

// Route to delete a subject by ID
router.delete('/subjects/:id', (req, res) => {
    const subjectId = req.params.id;
    deleteSubject(subjectId, (error) => {
        if (error) {
            res.status(500).json({ error: 'Unable to delete subject' });
            return;
        }
        res.status(200).json({ message: 'Subject deleted successfully' });
    });
});

module.exports = router;

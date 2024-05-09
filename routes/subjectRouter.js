const express = require('express');
const router = express.Router();
const { createSubject, deleteSubject, getAllSubjects,getSubjectsbyClass } = require('../controllers/subjectController');

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

router.get('/subjects', (req, res) => {
    getAllSubjects((err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(rows);
    });
});

router.get('/subjects/class/:classId', (req, res) => {
    const class_id = req.params.classId;
    getSubjectsbyClass(class_id, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(rows);
    });
});


module.exports = router;

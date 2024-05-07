const express = require('express');
const router = express.Router();
const {
    createStudent,
    editStudent,
    deleteStudent,
    getAllStudents,
    getStudentbyClass
} = require('../controllers/studentController'); // Assuming the functions are exported from studentFunctions.js

// Route to create a new student
router.post('/students', (req, res) => {
    const { school_id, name, class_id, mobile, preferred_lang } = req.body;
    createStudent(school_id, name, class_id, mobile, preferred_lang, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ message: 'Student created successfully', student_id: result.insertId });
    });
});

// Route to edit an existing student
router.put('/students/:studentId', (req, res) => {
    const student_id = req.params.studentId;
    const { school_id, name, class_id, mobile, preferred_lang } = req.body;
    editStudent(student_id, school_id, name, class_id, mobile, preferred_lang, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Student updated successfully' });
    });
});

// Route to delete an existing student
router.delete('/students/:studentId', (req, res) => {
    const student_id = req.params.studentId;
    deleteStudent(student_id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    });
});

// Route to get all students
router.get('/students', (req, res) => {
    getAllStudents((err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(rows);
    });
});

// Route to get students by class
router.get('/students/class/:classId', (req, res) => {
    const class_id = req.params.classId;
    getStudentbyClass(class_id, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(rows);
    });
});

module.exports = router;

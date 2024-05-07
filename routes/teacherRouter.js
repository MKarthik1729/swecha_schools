const express = require('express');
const router = express.Router();
const { createTeacher, editTeacher, deleteTeacher, getAllTeachers, getTeachersWithNoClassDealing } = require('../controllers/teacherController');

// Route to create a new teacher
router.post('/teachers', (req, res) => {
    const teacherData = req.body;
    createTeacher(teacherData, (error, teacherId) => {
        if (error) {
            res.status(500).json({ error: "Unable to create teacher." });
        } else {
            res.status(201).json({ id: teacherId, message: "Teacher created successfully." });
        }
    });
});

// Route to edit an existing teacher
router.put('/teachers/:id', (req, res) => {
    const teacherId = req.params.id;
    const teacherData = req.body;
    editTeacher(teacherId, teacherData, (error, success) => {
        if (error) {
            res.status(500).json({ error: "Unable to edit teacher." });
        } else if (!success) {
            res.status(404).json({ error: "Teacher not found." });
        } else {
            res.status(200).json({ message: "Teacher edited successfully." });
        }
    });
});

// Route to delete a teacher
router.delete('/teachers/:id', (req, res) => {
    const teacherId = req.params.id;
    deleteTeacher(teacherId, (error, success) => {
        if (error) {
            res.status(500).json({ error: "Unable to delete teacher." });
        } else if (!success) {
            res.status(404).json({ error: "Teacher not found." });
        } else {
            res.status(200).json({ message: "Teacher deleted successfully." });
        }
    });
});

// Route to get all teachers
router.get('/teachers', (req, res) => {
    getAllTeachers((error, teachers) => {
        if (error) {
            res.status(500).json({ error: "Unable to fetch teachers." });
        } else {
            res.status(200).json(teachers);
        }
    });
});

// Route to get teachers with no class dealing
router.get('/teachers/no-class-dealing', (req, res) => {
    getTeachersWithNoClassDealing((error, teachers) => {
        if (error) {
            res.status(500).json({ error: "Unable to fetch teachers with no class dealing." });
        } else {
            res.status(200).json(teachers);
        }
    });
});

module.exports = router;

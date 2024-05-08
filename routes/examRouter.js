// Import necessary modules
const express = require('express');
const router = express.Router();
const {createExam,editExam,deleteExam,createExamGroup,editExamGroup} = require('../controllers/examControllers')

// Route to create a new exam
router.post('/exams', async (req, res) => {
    try {
        const { subject_id, date, exam_group_id, highest_mark, average_mark, max_mark } = req.body;
        const examId = await createExam(subject_id, date, exam_group_id, highest_mark, average_mark, max_mark);
        res.status(201).json({ id: examId, message: 'Exam created successfully' });
    } catch (error) {
        console.error('Error creating exam:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to edit an existing exam
router.put('/exams/:id', async (req, res) => {
    try {
        const examId = req.params.id;
        const { subject_id, date, exam_group_id, highest_mark, average_mark, max_mark } = req.body;
        const success = await editExam(examId, subject_id, date, exam_group_id, highest_mark, average_mark, max_mark);
        if (success) {
            res.status(200).json({ message: 'Exam updated successfully' });
        } else {
            res.status(404).json({ error: 'Exam not found' });
        }
    } catch (error) {
        console.error('Error editing exam:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete an existing exam
router.delete('/exams/:id', async (req, res) => {
    try {
        const examId = req.params.id;
        const success = await deleteExam(examId);
        if (success) {
            res.status(200).json({ message: 'Exam deleted successfully' });
        } else {
            res.status(404).json({ error: 'Exam not found' });
        }
    } catch (error) {
        console.error('Error deleting exam:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/exam-groups', (req, res) => {
    const { name } = req.body;
    createExamGroup(name, (err, groupId) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create exam group' });
        }
        return res.status(201).json({ id: groupId, name: name });
    });
});

// Example route for editing an exam group
router.put('/exam-groups/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    editExamGroup(id, name, (err, success) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to edit exam group' });
        }
        if (!success) {
            return res.status(404).json({ error: 'Exam group not found' });
        }
        return res.status(200).json({ message: 'Exam group updated successfully' });
    });
});


module.exports = router;

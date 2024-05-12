const express = require('express');
const router = express.Router();
const classes = require('../controllers/classController');

router.get('/', (req, res) => {
  res.send('Hello, World!');
}); 

router.post('/create-class', (req, res) => {
    const classData = req.body;

    classes.createClass(classData, (err, classId) => {
      if (err) {
        console.error('Failed to create class:', err);
        res.status(500).json({ error: 'Failed to create class' });
        return;
      }
      res.status(201).json({ classId });
    });
});

router.put('/edit-class/:classId', (req, res) => {
    const classId = req.params.classId;
    const classData = req.body;
    classes.editClass(classId, classData, (err, affectedRows) => {
        if (err) {
            console.error('Failed to edit class:', err);
            res.status(500).json({ error: 'Failed to edit class' });
            return;
        }
        res.status(200).json({ affectedRows });
    });
});

router.delete('/delete-class/:classId', (req, res) => {
    const classId = req.params.classId;
    classes.deleteClass(classId, (err, affectedRows) => {
        if (err) {
            console.error('Failed to delete class:', err);
            res.status(500).json({ error: 'Failed to delete class' });
            return;
        }
        res.status(200).json({ affectedRows });
    }); 
});

router.get('/classes/no-teacher', (req, res) => {
    classes.NoTeacher((err, classes) => {
        if (err) {
            console.error('Failed to get classes with no teacher:', err);
            res.status(500).json({ error: 'Failed to get classes with no teacher' });
            return;
        }
        res.status(200).json(classes );
    });
});

router.get('/classes/:schoolId', (req, res) => {
    const schoolId = req.params.schoolId;
    classes.getClassesBySchool(schoolId, (err, classes) => {
        if (err) {
            console.error('Failed to get classes by school:', err);
            res.status(500).json({ error: 'Failed to get classes by school' });
            return;
        }
        res.status(200).json(classes);
    });
});

router.get('/classes', (req, res) => {
    classes.getAllClasses((err, classes) => {
        if (err) {
            console.error('Failed to get classes:', err);
            res.status(500).json({ error: 'Failed to get classes' });
            return;
        }
        res.status(200).json({ classes });
    });
});

// Error handling middleware
router.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = router;

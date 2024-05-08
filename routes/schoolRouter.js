const express = require('express');
const app = express.Router();

// Import the functions and assuming db is your MySQL connection
const { createSchool, editSchool, deleteSchool, msgCountIncrement } = require('../controllers/schoolController');

// Route to create a school
app.post('/school', (req, res) => {
    createSchool(req.body, (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).send('School created successfully');
    });
});

// Route to edit a school
app.put('/school/:id', (req, res) => {
    const schoolId = req.params.id;
    editSchool(schoolId, req.body, (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send('School updated successfully');
    });
});

// Route to delete a school
app.delete('/school/:id', (req, res) => {
    const schoolId = req.params.id;
    deleteSchool(schoolId, (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send('School deleted successfully');
    });
});

// Route to increment message count for a school
app.post('/school/:id/msgCountIncrement', (req, res) => {
    const schoolId = req.params.id;
    const {count} = req.body
    msgCountIncrement(schoolId,count, (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send('Message count incremented successfully');
    });
});


module.exports = app
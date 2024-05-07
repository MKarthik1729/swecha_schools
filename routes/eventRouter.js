// routes/events.js

const express = require('express');
const router = express.Router();
const { createEvent, editEvent, getAllEvents, getEventsOfClass } = require('../controllers/eventController');

// Route to create a new event
router.post('/create-event', (req, res) => {
    const eventData = req.body;
    createEvent(eventData, (err, eventId) => {
        if (err) {
            console.error("Error creating event:", err);
            res.status(500).send("Error creating event");
            return;
        }
        res.status(200).send({ eventId });
    });
});

// Route to edit an existing event
router.put('/edit-event/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    const eventData = req.body;
    editEvent(eventId, eventData, (err, success) => {
        if (err) {
            console.error("Error editing event:", err);
            res.status(500).send("Error editing event");
            return;
        }
        if (!success) {
            res.status(404).send("Event not found");
            return;
        }
        res.status(200).send("Event edited successfully");
    });
});

// Route to get all events
router.get('/getAllEvents', (req, res) => {
    getAllEvents((err, events) => {
        if (err) {
            console.error("Error getting all events:", err);
            res.status(500).send("Error getting all events");
            return;
        }
        res.status(200).send(events);
    });
});

// Route to get events of a specific class
router.get('/getClassEvents/:classId', (req, res) => {
    const classId = req.params.classId;
    getEventsOfClass(classId, (err, events) => {
        if (err) {
            console.error("Error getting events of class:", err);
            res.status(500).send("Error getting events of class");
            return;
        }
        res.status(200).send(events);
    });
});

module.exports = router;

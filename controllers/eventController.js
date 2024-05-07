// Assuming you have already set up your MySQL connection

const connection = require('../models/database');

// Function to create a new event
const createEvent = (eventData, callback) => {
    const { photos, school_id, total_school, class_id, date, summary, type_of_event } = eventData;
    const query = "INSERT INTO events (photos, school_id, total_school, class_id, date, summary, type_of_event) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [photos, school_id, total_school, class_id, date, summary, type_of_event];

    connection.query(query, values, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result.insertId);
    });
};

// Function to edit an existing event
const editEvent = (eventId, eventData, callback) => {
    const { photos, school_id, total_school, class_id, date, summary, type_of_event } = eventData;
    const query = "UPDATE events SET photos=?, school_id=?, total_school=?, class_id=?, date=?, summary=?, type_of_event=? WHERE id=?";
    const values = [photos, school_id, total_school, class_id, date, summary, type_of_event, eventId];

    connection.query(query, values, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result.affectedRows > 0);
    });
};

// Function to get all events
const getAllEvents = (callback) => {
    const query = "SELECT * FROM events";
    connection.query(query, (err, rows) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, rows);
    });
};

// Function to get events of a specific class
const getEventsOfClass = (classId, callback) => {
    const query = "SELECT * FROM events WHERE class_id LIKE CONCAT('%', ?, '%')";
    connection.query(query, [classId], (err, rows) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, rows);
    });
};


module.exports = {
    createEvent,
    editEvent,
    getAllEvents,
    getEventsOfClass
};


const connection = require('../models/database');

function createSubject(name, classId, callback) {
    connection.query('INSERT INTO subjects (name, class_id) VALUES (?, ?)', [name, classId], (error, results) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, results.insertId);
    });
}

// Function to delete a subject by ID
function deleteSubject(id, callback) {
    connection.query('DELETE FROM subjects WHERE id = ?', [id], (error, results) => {
        if (error) {
            callback(error);
            return;
        }
        callback(null);
    });
}

module.exports = {
    createSubject,
    deleteSubject
};
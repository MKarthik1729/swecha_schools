
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


const getAllSubjects = (callback) => {
    const query = "SELECT * FROM subjects";
    connection.query(query, (err, rows) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, rows);
    });
};

const getSubjectsbyClass= (class_idcallback) => {
    const query = "SELECT * FROM subjects where class_id=?";
    connection.query(query,class_id, (err, rows) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, rows);
    });
};

module.exports = {
    createSubject,
    deleteSubject,
    getAllSubjects,
    getSubjectsbyClass
};
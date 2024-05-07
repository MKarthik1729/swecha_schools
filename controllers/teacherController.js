// Assuming you have already established a MySQL connection
const connection = require('../models/database');
// Function to create a new teacher
function createTeacher(teacherData, callback) {
    const { school_id, name, mobile, class_dealing } = teacherData;
    const query = "INSERT INTO teacher (school_id, name, mobile, class_dealing) VALUES (?, ?, ?, ?)";
    connection.query(query, [school_id, name, mobile, class_dealing], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results.insertId); // Returns the ID of the newly inserted teacher
        }
    });
}

// Function to edit an existing teacher
function editTeacher(teacherId, teacherData, callback) {
    const { school_id, name, mobile, class_dealing } = teacherData;
    const query = "UPDATE teacher SET school_id=?, name=?, mobile=?, class_dealing=? WHERE id=?";
    connection.query(query, [school_id, name, mobile, class_dealing, teacherId], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results.affectedRows > 0); // Returns true if update was successful
        }
    });
}

// Function to delete a teacher
function deleteTeacher(teacherId, callback) {
    const query = "DELETE FROM teacher WHERE id=?";
    connection.query(query, [teacherId], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results.affectedRows > 0); // Returns true if deletion was successful
        }
    });
}

// Function to get all teachers
function getAllTeachers(callback) {
    const query = "SELECT * FROM teacher";
    connection.query(query, (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

// Function to get teachers with no class dealing
function getTeachersWithNoClassDealing(callback) {
    const query = "SELECT * FROM teacher WHERE class_dealing IS NULL OR class_dealing = 0";
    connection.query(query, (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

module.exports = { createTeacher, editTeacher, deleteTeacher, getAllTeachers, getTeachersWithNoClassDealing };

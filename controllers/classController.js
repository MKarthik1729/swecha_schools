const connection = require('../models/database');

function createClass(classData, callback) {
    const { school_id, class_name, section_name, academic_id, class_teacher, subject_id } = classData;
    const query = 'INSERT INTO classes (school_id, class_name, section_name, academic_id, class_teacher, subject_id) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [school_id, class_name, section_name, academic_id, class_teacher, subject_id];
    

    connection.query(query, values, (err, result) => {
        // Handle query results
        if (err) {
            console.error('Error creating class:', err);
            callback(err);
            return;
        }
        console.log('Class created successfully');
        console.log(result)
        callback(null, result.insertId); // Pass the inserted class_id back to the callback
        

    });
}

function editClass(classId, classData, callback) {
    const { school_id, class_name, section_name, academic_id, class_teacher, subject_id } = classData;
    const query = 'UPDATE classes SET school_id=?, class_name=?, section_name=?, academic_id=?, class_teacher=?, subject_id=? WHERE class_id=?';
    const values = [school_id, class_name, section_name, academic_id, class_teacher, subject_id, classId];
    
    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error editing class:', err);
            callback(err);
            return;
        }
        console.log('Class edited successfully');
        callback(null, result.affectedRows); // Return the number of affected rows
    });
}

// Function to delete a class
function deleteClass(classId, callback) {
    const query = 'DELETE FROM classes WHERE class_id=?';
    
    connection.query(query, classId, (err, result) => {
        if (err) {
            console.error('Error deleting class:', err);
            callback(err);
            return;
        }
        console.log('Class deleted successfully');
        callback(null, result.affectedRows); // Return the number of affected rows
    });
}

// Function to get classes by school
function getClassesBySchool(schoolId, callback) {
    const query = 'SELECT * FROM classes WHERE school_id=?';
    
    connection.query(query, schoolId, (err, rows) => {
        if (err) {
            console.error('Error getting classes by school:', err);
            callback(err, null);
            return;
        }
        callback(null, rows); // Return the retrieved classes
    });
}

// Function to get classes with no assigned teacher
// Function to get classes with no teacher assigned
function NoTeacher(callback) {
    const query = 'SELECT * FROM classes WHERE class_teacher IS NULL';
    
    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Error getting classes with no teacher:', err);
            callback(err, null);
            return;
        }
        console.log('Classes with no teacher:', rows); // Log the retrieved classes
        callback(null, rows); // Return the retrieved classes
    });
}

function getAllClasses(callback) {
    const query = 'SELECT * FROM classes';
    
    connection.query(query, (err, rows) => {
        if (err) {
            console.error('Error getting classes with no teacher:', err);
            callback(err, null);
            return;
        }
        console.log('Classes with no teacher:', rows); // Log the retrieved classes
        callback(null, rows); // Return the retrieved classes
    });
}

module.exports = {
    createClass,
    editClass,
    deleteClass,
    getClassesBySchool,
    NoTeacher,
    getAllClasses // Add this line to export the new function
};

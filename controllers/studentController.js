// Assuming you have a MySQL connection
const mysqlConnection = require('../models/database'); // Import your MySQL connection module

// Function to create a new student
const createStudent = (school_id, name, class_id, mobile, preferred_lang, callback) => {
    const query = 'INSERT INTO students (school_id, name, class_id, mobile, preferred_lang) VALUES (?, ?, ?, ?, ?)';
    const values = [school_id, name, class_id, mobile, preferred_lang];
    
    mysqlConnection.query(query, values, callback);
};

// Function to edit an existing student
const editStudent = (student_id, school_id, name, class_id, mobile, preferred_lang, callback) => {
    const query = 'UPDATE students SET school_id=?, name=?, class_id=?, mobile=?, preferred_lang=? WHERE student_id=?';
    const values = [school_id, name, class_id, mobile, preferred_lang, student_id];
    
    mysqlConnection.query(query, values, callback);
};

// Function to delete an existing student
const deleteStudent = (student_id, callback) => {
    const query = 'DELETE FROM students WHERE student_id=?';
    
    mysqlConnection.query(query, [student_id], callback);
};

// Function to get all students
const getAllStudents = (callback) => {
    mysqlConnection.query('SELECT * FROM students', callback);
};

// Function to get students by class
const getStudentbyClass = (class_id, callback) => {
    mysqlConnection.query('SELECT * FROM students WHERE class_id=?', [class_id], callback);
};

// Export the functions
module.exports = {
    createStudent,
    editStudent,
    deleteStudent,
    getAllStudents,
    getStudentbyClass
};

// Assuming you have already established a MySQL connection
const connection = require('../models/database');
// Function to create a new teacher
function createTeacher(teacherData, callback) {
    const { school_id, name, mobile, class_dealing } = teacherData;
    // const query = "INSERT INTO teacher (school_id, name, mobile, class_dealing) VALUES (?, ?, ?, ?)";
    const query = "CALL create_teacher(?, ?, ?, ?);";
    connection.query(query, [name, mobile, school_id, class_dealing], (error, results) => {
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
    const query = "CALL UpdateTeacherAndAccount(?, ?, ?, ?, ?);"
    connection.query(query, [teacherId,school_id, name, mobile, class_dealing], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results.affectedRows > 0); // Returns true if update was successful
        }
    });
}

// Function to delete a teacher
function deleteTeacher(teacherId, callback) {
    const query = "DELETE FROM teacher WHERE id=? ";
    connection.query(query, [teacherId], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results.affectedRows > 0); // Returns true if deletion was successful
        }
    });
}

// Function to get all teachers
function getAllTeachers(school_id,callback) {
    const query = `
    SELECT t.id, t.name, t.mobile, t.class_dealing, c.class_name, c.section_name
FROM teacher t
LEFT JOIN classes c ON t.class_dealing = c.class_id
WHERE t.school_id = ${school_id}
order by t.name
    `;
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
    const query = "SELECT * FROM teacher WHERE class_dealing IS NULL OR class_dealing = 0 order by name";
    connection.query(query, (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}

function add_teacher_to_class(teacher_id,class_id, callback) {
    const query = `CALL AssignClassAndTeacher(${class_id},${teacher_id})`
    connection.query(query, (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results.affectedRows > 0); // Returns true if update was successful
        }
    });
}

module.exports = { createTeacher, editTeacher, deleteTeacher, getAllTeachers, getTeachersWithNoClassDealing,add_teacher_to_class };

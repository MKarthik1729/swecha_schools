const connection = require('../models/database')

function createExam(subject_id, date, exam_group_id, highest_mark, average_mark, max_mark) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO exams (subject_id, date, exam_group_id, highest_mark, average_mark, max_mark) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(query, [subject_id, date, exam_group_id, highest_mark, average_mark, max_mark], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.insertId);
            }
        });
    });
}

// Function to edit an existing exam
function editExam(exam_id, subject_id, date, exam_group_id, highest_mark, average_mark, max_mark) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE exams SET subject_id=?, date=?, exam_group_id=?, highest_mark=?, average_mark=?, max_mark=? WHERE id=?';
        connection.query(query, [subject_id, date, exam_group_id, highest_mark, average_mark, max_mark, exam_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.affectedRows > 0);
            }
        });
    });
}

function deleteExam(exam_id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM exams WHERE id=?';
        connection.query(query, [exam_id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.affectedRows > 0);
            }
        });
    });
}

const createExamGroup = (name, callback) => {
    const query = 'INSERT INTO exam_group (name) VALUES (?)';
    connection.query(query, [name], (err, results) => {
        if (err) {
            return callback(err);
        }
        return callback(null, results.insertId);
    });
};

// Function to edit an exam group
const editExamGroup = (id, newName, callback) => {
    const query = 'UPDATE exam_group SET name = ? WHERE id = ?';
    connection.query(query, [newName, id], (err, results) => {
        if (err) {
            return callback(err);
        }
        return callback(null, results.affectedRows > 0);
    });
};


module.exports = {
    createExam,
    editExam,
    deleteExam,
    createExamGroup,
    editExamGroup
}
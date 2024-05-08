// Assuming you have already established a connection to your MySQL database
const db = require('../models/database');
// Create School
const createSchool = (schoolData, callback) => {
    const { name, address, state, district, pincode, mobile } = schoolData;
    const sql = `INSERT INTO school (name, address, state, district, pincode, mobile) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [name, address, state, district, pincode, mobile];
    db.query(sql, values, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Edit School
const editSchool = (schoolId, schoolData, callback) => {
    const { name, address, state, district, pincode, mobile } = schoolData;
    const sql = `UPDATE school SET name=?, address=?, state=?, district=?, pincode=?, mobile=? WHERE school_id=?`;
    const values = [name, address, state, district, pincode, mobile, schoolId];
    db.query(sql, values, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Delete School
const deleteSchool = (schoolId, callback) => {
    const sql = `DELETE FROM school WHERE school_id=?`;
    db.query(sql, schoolId, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

// Increment Message Count
const msgCountIncrement = (schoolId,num, callback) => {
    const sql = `UPDATE school SET msg_count = msg_count + ${num} WHERE school_id = ?`;
    db.query(sql, schoolId, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

const getAllSchools =(callback) => {
    const sql = `Select * from school`;
    db.query(sql,(err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    });
};

module.exports = {
createSchool,
editSchool,
deleteSchool,
msgCountIncrement,
getAllSchools
}
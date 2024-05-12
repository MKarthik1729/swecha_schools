
const connection = require('../models/database');
// Function to create a new term
function createTerm(schoolId, term, callback) {
    connection.query('INSERT INTO terms (school_id, term) VALUES (?, ?)', [schoolId, term], (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results.insertId); // Return the ID of the newly inserted term
  });
}

// Function to get all terms
function getAllTerms(school_id,callback) {
    connection.query(`SELECT * FROM terms WHERE school_id = ${school_id}`, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
}

function add_term_to_students(term_id, class_id, fee,callback) {
    const query = "CALL add_term_to_students(?, ?, ?);"
    connection.query(query, [class_id,term_id, fee], (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results.affectedRows > 0); // Returns true if update was successful
        }
    });
}

module.exports = { createTerm, getAllTerms,add_term_to_students };


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

module.exports = { createTerm, getAllTerms };

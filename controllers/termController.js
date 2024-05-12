
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


function get_class_terms(term_id,callback) {
    const query = `SELECT 
    c.class_id,
    c.class_name,
    c.section_name,
    d.term_id,
    CASE 
        WHEN d.fee IS NULL THEN NULL
        ELSE d.fee
    END AS default_fee
FROM 
    classes c
LEFT JOIN 
    defaults_table d ON c.class_id = d.class_id AND d.term_id = ${term_id};`
    connection.query(query, (error, results) => {
        if (error) {
            return callback(error);
          }
          return callback(null, results);
    });
}

module.exports = { createTerm, getAllTerms,add_term_to_students,get_class_terms };

const connection = require('../models/database');

const getAccountbyMobile = (mobile, callback) => {
    connection.query(`SELECT * FROM accounts WHERE mobile=${mobile}`, (err,res)=>{
        if (err) {
            callback(err, null);
        } else {
            console.log(res)
            callback(null, res);
        }
    });
};

const createAcadYear = (year, callback) => {
    const sql = 'INSERT INTO acad_year (year) VALUES (?)';
    connection.query(sql, [year], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  };
  
  // Function to delete academic year by ID
  const deleteAcadYear = (acadId, callback) => {
    const sql = 'DELETE FROM acad_year WHERE acad_id = ?';
    connection.query(sql, [acadId], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  };
  
  


  module.exports = { getAccountbyMobile,createAcadYear, deleteAcadYear };

// Assuming you have already set up your MySQL connection

const connection = require('../models/database');

// Function to add a device
function addDevice(mobile, mobiles) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO devices (mobile, mobiles) VALUES (?, ?)', [mobile, mobiles], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  
  // Function to delete a device
  function deleteDevice(mobile) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM devices WHERE mobile = ?', [mobile], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
  
  module.exports = { addDevice, deleteDevice };
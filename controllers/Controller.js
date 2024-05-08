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

module.exports = {
    getAccountbyMobile
}
var sql = require('mysql')

var connection = sql.createConnection({
    host:"schoolsdb.ctuq6mio0i13.ap-south-2.rds.amazonaws.com",
    user:"swecha",
    password:"Swecha2404",
    port:"3306"
}) 

connection.connect()




module.exports = connection
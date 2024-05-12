var sql = require('mysql')
const pas = process.env.DBPASSWORD
var connection = sql.createConnection({
    host:process.env.DBHOST,
    user:process.env.DBUSER,
    password:"Swecha2404",
    port:process.env.DBPORT
}) 
// console.log(type(process.env.DBPASSWORD))
connection.connect()




module.exports = connection
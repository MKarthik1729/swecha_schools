// Importing required modules
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const sql = require('./models/database')
// Creating an Express application
const app = express();

app.use(cors());
app.use(express.json());

// Define a route handler for the root path
app.use('/',require('./routes/router'))
app.use('/',require('./routes/classRouter'))
app.use('/',require('./routes/studentRouter'))
app.use('/',require('./routes/teacherRouter'))
app.use('/',require('./routes/subjectRouter'))
app.use('/',require('./routes/eventRouter'))
app.use('/',require('./routes/deviceRouter'))
app.use('/',require('./routes/examRouter'))


// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

  sql.query("use schools",(err,res,field)=>{
    
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("database connnected....")
    console.log(res)
  })

});

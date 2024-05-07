// Importing required modules
const express = require('express');
require('dotenv').config();
// Creating an Express application
const app = express();

app.use(express.json());

// Define a route handler for the root path
app.use('/',require('./routes/router'))


// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

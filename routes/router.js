// Importing required modules
const express = require('express');

// Creating a router
const router = express.Router();
const otpReq = require('../support')
// Define a route handler for the root path
router.get('/', (req, res) => {
  res.send('Hello, World!');
}); 

router.post('/data', async (req, res) => {
    try {
        console.log(req.body);
        const { numbers, otp, account_type } = req.body;
        const result = await otpReq(numbers, otp, account_type); // Wait for otpReq to complete
        res.send("Successful "); // Send response after getting data from otpReq
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});
// Export the router
module.exports = router;

// Importing required modules
const express = require('express');
const connection = require('../models/database')

const router = express.Router();
const otpReq = require('../support')
const {getAccountbyMobile,createAcadYear,deleteAcadYear} = require('../controllers/Controller')

router.get('/', (req, res) => {
  res.send('Hello, World!');
}); 

router.post('/resend-otp', async (req, res) => {
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

router.get('/allAccounts', (req, res) => {
    const query = 'SELECT * FROM accounts';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({ error: 'Error fetching accounts' });
      } else {
        // Send the fetched accounts as JSON
        res.json(results);
      }
    });
  });

router.post('/otp', async (req, res) => {
  try {
    const { numbers, otp } = req.body;
    console.log(numbers);
      // const result = await otpReq(numbers, otp); // Wait for otpReq to complete
      // res.send("Successful "); // Send response after getting data from otpReq

      getAccountbyMobile(numbers,async(err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        } 
        if (rows.length>0){
          const type = rows[0].type
        res.status(200).json({type: type});
          if(type==0){
           otpReq(numbers, otp, 'student');
          }else if(type==1){
           otpReq(numbers, otp, 'teacher');
          }
          else{
            await otpReq(numbers, otp, 'admin');
          }

        }else{
        res.status(205).json({type:-1})
        }
    });



  } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error")
  }
})


router.post('/acadyear', (req, res) => {
  const { year } = req.body;
  createAcadYear(year, (err, result) => {
    if (err) {
      console.error('Error creating academic year:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'Academic year created successfully', result });
  });
});

// Route to delete academic year by ID
router.delete('/acadyear/:id', (req, res) => {
  const acadId = req.params.id;
  deleteAcadYear(acadId, (err, result) => {
    if (err) {
      console.error('Error deleting academic year:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Academic year not found' });
    }
    res.status(200).json({ message: 'Academic year deleted successfully' });
  });
});

module.exports = router;

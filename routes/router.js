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
        res.status(200).json(rows);
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

router.get('/feedata/:school_id', (req, res) => {
  var school_id = req.params.school_id
  const query = `SELECT t.term_id, t.term, COUNT(CASE WHEN fs.paid = TRUE THEN 1 ELSE NULL END) AS noOfPaid, COUNT(CASE WHEN fs.paid = FALSE THEN 1 ELSE NULL END) AS noOfUnpaid, SUM(CASE WHEN fs.paid = TRUE THEN fs.fee_paid ELSE 0 END) AS total_fee_paid, SUM(CASE WHEN fs.paid = FALSE THEN fs.fee_bal ELSE 0 END) AS total_fee_bal FROM terms t LEFT JOIN fee_status fs ON t.term_id = fs.term_id WHERE t.school_id = ${school_id} GROUP BY t.term_id, t.term`
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching fee data:', error);
      res.status(500).json({ error: 'Error fetching fee data' });
    } else {
      // Send the fetched accounts as JSON
      res.json(results);
    }
  });
});

// router.get('/classfeedata/:school_id', (req, res) => {
//   var school_id = req.params.school_id
//   // const query = `SELECT t.term_id, t.term, COUNT(CASE WHEN fs.paid = TRUE THEN 1 ELSE NULL END) AS noOfPaid, COUNT(CASE WHEN fs.paid = FALSE THEN 1 ELSE NULL END) AS noOfUnpaid, SUM(CASE WHEN fs.paid = TRUE THEN fs.fee_paid ELSE 0 END) AS total_fee_paid, SUM(CASE WHEN fs.paid = FALSE THEN fs.fee_bal ELSE 0 END) AS total_fee_bal FROM terms t LEFT JOIN fee_status fs ON t.term_id = fs.term_id WHERE t.school_id = ${school_id} GROUP BY t.term_id, t.term`
//   // const query = `SELECT t.term_id, t.term, SUM(fs.paid) AS noOfPaid, SUM(NOT fs.paid) AS noOfUnpaid, SUM(fs.fee_paid) AS total_fee_paid, SUM(fs.fee_bal) AS total_fee_bal, JSON_ARRAYAGG(JSON_OBJECT('student_id',s.student_id,'name',s.name,'mobile',s.mobile,'fee_bal',fs.fee_bal,'fee_paid',fs.fee_paid,'paid',fs.paid,'term',t.term)) AS students FROM terms t LEFT JOIN fee_status fs ON t.term_id = fs.term_id LEFT JOIN students s ON fs.student_id = s.student_id WHERE t.school_id = <school_id> AND s.class_id = ${school_id} GROUP BY t.term_id ORDER BY t.term_id;`
//   const query1 = `SELECT t.term_id, t.term, SUM(CASE WHEN fs.paid THEN 1 ELSE 0 END) AS noOfPaid, SUM(CASE WHEN NOT fs.paid THEN 1 ELSE 0 END) AS noOfUnpaid, SUM(fs.fee_paid) AS total_fee_paid, SUM(fs.fee_bal) AS total_fee_bal FROM terms t LEFT JOIN fee_status fs ON t.term_id = fs.term_id LEFT JOIN students s ON fs.student_id = s.student_id WHERE s.class_id = ${school_id} GROUP BY t.term_id, t.term;`
//   const query2 = `SELECT t.term_id, t.term, SUM(CASE WHEN fs.paid THEN 1 ELSE 0 END) AS noOfPaid, SUM(CASE WHEN NOT fs.paid THEN 1 ELSE 0 END) AS noOfUnpaid, SUM(fs.fee_paid) AS total_fee_paid, SUM(fs.fee_bal) AS total_fee_bal FROM terms t LEFT JOIN fee_status fs ON t.term_id = fs.term_id LEFT JOIN students s ON fs.student_id = s.student_id WHERE s.class_id = ${school_id} GROUP BY t.term_id, t.term;`
//   connection.query(query, (error, results) => {
//     if (error) {
//       console.error('Error fetching fee data:', error);
//       res.status(500).json({ error: 'Error fetching fee data' });
//     } else {
//       // Send the fetched accounts as JSON
//       res.json(results);
//     }
//   });
// });

router.get('/getAllfee/:school_id', (req, res) => {
  var school_id = req.params.school_id
  // const query = `SELECT t.term_id, t.term, COUNT(CASE WHEN fs.paid = TRUE THEN 1 ELSE NULL END) AS noOfPaid, COUNT(CASE WHEN fs.paid = FALSE THEN 1 ELSE NULL END) AS noOfUnpaid, SUM(CASE WHEN fs.paid = TRUE THEN fs.fee_paid ELSE 0 END) AS total_fee_paid, SUM(CASE WHEN fs.paid = FALSE THEN fs.fee_bal ELSE 0 END) AS total_fee_bal FROM terms t LEFT JOIN fee_status fs ON t.term_id = fs.term_id WHERE t.school_id = ${school_id} GROUP BY t.term_id, t.term`
  const query = `SELECT s.student_id, s.name, s.mobile, f.fee_bal, f.fee_paid, f.paid, t.term FROM students s JOIN fee_status f ON s.student_id = f.student_id JOIN terms t ON f.term_id = t.term_id WHERE s.school_id = ${school_id};
  `
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching fee data:', error);
      res.status(500).json({ error: 'Error fetching fee data' });
    } else {
      // Send the fetched accounts as JSON
      res.json(results);
    }
  });
});

router.get('/fee-status/:class_id', (req, res) => {
  const { school_id, class_id } = req.params;

  // Query to retrieve fee status data based on school_id and class_id
  const query = `
    SELECT 
      t.term_id,
      t.term,
      s.student_id,
      COUNT(CASE WHEN fs.paid = 1 THEN 1 END) AS noOfPaid,
      COUNT(CASE WHEN fs.paid = 0 THEN 1 END) AS noOfUnpaid,
      SUM(fs.fee_paid) AS total_fee_paid,
      SUM(fs.fee_bal) AS total_fee_bal,
      s.student_id,
      s.name,
      s.mobile,
      fs.fee_bal,
      fs.fee_paid,
      fs.paid
    FROM 
      fee_status fs
    INNER JOIN 
      students s ON fs.student_id = s.student_id
    INNER JOIN 
      terms t ON fs.term_id = t.term_id
    WHERE  s.class_id = ?
    GROUP BY 
      t.term_id, s.student_id
    ORDER BY 
      t.term_id, s.student_id;
  `;

  connection.query(query, [ class_id], (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const formattedResults = [];

      // Transforming the SQL results into the desired output format
      let currentTermId = null;
      let termData = null;

      results.forEach(row => {
        if (row.term_id !== currentTermId) {
          // New term encountered
          if (termData !== null) {
            formattedResults.push(termData);
          }
          termData = {
            term_id: row.term_id,
            term: row.term,
            noOfPaid: row.noOfPaid,
            noOfUnpaid: row.noOfUnpaid,
            total_fee_paid: row.total_fee_paid,
            total_fee_bal: row.total_fee_bal,
            students: []
          };
          currentTermId = row.term_id;
        }

        // Adding student data to the current term
        termData.students.push({
          student_id: row.student_id,
          name: row.name,
          mobile: row.mobile,
          fee_bal: row.fee_bal,
          fee_paid: row.fee_paid,
          paid: row.paid,
          term: row.term
        });
      });

      // Pushing the last term data
      if (termData !== null) {
        formattedResults.push(termData);
      }

      res.json(formattedResults);
    }
  });
});

module.exports = router;

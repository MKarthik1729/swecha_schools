// routes.js
const express = require('express');
const router = express.Router();
const { addDevice, deleteDevice } = require('../controllers/deviceController');

// Route to add a device
router.post('/addDevice', async (req, res) => {
  const { mobile, mobiles } = req.body;
  try {
    await addDevice(mobile, mobiles);
    res.status(200).json({ message: 'Device added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add device' });
  }
});

// Route to delete a device
router.delete('/deleteDevice/:mobile', async (req, res) => {
  const mobile = req.params.mobile;
  try {
    await deleteDevice(mobile);
    res.status(200).json({ message: 'Device deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete device' });
  }
});

module.exports = router;

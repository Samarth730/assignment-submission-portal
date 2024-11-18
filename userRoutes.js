const express = require('express');
const { registerUser, loginUser, uploadAssignment } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { validateRegister, validateLogin, validateAssignment } = require('../middlewares/validationMiddleware');

const router = express.Router();

// User Registration
router.post('/register', validateRegister, registerUser);

// User Login
router.post('/login', validateLogin, loginUser);

// Upload Assignment
router.post('/upload', verifyToken, validateAssignment, uploadAssignment);

module.exports = router;

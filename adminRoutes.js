const express = require('express');
const {
    registerAdmin,
    loginAdmin,
    viewAssignments,
    acceptAssignment,
    rejectAssignment,
} = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const { validateRegister, validateLogin } = require('../middlewares/validationMiddleware');

const router = express.Router();

// Admin Registration
router.post('/register', validateRegister, registerAdmin);

// Admin Login
router.post('/login', validateLogin, loginAdmin);

// View Assignments
router.get('/assignments', verifyToken, isAdmin, viewAssignments);

// Accept Assignment
router.post('/assignments/:id/accept', verifyToken, isAdmin, acceptAssignment);

// Reject Assignment
router.post('/assignments/:id/reject', verifyToken, isAdmin, rejectAssignment);

module.exports = router;

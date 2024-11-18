const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const Assignment = require('../models/assignmentModel');

exports.registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({ username, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.viewAssignments = async (req, res) => {
    try {
        const adminId = req.user.id;
        const assignments = await Assignment.find({ admin: adminId }).populate('userId', 'username');
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.acceptAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const adminId = req.user.id;

        const assignment = await Assignment.findOne({ _id: id, admin: adminId });
        if (!assignment) return res.status(404).json({ error: 'Assignment not found or unauthorized' });

        assignment.status = 'accepted';
        await assignment.save();
        res.status(200).json({ message: 'Assignment accepted', assignment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.rejectAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const adminId = req.user.id;

        const assignment = await Assignment.findOne({ _id: id, admin: adminId });
        if (!assignment) return res.status(404).json({ error: 'Assignment not found or unauthorized' });

        assignment.status = 'rejected';
        await assignment.save();
        res.status(200).json({ message: 'Assignment rejected', assignment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// this last


const { generateToken } = require('../utils/tokenUtils');

exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });

        if (!admin || admin.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(admin); // Generate token for admin
        res.json({ success: true, token });
    } catch (error) {
        next(error); // Pass the error to the error handler
    }
};


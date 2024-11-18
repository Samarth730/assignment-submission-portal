const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Assignment = require('../models/assignmentModel');
const Admin = require('../models/adminModel');

exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.uploadAssignment = async (req, res) => {
    try {
        const { task, adminId } = req.body;
        const userId = req.user.id;

        // Validate admin existence
        const admin = await Admin.findById(adminId);
        if (!admin) return res.status(404).json({ error: 'Admin not found' });

        const newAssignment = new Assignment({
            userId,
            task,
            admin: adminId,
        });

        await newAssignment.save();
        res.status(201).json({ message: 'Assignment uploaded successfully', assignment: newAssignment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// this can last

const { generateToken } = require('../utils/tokenUtils');

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user); // Generate token using token utility
        res.json({ success: true, token });
    } catch (error) {
        next(error); // Pass the error to the error handler
    }
};


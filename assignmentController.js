const Assignment = require('../models/assignmentModel');

exports.getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find()
            .populate('userId', 'username')
            .populate('admin', 'username');

        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAssignmentById = async (req, res) => {
    try {
        const { id } = req.params;

        const assignment = await Assignment.findById(id)
            .populate('userId', 'username')
            .populate('admin', 'username');

        if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

        res.status(200).json(assignment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const Team = require('../models/Team');

exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json(teams);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getSingleTeam = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: "Team not found" });
        res.status(200).json(team);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.createTeam = async (req, res) => {
    const team = new Team(req.body);
    try {
        const savedTeam = await team.save();
        res.status(201).json(savedTeam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTeam = async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeam) return res.status(404).json({ message: "Team not found" });
        res.status(200).json(updatedTeam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team) return res.status(404).json({ message: "Team not found" });
        res.status(200).json({ message: 'Team deleted successfully!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

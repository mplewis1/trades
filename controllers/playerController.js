const Player = require('../models/Player');

exports.getAllPlayers = async (req, res) => {
    const players = await Player.find().populate('team');
    res.status(200).json(players);
};

exports.createPlayer = async (req, res) => {
    const player = new Player(req.body);
    try {
        const savedPlayer = await player.save();
        res.status(201).json(savedPlayer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
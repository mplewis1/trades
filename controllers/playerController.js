const Player = require('../models/Player');

// Get all players
exports.getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find().populate('team', 'name');
        res.status(200).json(players);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create a new player
exports.createPlayer = async (req, res) => {
    console.log("Request Body:", req.body);

    const player = new Player(req.body);
    try {
        const savedPlayer = await player.save();
        res.status(201).json(savedPlayer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a player
exports.updatePlayer = async (req, res) => {
    try {
        const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!player) return res.status(404).json({ message: "Player not found" });
        res.status(200).json(player);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a player
exports.deletePlayer = async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);
        if (!player) return res.status(404).json({ message: "Player not found" });
        res.status(200).json({ message: 'Player deleted successfully!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a specific player by ID
exports.getPlayerById = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id).populate('team', 'name');
        if (!player) return res.status(404).json({ message: "Player not found" });
        res.status(200).json(player);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.simulateTrade = async (req, res) => {
    const { player1Id, player2Id } = req.body;

    try {
        // Fetch player details
        const player1 = await Player.findById(player1Id);
        const player2 = await Player.findById(player2Id);

        if (!player1 || !player2) {
            return res.status(404).json({ message: "One or both players not found." });
        }

        // Swap their teams
        const tempTeam = player1.team;
        player1.team = player2.team;
        player2.team = tempTeam;

        // Save the updated player details
        await player1.save();
        await player2.save();

        res.status(200).json({ message: "Trade simulated successfully!", player1, player2 });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
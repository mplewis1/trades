const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/', playerController.getAllPlayers);
router.get('/:id', playerController.getPlayerById);

router.post('/', playerController.createPlayer);
router.post('/simulate-trade', playerController.simulateTrade);

router.put('/:id', playerController.updatePlayer);

router.delete('/:id', playerController.deletePlayer);

module.exports = router;

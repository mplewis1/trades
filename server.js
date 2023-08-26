const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const teamRoutes = require('./routes/teamRoutes');
const playerRoutes = require('./routes/playerRoutes');

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tradesim', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('Failed to connect to MongoDB', err);
});

app.use('/teams', teamRoutes);
app.use('/players', playerRoutes);

app.get('/', (req, res) => {
    res.send('Hockey League Trade Simulator API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/teams', (req, res) => {
    res.json({ message: "Retrieve list of teams" });
});

app.get('/players', (req, res) => {
    res.json({ message: "Retrieve list of players" });
});

app.post('/trade', (req, res) => {
    const trade = req.body;
    res.json({ message: "Trade simulation submitted" });
});

app.get('/trade/:tradeId', (req, res) => {
    res.json({ message: `Retrieve trade simulation with ID: ${req.params.tradeId}` });
});
// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const Data = require('./models/Data');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// API endpoint to add data
app.post('/add', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newData = new Data({ name, email, age });
        await newData.save();
        res.status(201).json(newData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API endpoint to fetch data
app.get('/data', async (req, res) => {
    try {
        const data = await Data.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

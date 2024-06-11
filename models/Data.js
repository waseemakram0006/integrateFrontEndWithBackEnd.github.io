// models/Data.js
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true }
});

module.exports = mongoose.model('Data', dataSchema);

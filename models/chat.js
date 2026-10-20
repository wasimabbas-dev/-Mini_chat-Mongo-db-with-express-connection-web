const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    message: { type: String },
    timestamp: { type: Date, default: Date.now }
});

// Export the compiled model directly
module.exports = mongoose.model('Chat', chatSchema);
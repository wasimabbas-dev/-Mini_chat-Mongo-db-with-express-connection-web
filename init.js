const mongoose = require('mongoose');
const Chat = require('./models/chat.js'); // Imports the ready-to-use model

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

let Allchats = [
    { sender: 'Waseemabbas', receiver: 'ubaid', message: 'Hello, ubaid!' },
    { sender: 'ali', receiver: 'jawad', message: 'How are you?' }
];

// Now Chat is defined and has Mongoose methods attached
Chat.insertMany(Allchats)
    .then(() => console.log('All chat messages saved'))
    .catch(err => console.log('Error saving chats:', err));
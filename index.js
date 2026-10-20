const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Chat = require('./models/chat.js'); // Reuse the same Chat model
const path = require('path');
const methodOverride = require('method-override');
app.use(methodOverride('_method')); // Use method-override middleware

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
main();
app.set("views", path.join(__dirname, "views")); // Set the views directory
app.use(express.static('public')); // Serve static files from the 'public' directory
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/chats', async (req, res) => {
    let chats = await Chat.find(); // Works out of the box
    res.render('chats.ejs', { chats });
});
app.get('/chats/new', (req, res) => {
    res.render('newChat.ejs');
});
app.post('/chats', (req, res) => {
    let { sender, receiver, message } = req.body;
    let newChat = new Chat({ sender, receiver, message, timestamp: new Date() });
    newChat.save().then(() => console.log('New chat message saved')).catch(err => console.log('Error saving new chat:', err));
    res.redirect('/chats');
});

app.get("/chats/:id/edit", async (req,res)=> {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    // console.log(chat);
    res.render('edit.ejs', {chat});
})
app.put('/chats/:id', async (req,res)=> {
    let { id } = req.params;
    let { message } = req.body;
    console.log(id, message);
    let oldchat = await Chat.findById(id);
    oldchat.message = message;
    oldchat.save().then(() => console.log('message successfully changed...')).catch(err => console.log('Error saving edited chat:', err));
    res.redirect('/chats');
})

app.delete("/chats/:id",async (req,res)=> {
    let { id } = req.params;
    let deleted_Chat = await Chat.findByIdAndDelete(id);
    console.log(deleted_Chat);
    res.redirect('/chats');
})
app.listen(8080, () => console.log('Server running on port 8080'));
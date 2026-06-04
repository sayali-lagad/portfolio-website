const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './server/.env' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB Atlas!');
})
.catch((err) => {
    console.log('MongoDB Error:', err);
});

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    sentAt: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', messageSchema);

app.get('/', (req, res) => {
    res.send('Portfolio Backend Running');
});

app.post('/api/contact', async (req, res) => {
    try {

        const newMessage = new Message(req.body);

        await newMessage.save();

        res.json({
            success: true,
            message: 'Message Saved'
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const mongoURI = "mongodb+srv://saba:Zf0xEbhHIhj6zJck@sabas.xjgdn.mongodb.net/sabas?retryWrites=true&w=majority";
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(400).send('Error registering user');
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.status(200).json({ success: true, message: 'Login successful', redirectUrl: '/dashboard.html' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: 'Error logging in' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
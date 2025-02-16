// Import required libraries
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();
const port = 5000; // Port for the backend server

// Middleware
app.use(cors()); // Allow frontend to communicate with backend
app.use(bodyParser.json()); // Parse JSON data from frontend

// Connect to MongoDB
const mongoURI = 'YOUR_MONGODB_CONNECTION_STRING'; // Replace with your MongoDB connection string
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define MongoDB Schemas and Models
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
});

const enrollmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    progress: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

// User Registration Endpoint
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword });

    // Save the user to the database
    user.save()
        .then(() => res.json({ id: user._id, name, email }))
        .catch(err => res.status(400).json({ error: 'Email already exists.' }));
});

// User Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Return user data (excluding password)
    res.json({ id: user._id, name: user.name, email: user.email });
});

// Enroll in a Course Endpoint
app.post('/enroll', async (req, res) => {
    const { userId, courseId } = req.body;

    // Check if the user is already enrolled in the course
    const enrollment = await Enrollment.findOne({ userId, courseId });
    if (enrollment) {
        return res.status(400).json({ error: 'Already enrolled in this course.' });
    }

    // Create a new enrollment
    const newEnrollment = new Enrollment({ userId, courseId });

    // Save the enrollment to the database
    newEnrollment.save()
        .then(() => res.json({ id: newEnrollment._id, userId, courseId }))
        .catch(err => res.status(500).json({ error: 'Failed to enroll in the course.' }));
});

// Get User Courses Endpoint
app.get('/user/:id/courses', async (req, res) => {
    const userId = req.params.id;

    // Get enrolled courses for the user
    const enrollments = await Enrollment.find({ userId }).populate('courseId');
    const courses = enrollments.map(enrollment => ({
        id: enrollment.courseId._id,
        title: enrollment.courseId.title,
        description: enrollment.courseId.description,
        price: enrollment.courseId.price,
        progress: enrollment.progress,
    }));

    res.json(courses);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
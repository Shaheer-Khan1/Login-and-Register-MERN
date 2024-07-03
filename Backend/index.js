const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user'); // Import the User model
const { OAuth2Client } = require('google-auth-library');


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (replace with your own MongoDB connection string)
const uri = "mongodb+srv://khanshaheer6969:zmlHojKjfbBDvkGY@login.jsxbkeh.mongodb.net/?retryWrites=true&w=majority&appName=Login";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const bcrypt = require('bcrypt');

app.post('/api/signup', async (req, res) => {
  const { username, password, email } = req.body;
  console.log("Hi");
  try {
    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({ username, password: hashedPassword, email });
    
    // Save user to database
    await newUser.save();

    // Respond with success message or user data if needed
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Respond with success message or user data if needed
    res.status(200).json({ username: user.username });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


const CLIENT_ID = '570370558887-kmj9qkovuoovbsek3cmurcd20gt0k3ku.apps.googleusercontent.com'; // Replace with your actual client ID
const client = new OAuth2Client(CLIENT_ID);

// Route for handling Google login
app.post('/api/google-login', async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verify Google OAuth token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userid = payload['sub']; // Unique Google ID

    // Example: Create or authenticate user session here
    // Replace with your actual user session logic

    res.status(200).json({ message: 'Google login successful', user: payload });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(400).json({ error: 'Invalid Google token' });
  }
});



// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

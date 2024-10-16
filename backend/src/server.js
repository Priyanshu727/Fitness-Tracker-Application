const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('../config/db');
const authRoutes = require('../routes/authRoutes');
const workoutRoutes = require('../routes/workoutRoutes');
const goalRoutes = require('../routes/goalRoutes')
const adminRoutes=require('../routes/adminRoutes')
dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());


// routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 8084;

app.get("/", (req, res) => {
    res.send("Hello World!!!!!");
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err, 'Server Failed to start');
    } else {
        console.log(`Listening on port: http://localhost:${PORT}`);
    }
});
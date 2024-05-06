require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const {auth} = require('./middlewares/authMiddleware');
const upload = require('./utils/multerConfig');

const app = express();
const PORT = process.env.PORT || 3030;

//DB Configuration
mongoose.connect("mongodb://127.0.0.1:27017/AppleStore")
.then(() => console.log(`Successfully connected to the DB!`))
.catch((err) => console.log(`Error while connecting to the DB`, err));

// Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(auth);

// Routers
app.get('/', (req, res, next) => {
    res.send('Work!')
});

app.use(routes);

// File Upload
app.post('/api/upload', auth, upload.single('image'), (req, res) => {
    res.json({ message: 'File uploaded successfully' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDb = require('./config/db');
const userRouter = require('./router/userRouter');
const productRouter = require('./router/productRouter');
const upload = require('./utils/multerConfig');
const authenticateToken = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDb();

// Routers
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

// File Upload
app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
    res.json({ message: 'File uploaded successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Something went wrong');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const productRouter = require('./router')

app.use(express.json());
app.use(cors());

const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/AppleStore');

app.get('/', (req, res) => {
    res.send('Express App is Running');
});

const jwtSecret = 'secret_ecom';

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Data.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage:storage});

app.use('/images', express.static('upload/images'));
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})
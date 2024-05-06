const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        unique: true,
        trim: true,
        minLenght: [2, 'Username should be at least 2 characters long.'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    password: {
        type:String,
        required:true,
        minLenght: [8, 'Password should be at least 8 characters long.'],
        validate: {
            validator: function(value) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(value);
            },
            message: 'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit and one special character.'
        }
    },
    tel: {
        type: Number,
        required:true,
    },
    image: {
        type: String,
    },
    cartData: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    }
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
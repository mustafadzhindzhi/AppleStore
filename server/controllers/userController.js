const User = require('../models/User');
const jwt = require('jsonwebtoken');

const sendResponse = (res, data, statusCode = 200) => {
    res.status(statusCode).json(data);
}

const sendError = (res, message, statusCode = 400) => {
    res.status(statusCode).json({ success: false, errors: message })
};

const registerUser = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return sendError(res, 'Email already exists', 409);
        };

        const newUser = new User({ ...req.body });
        await newUser.save();
        sendResponse(res, { success: true, message: 'User registered' }, 201);
    } catch (err) {
        sendError(res, 'Server error', 500);
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return sendError(res, 'User not found', 404);
        }
        const isMatch = user.password === req.body.password;  // Correct the assignment (=) to comparison (===)
        if (!isMatch) {
            return sendError(res, 'Invalid email or password');
        }

        const payload = {user:{id: user.id}};
        const token = jwt.sign(payload, 'secret-ecom', {expiresIn:'2h'});
        sendResponse(res, {token});
    } catch(err) {
        sendError(res, "Server error", 500);
    }
};

const addProductToCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.cartData[req.body.itemId] = (user.cartData[req.body.itemId] || 0) + 1;
        await user.save();
        sendResponse(res, { message: "Added to cart" });
    } catch (error) {
        sendError(res, "Server error", 500);
    }
};

const removeFromCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.cartData[req.body.itemId] && user.cartData[req.body.itemId] > 0) {
            user.cartData[req.body.itemId]--;
            await user.save();
        }
        sendResponse(res, { message: "Removed from cart" });
    } catch (error) {
        sendError(res, "Server error", 500);
    }
};

const getCartData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        sendResponse(res, user.cartData);
    } catch (error) {
        sendError(res, "Server error", 500);
    }
};

module.exports = {
    registerUser,
    loginUser,
    addProductToCart,
    removeFromCart,
    getCartData
};
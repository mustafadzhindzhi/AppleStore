const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    addProductToCart,
    removeFromCart,
    getCartData
} = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/addtocart', auth, addProductToCart);
router.post('/removefromcart', auth, removeFromCart);
router.get('/getcart', auth, getCartData);

module.exports = router;

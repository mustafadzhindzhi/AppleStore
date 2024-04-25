const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    addProduct,
    removeProduct,
    getNewCollections,
    getPopularIn
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.post('/add', addProduct);
router.post('/remove', removeProduct);
router.get('/newcollections', getNewCollections);
// router.get('/popularin', getPopularIn);

module.exports = router;

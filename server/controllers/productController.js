const Product = require('../models/ProductModel');

const sendResponse = (res, data, statusCode = 200) => {
    res.status(statusCode).json(data);
};

const sendError = (res, error, statusCode = 500) => {
    res.status(statusCode).json({ error: error.message || 'An unexpected error occured' })
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        console.log('All products fetched');
        res.send(products);
    } catch (err) {
        sendError(res, err)
    }
};

const addProduct = async (req, res) => {
    try {
        const lastProduct = await Product.findOne().sort({ id: -1 }).select('id');
        const newId = lastProduct ? lastProduct.id + 1 : 1;

        const product = new Product({
            id: newId,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });
        await product.save();
        sendResponse(res, { success: true, name: req.body.name }, 201);
    } catch (err) {
        sendError(res, err);
    }
};

const removeProduct = async (req, res) => {
    try {
        const result = await Product.findOneAndDelete({ id: req.body.id });
        if (result) {
            console.log('Product removed');
            sendResponse(res, { success: true, name: req.body.name });
        } else {
            sendError(res, new Error('Product not found'), 404)
        }
    } catch (err) {
        sendError(res, err);
    }
};

const getNewCollections = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ data: -1 }).limit(8);
        console.log('New Collection Fetched');
        sendResponse(res, products)
    } catch (err) {
        sendError(res, err);
    }
}

module.exports = {
    getAllProducts,
    addProduct,
    removeProduct,
    getNewCollections,
};
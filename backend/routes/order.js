const router = require('express').Router();;
const { handleCheckout, handleGetAllOrders, handleGetOrderDetail, handleAddToCart } = require('../controllers/order');

router.get('/checkout', handleCheckout);

router.get('/allOrders', handleGetAllOrders);

router.get('/orderDetails/:order_id', handleGetOrderDetail);

router.post('/addtocart', handleAddToCart)

module.exports = router;

const router = require('express').Router();

const {getShipment, getPayment} = require('../../controllers/users.controller');

router.get('/shipment/:shipmentId', getShipment)
router.get('/payment/:paymentId', getPayment)

module.exports = router;
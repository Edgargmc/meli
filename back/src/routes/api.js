const router = require('express').Router();

router.use('/user', require('./api/user'));
router.use('/orders', require('./api/orders'))
router.use('/loyalty', require('./api/loyalty'))

module.exports = router;
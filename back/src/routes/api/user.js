const router = require('express').Router();

const { profile, getUserRestrictions, getUserPurchases} = require('../../controllers/users.controller');

router.get('/profile', profile);
router.get('/restrictions/:userId', getUserRestrictions)
router.get('/purchases/:userId', getUserPurchases)

module.exports = router;
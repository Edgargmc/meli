const router = require('express').Router();

const { getLevel} = require('../../controllers/users.controller');

router.get('/level/:levelId', getLevel)


module.exports = router;
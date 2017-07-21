let router = require('express').Router();
let api = require('./api');

router.get('/', api.get);
router.post('/', api.post);
router.delete('/', api.del);

module.exports = router;

var express = require('express');
var user_controller = require('../controllers/userController');

var router = express.Router();

router.get('/me', ensureAuthorized, user_controller.me);
router.post('/authenticate', user_controller.authenticate);
router.post('/register', user_controller.register);

function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}

module.exports = router;
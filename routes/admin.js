const express = require('express');
const router = express.Router();
const ensureAuth = require('../middleware/ensureAuth');

router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard', { user: req.user });
});

module.exports = router;

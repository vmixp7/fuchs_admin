const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');

router.get('/login', authCtrl.getLogin);
router.post('/login', authCtrl.postLogin);
router.get('/logout', authCtrl.logout);

router.get('/', (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) return res.redirect('/admin/dashboard');
    res.redirect('/login');
});

module.exports = router;

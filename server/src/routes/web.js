const router = require('express').Router();
const { signupPost, loginPost, verifyEmailAddress } = require('../controller/userController');

router.get('/health', (req, res) =>{
    try {
        res.status(200).send('health is working fine!');
    } catch (error) {
        res.status(500).json(error);
    }
})

// Auth Routes
router.post('/signup', signupPost);
router.post('/login', loginPost);
router.get('/verify', verifyEmailAddress);

module.exports = router;
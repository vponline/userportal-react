const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route GET api/auth
// @description Test route
// @access Public
router.get('/', auth, async (req, res) => {
    try {
        // Return user based on the req.user.id from the decoded token in users.js: req.user = decoded.user;
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route POST api/auth
// @description Authenticate user and get token
// @access Public
router.post('/', 
[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        // Check if user exists
        let user = await User.findOne({ email: email });
        
        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Wrong username or password' }] });
        }

        //Compare the inputted plain text password with the hashed one in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Wrong username or password' }] });
        }

        // Return JSON web token
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
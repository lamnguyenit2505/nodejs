const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/userModel');
const { registerValidator } = require('../validate/auth');
router.use(express.json())

router.post('/register', express.urlencoded({ extended: true }), async (request, response) => {
    const { error } = registerValidator(request.body);

    if (error) return response.status(422).send(error.details[0].message);

    // const checkEmailExist = await User.findOne({ email: request.body.email });

    // if (checkEmailExist) return response.status(422).send('Email is exist');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(request.body.password, salt);

    const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashPassword,
    });

    try {
        const newUser = await user.save();
        await response.redirect('/login');
    } catch (err) {
        response.status(400).send(err);
    }
});

router.post('/login', express.urlencoded({ extended: true }), async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(422).send('Email or Password is not correct');

    const checkPassword = await bcrypt.compare(req.body.password, user.password);

    if (!checkPassword) return res.status(422).send('Email or Password is not correct');
    
    return res.redirect('/user');
})

module.exports = router;
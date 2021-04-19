const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// MongoDB Model
const User = require('../models/User');

// VALIDATION Import
const { registerValidation, loginValidation } = require('../validation');

// Register User
router.post('/register', async (req, res) => {
	// Validate User
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Check if User already in database
    try {
	const emailExist = await User.findOne({ email: req.body.email });
	if(emailExist) return res.status(400).send('Email already exists');
    } catch(err) {
        console.log(err);
        return;
    }

	// Hash Passwords
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// Validated And Create User
	const user = new User({ 
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	});

	try{
		const savedUser = await user.save();
		res.json({ name: user.name, email: user.email });
	} catch (err) {
		res.json({ message: err });
	}
});

// Login User
router.post('/login', async(req, res) => {
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Check if Email Exists
	const user = await User.findOne({ email: req.body.email });
	if(!user) return res.status(400).send('Email Does Not Exist');

	const validPass = await bcrypt.compare(req.body.password, user.password)
	if(!validPass) return res.status(400).send('Invalid Password');

	// Create & Assign Token 
	const token = jwt.sign({ _id: user._id }, 'secret');
	res.json({'auth-token': token});
});


module.exports = router;
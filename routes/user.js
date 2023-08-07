const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');

async function signup(req, res) {

    // Validate request body using Joi
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        username: Joi.string().alphanum().required(),
        password: Joi.string().required(),
    });

    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).json({ error: result.error.details[0].message });
    }

    const body = req.body;

    try {
        // Check if email already exists
        const emailExists = await User.findOne({ where: { email: body.email } });
        if (emailExists) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        // Check if username already exists
        const usernameExists = await User.findOne({ where: { username: body.username } });
        if (usernameExists) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        // Create a new user in the database
        const newUser = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            username: body.username,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
}

async function login(req, res) {

    // Validate request body using Joi
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).json({ error: result.error.details[0].message });
    }

    const body = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email: body.email } });
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token and send it in the response
    const token = jwt.sign({ user_id: user.user_id }, 'lal10_secret');
    res.json({ token });
}

async function getUserDetails(req, res) {
    const user = await User.findByPk(req.user.user_id, { attributes: ['firstName', 'lastName', 'email', 'username'] });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
}

module.exports = {
    signup,
    login,
    getUserDetails,
};

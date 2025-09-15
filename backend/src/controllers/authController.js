const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

const signToken = (user) => {
	return jwt.sign({ sub: user._id.toString(), email: user.email }, config.jwtSecret, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
		const existing = await User.findOne({ email });
		if (existing) return res.status(409).json({ message: 'Email already in use' });
		const passwordHash = await bcrypt.hash(password, 10);
		const user = await User.create({ name, email, passwordHash });
		const token = signToken(user);
		return res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
	} catch (e) {
		return res.status(500).json({ message: 'Server error' });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) return res.status(401).json({ message: 'Invalid credentials' });
		const valid = await user.comparePassword(password);
		if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
		const token = signToken(user);
		return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
	} catch (e) {
		return res.status(500).json({ message: 'Server error' });
	}
};

exports.me = async (req, res) => {
	const user = req.user;
	return res.json({ id: user._id, name: user.name, email: user.email, favorites: user.favorites });
};



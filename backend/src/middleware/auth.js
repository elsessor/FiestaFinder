const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

async function auth(req, res, next) {
	const authHeader = req.headers.authorization || '';
	const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
	if (!token) return res.status(401).json({ message: 'Unauthorized' });
	try {
		const payload = jwt.verify(token, config.jwtSecret);
		req.user = await User.findById(payload.sub);
		if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
		next();
	} catch (e) {
		return res.status(401).json({ message: 'Invalid token' });
	}
}

module.exports = auth;



const User = require('../models/User');

exports.getFavorites = async (req, res) => {
	const user = await User.findById(req.user._id).populate('favorites');
	return res.json(user.favorites);
};

exports.toggleFavorite = async (req, res) => {
	const festivalId = req.params.festivalId;
	const user = await User.findById(req.user._id);
	const exists = user.favorites.find((f) => f.toString() === festivalId);
	if (exists) {
		user.favorites = user.favorites.filter((f) => f.toString() !== festivalId);
	} else {
		user.favorites.push(festivalId);
	}
	await user.save();
	return res.json({ favorites: user.favorites });
};



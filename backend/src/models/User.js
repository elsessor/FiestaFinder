const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true, trim: true },
		passwordHash: { type: String, required: true },
		favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Festival' }]
	},
	{ timestamps: true }
);

userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);



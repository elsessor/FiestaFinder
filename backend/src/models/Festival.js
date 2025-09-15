const mongoose = require('mongoose');

const festivalSchema = new mongoose.Schema(
	{
		slug: { type: String, unique: true, index: true },
		name: { type: String, required: true, trim: true },
		location: { type: String, required: true, trim: true },
		month: { type: String, required: true },
		description: { type: String, required: true },
		category: { type: String, enum: ['Religious', 'Cultural', 'Historical', 'Nature'], required: true },
		expectedAttendees: { type: Number },
		rating: { type: Number, default: 0 },
		year: { type: Number },
		imageUrl: { type: String },
		organizerName: { type: String },
		contactEmail: { type: String },
		website: { type: String }
	},
	{ timestamps: true }
);

festivalSchema.index({ name: 'text', location: 'text', description: 'text' });

function toSlug(str) {
	return String(str)
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

festivalSchema.pre('save', function (next) {
	if (!this.slug && this.name) {
		this.slug = toSlug(this.name);
	}
	next();
});

module.exports = mongoose.model('Festival', festivalSchema);



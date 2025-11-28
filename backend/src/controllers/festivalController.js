const Festival = require('../models/Festival');

exports.list = async (req, res) => {
	const { q, category, month } = req.query;
	const filter = {};
	if (category && category !== 'All Festivals') filter.category = category;
	if (month && month !== 'All Year') filter.month = month;
	if (q) {
		filter.$or = [
			{ name: { $regex: q, $options: 'i' } },
			{ location: { $regex: q, $options: 'i' } },
			{ description: { $regex: q, $options: 'i' } }
		];
	}
	const items = await Festival.find(filter).sort({ createdAt: -1 }).limit(500);
	return res.json(items);
};

exports.getById = async (req, res) => {
	const idOrSlug = req.params.id;
	const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? { _id: idOrSlug } : { slug: idOrSlug };
	const item = await Festival.findOne(query);
	if (!item) return res.status(404).json({ message: 'Not found' });
	return res.json(item);
};

exports.create = async (req, res) => {
	try {
		const data = req.body;
		const item = await Festival.create(data);
		return res.status(201).json(item);
	} catch (e) {
		return res.status(400).json({ message: e.message || 'Invalid data' });
	}
};

exports.update = async (req, res) => {
	const id = req.params.id;
	try {
		const data = req.body;
		const updated = await Festival.findByIdAndUpdate(id, data, { new: true });
		if (!updated) return res.status(404).json({ message: 'Not found' });
		return res.json(updated);
	} catch (e) {
		return res.status(400).json({ message: e.message || 'Invalid data' });
	}
};

exports.remove = async (req, res) => {
	const id = req.params.id;
	try {
		const deleted = await Festival.findByIdAndDelete(id);
		if (!deleted) return res.status(404).json({ message: 'Not found' });
		return res.json({ success: true });
	} catch (e) {
		return res.status(400).json({ message: e.message || 'Invalid request' });
	}
};



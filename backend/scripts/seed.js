const mongoose = require('mongoose');
const config = require('../src/config');
const Festival = require('../src/models/Festival');

const data = [
	{ name: 'Barlin Festival', location: 'Baao, Camarines Sur', month: 'January', description: 'Commemorates the birthday of Bishop Jorge I. Barlin.', category: 'Religious', expectedAttendees: 25000, rating: 4.2, year: 2025 },
	{ name: 'Tinagba Festival', location: 'Iriga City, Camarines Sur', month: 'February', description: 'Cultural and religious festival celebrating Our Lady of Lourdes.', category: 'Religious', expectedAttendees: 45000, rating: 4.6, year: 2025 },
	{ name: 'Karanowan Fish-tival', location: 'Bato, Camarines Sur', month: 'February', description: 'Celebrates the rich marine life of Lake Bato.', category: 'Nature', expectedAttendees: 20000, rating: 4.2, year: 2025 },
	{ name: 'Baybayon Festival', location: 'Sagñay, Camarines Sur', month: 'April', description: 'Highlights the beautiful beaches and coastal life of Sagñay.', category: 'Nature', expectedAttendees: 18000, rating: 4.1, year: 2025 },
	{ name: 'May Ilaoud Festival', location: 'Milaor, Camarines Sur', month: 'April', description: 'Commemorating the founding anniversary; St. Joseph the Worker.', category: 'Cultural', expectedAttendees: 15000, rating: 3.9, year: 2025 },
	{ name: 'Kaogma Festival', location: 'Pili, Camarines Sur', month: 'May', description: "Province's founding anniversary; parades and local delicacies.", category: 'Cultural', expectedAttendees: 75000, rating: 4.8, year: 2025 },
	{ name: 'Boa-Boahan Festival', location: 'Nabua, Camarines Sur', month: 'May', description: 'Cultural festival with pagan origins celebrating fertility and thanksgiving.', category: 'Cultural', expectedAttendees: 40000, rating: 4.5, year: 2025 },
	{ name: 'Peñafrancia Festival', location: 'Naga City, Camarines Sur', month: 'September', description: 'Largest festival in Bicol with a grand fluvial procession.', category: 'Religious', expectedAttendees: 200000, rating: 4.9, year: 2025 },
	{ name: 'Cimarrones Festival', location: 'Pili, Camarines Sur', month: 'October', description: 'Honors indigenous group; historical reenactments.', category: 'Historical', expectedAttendees: 50000, rating: 4.3, year: 2025 },
	{ name: 'Kamundagan Festival', location: 'Naga City, Camarines Sur', month: 'December', description: 'Month-long Christmas festival with markets and celebrations.', category: 'Religious', expectedAttendees: 60000, rating: 4.4, year: 2025 },
	{ name: 'Bamboo Festival', location: 'Bula, Camarines Sur', month: 'December', description: 'Celebrates bamboo crafts, music, and cuisine.', category: 'Cultural', expectedAttendees: 12000, rating: 4.0, year: 2025 }
];

async function run() {
	await mongoose.connect(config.mongodbUri);
	await Festival.deleteMany({});
	await Festival.insertMany(data);
	console.log('Seeded festivals:', data.length);
	await mongoose.disconnect();
}

run().catch((e) => {
	console.error(e);
	process.exit(1);
});



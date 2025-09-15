const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

// Friendly root for platform health checks (e.g., Render "Cannot GET /")
app.get('/', (_req, res) => {
	res.type('text/plain').send('Fiesta Finder API is running. Try GET /api/health');
});

app.get('/api/health', (_req, res) => {
	res.json({ status: 'ok' });
});

app.use('/api', routes);

async function start() {
	try {
		await mongoose.connect(config.mongodbUri);
		console.log('Connected to MongoDB');
		app.listen(config.port, () => {
			console.log(`API listening on http://localhost:${config.port}`);
		});
	} catch (err) {
		console.error('Failed to start server', err);
		process.exit(1);
	}
}

start();



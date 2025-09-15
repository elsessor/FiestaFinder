require('dotenv').config();

const getConfig = () => ({
	port: process.env.PORT || 4000,
	mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/fiesta_finder',
	jwtSecret: process.env.JWT_SECRET || 'replace_me'
});

module.exports = getConfig();



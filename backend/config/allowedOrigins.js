require('dotenv').config();

const allowedOrigins = [
    process.env.BASE_CLIENT_URL,
    process.env.BASE_SERVER_URL
]

module.exports = allowedOrigins
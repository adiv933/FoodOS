require('dotenv').config();

const allowedOrigins = [
    process.env.BASE_CLIENT_URL,
    process.env.BASE_SERVER_URL,
    'https://foodos.onrender.com',
    'https://food-os.vercel.app/',
    'https://food-h51g4opbf-clumsydog09s-projects.vercel.app',
    'https://food-os-clumsydog09s-projects.vercel.app',
    'https://food-os-git-main-clumsydog09s-projects.vercel.app',
    

]

module.exports = allowedOrigins
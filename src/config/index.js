// src/config/index.js


// onced again, I used dotenv to password protect my database password. In README file, require anyone that clones project to create a .env file of their own, with their own database host, username, and password. My .env file is in my .gitignore. I will provide my password to Brian or Code Louisville rep so they can see my data on the localhost:3030
module.exports = {
    appName: 'Anime Rater',
    port: 3030,
    db: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      dbName: 'anime-r',
    }
  };
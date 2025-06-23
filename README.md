URL Shortener Microservice
This is a simple backend service I built using Node.js, Express, and MongoDB. It generates short URLs for long links, supports custom shortcodes, and sets expiry times (defaults to 30 minutes if not provided).

Features
POST /shorturls for creating short links

Custom shortcode support

Expiry logic (user-defined or 30 mins default)


To-Run this:-
clone the repo
install dependicies npm install (or) npm i express,mongoose, dotenv and nanoid



set up .env file 
PORT=3000
MONGO_URI=mongodb://localhost:27017/urlshortener
BASE_URL=http://localhost:3000


and now start the server 
node server.js

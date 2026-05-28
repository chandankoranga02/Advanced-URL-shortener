const { OAuth2Client } = require('google-auth-library');

// Instantiate the client
const Oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET_KEY,
  "postmessage"
);

module.exports = {Oauth2Client};
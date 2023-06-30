//getting oauth tokens from autodesk server for our app and user

//get client id and secret from environment variables
require('dotenv').config();
const request = require('request');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
//get access token
var base64credentials = Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
//make request to autodesk server for access token
var options = {
    url: 'https://developer.api.autodesk.com/authentication/v2/token',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + base64credentials
    },
    form: {
        'grant_type': 'client_credentials',
        'scope': 'data:read'
    }
};
//print access token to console for testing purposes
request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
}
);


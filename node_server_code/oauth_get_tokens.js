//Turns out autodesk has a node module for this, but I didn't know that when I wrote this code
//All api calls are abstracted away in the autodesk forge node module

//getting oauth tokens from autodesk server for our app and user
//get client id and secret from environment variables
require('dotenv').config();
const axios = require('axios');
const request = require('request');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
//get access token
var base64credentials = Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
//make request to autodesk server for access token
axios({
    method: 'post',
    url: 'https://developer.api.autodesk.com/authentication/v2/token',
    data: {
        'grant_type': 'client_credentials',
        'scope': 'data:read'
    },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + base64credentials
    },
}).then(function (response) {
    console.log(response);
}).catch(function (error) {
    console.log(error);
});


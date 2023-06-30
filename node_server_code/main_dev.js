//Run express server
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const request = require('request');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//handle api requests
app.get('/api', (req, res) => {
    res.send('Hello World!');
}
);

//handle oauth requests for access token to ascess autodesk services
app.get('/oauth', (req, res) => {
    //get client id and secret from environment variables
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
    //request access token from autodesk server
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        //return access token to client side
        res.send(body);
    });
});

//serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
}
);



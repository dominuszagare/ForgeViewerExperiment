//Run express server
const express = require('express');
const axios = require('axios');
const app = express();
const { PORT } = require('./config.js');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Allow CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //allow all origins (not safe for production use - change to specific origin the URL of the server hosting the app )
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(require('./routes/auth.js'));
app.use(require('./routes/models.js'));

//handle api requests example (not used)
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

//handle oauth requests for access 2-legged token to ascess autodesk services
app.get('/oauth_2_leg', (req, res) => {

    console.log('oauth request recieved'); //<------- DEBUGGING
    //get client id and secret from environment variables
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
        res.send(response.data); //send response to client side
    }).catch(function (error) {
        console.log(error);
    });

});

//serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
}
);

//start server
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
}
);




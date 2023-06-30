# Get authentication tokens
Autodesk Forge uses the OAuth 2.0 protocol for user authentication and authorization. This guide shows how to get an access token and a refresh token.

Before you begin, you need to create a Forge app. See [Create an app](https://forge.autodesk.com/en/docs/oauth/v2/tutorials/create-app/).
This will require you to sign in to the [Forge Developer Portal](https://forge.autodesk.com/). If you don't have an Autodesk account, you can create one for free.
The app you create will have a client ID and a client secret. You will need these to get an access token and a refresh token.

## Two-legged authentication

The two-legged authentication workflow is used when the application needs to access its own data. For example, a web application that uses the Forge Viewer to display a model stored in the application's own data store.

Here is a example of how to get an access token and a refresh token using the [request](https://www.npmjs.com/package/request) package, when runing on a node.js server.

```JavaScript
//Run express server
const express = require('express');
const app = express();
const axios = require('axios'); //library for making http requests less verbose and easier to use
require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

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
        res.send(response.data); //send response data to client side
    }).catch(function (error) {
        console.log(error);
    });

});
```
Remember this API call as we will be using it on the client side to get the access token.
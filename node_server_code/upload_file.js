//get the access token from the server

//get client id and secret from environment variables
require('dotenv').config();
const request = require('request');
const https = require('https');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const BUCKET_KEY = 'my-bucket';
var base64credentials = Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64');
var AUTODESK_SERVICES_ACCESS_TOKEN = '';

getAccessTokenForAutodeskServices();
//getAccessTokenForAutodeskServicesHttp();

function getAccessTokenForAutodeskServices(){
    //make request to autodesk server for access token
    var options = {
        url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'grant_type': 'client_credentials',
            'scope': 'data:write data:read bucket:create bucket:delete'
        }
    };
    console.log('Requesting access token from autodesk server...'); //<------- DEBUGGING
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        AUTODESK_SERVICES_ACCESS_TOKEN = JSON.parse(body).access_token;
        console.log('Access token recieved: ' + AUTODESK_SERVICES_ACCESS_TOKEN); //<------- DEBUGGING
        //the token has been set tell the server to create a bucket
        createBucket();
        
    });
}

/*
function getAccessToken() {
    const querystring = require('querystring');
    const https = require('https')
    const postData = querystring.stringify({
        'grant_type': 'client_credentials'
    });

 const options = {
   "hostname": url,
   "method": "POST",
   "path" : "/oauth2/token",
   "port" : 443,
   "encoding": "utf8",
   "followRedirect": true,
   "headers": {
     "Authorization": "Basic <base64 encoded client_id:client_secret>",
     "Content-Type": 'application/x-www-form-urlencoded',
     "Content-Length": Buffer.byteLength(postData),
   },
   'muteHttpExceptions': true
 }
 const req = https.request(options, res => {
   console.log(`statusCode: ${res.statusCode}`)
   res.on('data', d => {
     process.stdout.write(d)
   })
 })
 req.on('error', error => {
   console.error(error)
 })
 req.write(postData);
 req.end()
}
*/

function createBucket(){
    //create bucket on autodesk server if it does not exist

    //check if bucket exists
    var options = {
        url: 'https://developer.api.autodesk.com/oss/v2/buckets/' + BUCKET_KEY + '/details',
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + AUTODESK_SERVICES_ACCESS_TOKEN }
    }; 
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        //if bucket does not exist create it
        if (JSON.parse(body).reason === 'Bucket not found.') {
            console.log('Bucket not found. Creating bucket...');
            var options = {
                url: 'https://developer.api.autodesk.com/oss/v2/buckets',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + AUTODESK_SERVICES_ACCESS_TOKEN,
                    'Content-Type': 'application/json'
                }, //<---- header of the request (cannot be seen in the request url)
                form: { 
                    'bucketKey': BUCKET_KEY, 
                    'policyKey': 'transient',
                    'access': 'full'
                } //<---- body of the request
            };
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                console.log(body);
            });
        }
        else {
            console.log('Bucket found.');
            //get the bucket details
            console.log(JSON.parse(body));
        }
    });
}

function obtainSignedURL(){
    
}
when runing the project for the first time use the powershell or bash to run the following commands
```bash
#install dependencies
npm install
#run the server 
npm run start
```

# TODO
- [x] create a basic website
- [x] create a basic server
- [x] setup webpack
- [x] setup docasaurus for documentation
- [] create github actions for code quality checks (eslint, prettier, sonarcloud)
- [] create API tests using postman for the autodesk API
- [] finish autodesk API postman collection and documentation
- [] create github actions for automatic deployment


# ---------------------- Oauth2 -------------------------
we use oauth2 to authenticate the user and get an access token to access the autodesk forge api.
To do this we need to create a forge app in the forge developer portal https://aps.autodesk.com/myapps/
the app will have a client id and a client secret which we will use to get the access token from the autodesk server
the client id and client secret are stored in the .env file which is not included in the git repo for security reasons so you will have to create it yourself in the root folder of the project
```
APS_CLIENT_ID=<your client id>
APS_CLIENT_SECRET=<your client secret>
APS_BUCKET=<your bucket name>
PORT=<optinal port>
```

# GETTING THE TOKEN FROM AUTODESK

BASE64_ENCODED_STRING_FROM_STEP_1 = Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64') #Javascript function to encode the string to base64
client id and client secret are from the forge app you created in the forge developer portal https://aps.autodesk.com/myapps/
curl -v 'https://developer.api.autodesk.com/authentication/v2/token'  -X 'POST'  -H 'Content-Type: application/x-www-form-urlencoded'  -H 'Accept: application/json'  -H 'Authorization: Basic <BASE64_ENCODED_STRING_FROM_STEP_1>'  -d 'grant_type=client_credentials'  -d 'scope=data:read'

curl -v 'https://developer.api.autodesk.com/authentication/v2/token'
     -X 'POST'
     -H 'Content-Type: application/x-www-form-urlencoded'
     -H 'Accept: application/json'
     -H 'Authorization: Basic RjZEbjh5cGVtMWo4UDZzVXo4SVgzcG1Tc09BOTlHVVQ6QVNOa3c4S3F6MXQwV1hISw=='  -d 'grant_type=authorization_code'
     -d 'code=DgK8pixFrHk8N_7tym_EVhDcHnaTV9SR6yoWmOyb'
     -d 'redirect_uri=http://localhost:8080/oauth/callback/'

# ----------------------- WEBPACK  -------------------------
 we use webpack to bundle all the js files into one file called bundle.js for faster loading times and better performance 

run webpack in dev mode will allow you to see the changes you make to the code in real time and will also create a source map for easier debugging
before running webpack make sure you have installed all the dependencies using npm install, that you have created the .env file with the client id and client secret and that you have run the server using `npm run start`
`npm run dev`
when you are ready to deploy don't forget change the mode from development to production in `webpack.config.js`

# ----------------------- NODEMON SERVER -------------------------
 the server is run using nodemon which will restart the server every time you make a change to the code
 server is run on port 3000 by default when developing locally
 all server code is in the `index.js` file in the root folder of the project
 server can be run using `npm run start` or `node index.js` or `nodemon index.js`

 # Procedure 
1. client requests the website from the server (hey server give me the website)
2. server sends the website to the client
3. client requests the token from the server (hey server give me the token so i can access the forge api)
4. server requests the token from the autodesk server (hey autodesk give me the token so i can give it to the client)
5. autodesk server sends the token to the server
6. server sends the token back to the client
7. client can now access the forge api using the token it got from the server


# ----------------------- PROJECT STRUCTURE -------------------------
The project is structured in the following way:
- Evrything related to the server is in the root folder of the project (index.js, package.json, webpack.config.js, .env, .gitignore, config.js)
- All the server endpoint are seperated into modules in the routes folder
- All the api calls to the autodesk forge api are in the services folder
- Ignore the node_server_code folder as it is not used


# --------------------- DOCUMENTING ---------------------
Check the Documentation folder for more information on how to use the project and how to document the project

# --------------------- POSTMAN AND API DOCUMNTATION ---------------------
Inside the documentation folder you will find a postman collection with all the api endpoints for the autodesk forge api and a postman environment file with the variables needed to run the collection. With this you can test out the api endpoints and see how they work. You can also use the collection to generate the documentation for the api endpoints using the postman-to-openapi tooling. Check the documentation folder for more information on how to do this.
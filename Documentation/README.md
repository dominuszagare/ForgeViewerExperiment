# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
or
$ npm install --global yarn
```

### Local Development

```
$ yarn start
or
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
or
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
#on windows in powershell
$ $env:GIT_USER = 'dominuszagare'; npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Env Variables

```
$ export GIT_USER=<Your GitHub username>
$ export USE_SSH=true
```
or 
```
set GIT_USER=<Your GitHub username>
set USE_SSH=true
```

### Documenting API endpoints

Using docusarus-plugin-openapi-docs we can create nice looking documentation for our api endpoints. To add a new endpoint to the documentation follow these steps:
1. Plugin instalation
    - install the plugin using `yarn add docusaurus-plugin-openapi-docs` or `npm install docusaurus-plugin-openapi-docs`
    - add the plugin to the `docusaurus.config.js` file
    ```javascript
    module.exports = {
        ...
        plugins: [
            [
            "docusaurus-plugin-openapi-docs",
            {
                id: "openapi",
                docsPluginId: "classic", // e.g. "classic" or the plugin-content-docs id
                config: {
                autodeskAPI: { // "petstore" is considered the <id> that you will reference in the CLI
                    specPath: "api_doc/autodeskApi.json", // path or URL to the OpenAPI spec
                    outputDir: "docs/autodeskAPI", // output directory for generated *.mdx and sidebar.js files
                    sidebarOptions: {
                    groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
                    categoryLinkSource: "tag",
                    },
                }
                }
            },
            ]
        ],
        ...
    }
    ```
    - install theme `yarn add docusaurus-theme-openapi-docs` or `npm install docusaurus-theme-openapi-docs`


### Geting openapi.json file postman collection

If you are using postman to test your api endpoints you can export the collection as a openapi.json file and use it to generate the documentation.
We can achieve this by using the [postman-to-openapi](https://joolfe.github.io/postman-to-openapi/) tooling.
1. install the tooling using `npm i postman-to-openapi -g`
2. export the collection from postman as a json file
3. use cli to convert the collection to openapi.json file `p2o ./path/to/PostmantoCollection.json -f ./path/to/result.yml -o ./path/to/options.json`
Example `p2o .\api_doc\AutodeskAPIs.postman_collection.json -f .\api_doc\autodeskApi.yml -o .\api_doc\autodeskApi.json`

Or 

run the script `node .\postman_to_openapi.js` to convert the collection to openapi.yml file

### generating api documentation
generate api documentation using `npm run docusaurus gen-api-docs autodeskAPI`
run `yarn build` or `npm run build` to build the documentation
run `yarn serve` or `npm run serve` to serve the documentation
navigate to `http://localhost:3000/docs/api/forge/oauth_2_leg` to view the documentation

var viewer;

var API_asces_token = ''
//call the server hosting the app for a assces token (the server will negotiate with autodesk server for the token and return it to the client)
//make the oauth GET request to the server on port (3000 for dev, 80 for production)
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/oauth'); 
xhr.onload = function() {
    if (xhr.status === 200) {
        var jsonData = JSON.parse(xhr.responseText);
        API_asces_token = jsonData.access_token;
        console.log('Token: ' + API_asces_token, "time_left: " + jsonData.expires_in); //<------- DEBUGGING
    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
console.log('Sending request for token'); //<------- DEBUGGING
xhr.send();

//geting assces to the viewer service from autodesk server 
//(after the server has negotiated with autodesk server for the token and returned it to the client side we can use it to get access to the viewer service)
var options = {
    env: 'AutodeskProduction2',
    api: 'streamingV2',  // for models uploaded to EMEA change this option to 'streamingV2_EU'
    getAccessToken: function(onTokenReady) {
        var token = API_asces_token; // token varible should be set by the server side script when loading the page(if its hard coded, it will be invalidated after 1 hour)
        var timeInSeconds = 3599; // Use value provided by APS Authentication (OAuth) API
        onTokenReady(token, timeInSeconds);
    }
};
Autodesk.Viewing.Initializer(options, function() {

    var htmlDiv = document.getElementById('forgeViewer');
    viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv);
    var startedCode = viewer.start();
    if (startedCode > 0) {
        console.error('Failed to create a Viewer: WebGL not supported.');
        return;
    }
    console.log('Initialization complete, loading a model next...');

    var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
    viewer.loadDocumentNode(viewerDocument, defaultModel);

    var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXktYnVja2V0L215LWF3ZXNvbWUtZm9yZ2UtZmlsZS5ydnQ'; //How do we get this id for our model?
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
    
    function onDocumentLoadSuccess(viewerDocument) {
        var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
        viewer.loadDocumentNode(viewerDocument, defaultModel);
    }
    
    function onDocumentLoadFailure() {
        console.error('Failed fetching Forge manifest');
    }


    
});




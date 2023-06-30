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


        //initilize viewer
        var viewer;
        var options = {
            env: 'AutodeskProduction2',
            api: 'streamingV2',  // for models uploaded to EMEA change this option to 'streamingV2_EU'
            documentId: './gltf/scene.gltf',
            getAccessToken: function(onTokenReady) {
                var token = API_asces_token;
                var timeInSeconds = 3600; // Use value provided by APS Authentication (OAuth) API
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
        });

        console.log('Initialization complete');

        //load model into viewer
        Autodesk.Viewing.Document.load(options.documentId, onDocumentLoadSuccess, onDocumentLoadFailure);

        function onDocumentLoadSuccess(viewerDocument) {
            var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
            viewer.loadDocumentNode(viewerDocument, defaultModel);
        }

        function onDocumentLoadFailure() {
            console.error('Failed fetching Forge manifest');
        }



    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
console.log('Sending request for token'); //<------- DEBUGGING
xhr.send();

//detect drag and drop event on the page and upload the file to the server
document.addEventListener('drop', function (event) {
    event.preventDefault();
    event.stopPropagation();
    //now upload the file to the server
    uploadFile(event.dataTransfer.files);
}
);

//prevent the browser from opening the file when its dropped on the page
document.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
}
);

//upload file to server
function uploadFile(files) {
    alert('TODO: Uploading file to server... File: ' + files[0].name);
}





var Messaging = (function(config, self) {
    var iframe;
    var url = config.origin;
    
    var initialize = function() {
        bindEvents();
    };

    // Bind Event Listeners
    // Attach listener to iframe
    var bindEvents = function() {
        iframe = document.getElementById('iframe');
        document.addEventListener('deviceready', onDeviceReady, false);
        // Announce that we have a camera.
        iframe.addEventListener("load", postMessage, false);
        // Add listener to ifame to allow billpay to send messages to parent cordova app
        window.addEventListener("message", onMessage, false);
    };

    // Handle message from iframe
    // If the message data equals camera and the message was recieved by the correct origin then
    // activate the camera and send the imageData back to iframe in a message.
    var onMessage = function(event) {
        console.log(event);
        if (event.origin === url) {
            if (event.data === "camera") {
                navigator.camera.getPicture(function(imageData) {
                    iframe.contentWindow.postMessage({
                        image: imageData
                    }, url);
                }, function(message) {
                    iframe.contentWindow.postMessage({
                        error: message
                    }, url);
                }, {
                    quality: 35,
                    destinationType: navigator.camera.DestinationType.DATA_URL,
                    targetWidth: 480,
                    targetHeight: 320
                });
            }
        }
    };
    //Send message to iframe informing iframe of camera availability
    var postMessage = function(event) {
        console.log(event);
        iframe.contentWindow.postMessage({
            cameraEnabled: navigator.camera != null && navigator.camera.getPicture != null
        }, url);
    };

    var onDeviceReady = function() {
    	console.log('deviceready');
    };

    self.initialize = initialize;
    return self;
}(Config, Messaging || {}));

Messaging.initialize();

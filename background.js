function onRequest(request, sender, sendResponse) {
 if (request.action == 'start')
   startExtension()
 else if (request.action == 'stop')
   stopExtension()
	console.log("REQUEST");
 sendResponse({});
};
chrome.extension.onRequest.addListener(onRequest);


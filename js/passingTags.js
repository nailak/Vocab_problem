$(document).ready(function(){

			  chrome.tabs.executeScript(null, {file: "contentscript.js"});
			  //document.getElementById("extensionpopupcontent").innerHTML = variableDefinedInContentScript;
			  // window.close();

		chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
			if (sender.tab){
				console.log(request.greeting);
				var tags = request.greeting.html();
				console.log(tags);
			    sendResponse({farewell: "goodbye"});
		  	}
		  else
		  	sendResponse({}); // snub them.
		});
});

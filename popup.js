/* 
 chrome.tabs.getSelected(null, function(tab) {
  chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });
});
*/

/*
$(document).on("ready", function() {
	console.log("NEW FILE");
	/*
	var element = [];

  	chrome.tabs.executeScript(null,
      	{code: "element = document.getElementsByClassName('name_text');"
  	});

	console.log(element);
	var tagTexts = element.children().text();
	//console.log(tagTexts);
	$('#displayText').html("HTMKL");
	console.log("executed");
	//console.log(tagTexts);
	$('#displayText').html(element);
	$('#displayText').html("NEW"); 

	chrome.extension.sendRequest({value: "hello"}, null);
	
});*/
		var thisMessage = "goodbye";
		 function click() {
			  chrome.tabs.executeScript(null, {file: "contentscript.js"});
			  document.getElementById("extensionpopupcontent").innerHTML = variableDefinedInContentScript;
			  // window.close();
		 }

		chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
			if (sender.tab){
				console.log(request.greeting);
			    sendResponse({farewell: thisMessage});
		  	}
		  else
		  	sendResponse({}); // snub them.
		});

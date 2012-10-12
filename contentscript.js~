
var myMessage = document.getElementsByClassName("name_text");


/* Some test code for parsing
 * //JSON.stringify(myMessage);
var myMessageString = $.parseJSON('[' + str + ']');
console.log("About to send...");
console.log(myMessage);
console.log("String form");
console.log(myMessageString);
*/

chrome.extension.sendRequest({greeting: myMessageString}, function(response) {
	console.log("Sent Request");
  console.log(response.farewell);
});


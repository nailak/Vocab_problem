
var myMessage = document.getElementsByClassName("name_text");
console.log(myMessage);

var str = "";
for (var i = 0; i < myMessage.length; i++){
	str += myMessage[i].innerHTML;	
}
console.log(str);
/* Some test code for parsing
 * //JSON.stringify(myMessage);
var myMessageString = $.parseJSON('[' + str + ']');
console.log("About to send...");
console.log(myMessage);
console.log("String form");
console.log(myMessageString);
*/
var myMessageString = "hello";
chrome.extension.sendRequest({greeting: str}, function(response) {
	console.log("Sent Request");
  console.log(response.farewell);
});


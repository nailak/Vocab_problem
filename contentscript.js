tagsHtml = document.getElementsByClassName('name_text');
var tags = {
	html: tagsHtml
};
console.log("Content script 1");
chrome.extension.sendRequest({action:'start'}, function(response) {
  console.log('Start action sent');  
});

console.log(document.getElementByClassName('name_text'));

console.log("Content script 2");
console.log(tagsHtml);

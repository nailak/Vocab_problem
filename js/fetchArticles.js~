var tagList = [];		// a list of Quora tags from the webpage
var getTags = []; 		// we're getting the articles for these tags
						// (same as tagList, but with duplicates removed
var tfTags = [];		// tags converted to Times Format
var quoraTags = [];
var requestNum = 0;
var divHid = 0;			// number of times hideAllDivs has been called
function returnMe(a){
	return a;
}

$(document).ready(function(){
	requestNum = 0; // Setting this variable ensures that we're only getting tags from the page once
	
	chrome.tabs.executeScript(null, {file: "contentscript.js"});

	// check if this is Quora by getting domain
	chrome.windows.getCurrent (function (win) {
		chrome.tabs.query (({'windowId':  chrome.windows.WINDOW_ID_CURRENT}), function(tabs){
			// Gets all the tabs
			for (var i=0; i<tabs.length; i++) {
				// finds the active tab and returns the domain
				if (tabs[i].active == true){
					var domain = tabs[i].url;
					break;
				}
			}
			domainCheck(domain); // calls domainCheck, passing it the variable domain
		});
	});

	// check if the page domain is Quora
	function domainCheck(domain){
		// if it is, proceed
		if (domain.substring(0, 20) == "http://www.quora.com"){
			console.log(domain);
			$("#ifNotQuora").hide();
			$("#ifQuora").show();
		}		
		// otherwise, this is not Quora. Show a link when the extension opens
		else {
			$("#ifNotQuora").show();
			$("#ifQuora").hide();
			// activate Go to Quora button
			$('#go-to-quora').click(function() {
					chrome.tabs.create({url: "http://www.quora.com/", active:true});
					console.log("new tab");
					window.close();
			});
		}
	}// end of domainCheck()

	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
		if (sender.tab && requestNum == 0){

			requestNum++;
			getTagsFromPage(callRD);

			// Gets the tags from the page and stores them in tagList
			function getTagsFromPage(callback){
					
					console.log(request.greeting);
					var tags = $(request.greeting);
					console.log(tags);
					var tagLength = tags.length;
					console.log(tagLength);

					for (var i = 0; i < tags.length; i++){
						var tagObj = $(tags[i]);
						tagList.push(tagObj.html());
					}
					
					callback();
			}
			
			// calls removeDuplicates with callback callConvertArticles
			function callRD(){
				removeDuplicates(callConvertArticles);
			}

			// Remove duplicate tags from tagList, store in getTags
			function removeDuplicates(callback){
				for (var i = 0; i < tagList.length; i++){
					// push first item onto list
					if (getTags.length == 0){
						getTags.push(tagList[i]);
					}
					else { // try to find a place for subsequent tags in getTags list.
						
						// for every item already in the list
						for (var j = 0; j < getTags.length; j++){
							// if it's already in the list, skip it
							if (getTags[j] == tagList[i]){
								break;
							}
							// otherwise, insert it before the element that is larger than it
							else if (getTags[j] > tagList[i]){
								getTags.splice(j, 0, tagList[i]);
								break;
							}
							// otherwise, if you've reached the end, add it there
							else if (j == getTags.length - 1){
								getTags.push(tagList[i]);
							}
							else; // otherwise keep searching
						} // end of for loop
					} // end of else
				}

				callback();		
			}
			
			// calls convertToTimesFormat with callback getArticlesNYTimes
			function callConvertArticles(){
				convertToTimesFormat(getArticlesNYTimes);
			}

			// Convert to Times API format and stores in quoraTags
			function convertToTimesFormat(callback){
				for (var i = getTags.length - 1; i >= 0; i--){
					// quoraTags is what we're passing to the NY Times API, formatted accordingly
					var tag = "title:" + getTags[i];
					
					quoraTags.push(tag);
				}
				callback();
			}

		} // end of if sender.tab && requestNum == 0
	  else
		sendResponse({}); // snub them.
	});

// called once all articles have been added to the page - this should be the last function called
// adds links to the page after articles have been loaded
function addLinks(){
		var currentUrls = [];
		chrome.windows.getCurrent (function (win) {
			chrome.tabs.getAllInWindow (win.id, function (tabs) {
				for (var i=0; i<tabs.length; i++) {
					var url = tabs[i].url;
					currentUrls.push(url);
				}
			});
		});

		// add function to article link
		$('.article_link').one("click", function() {

		var url = $(this).children().attr('href');
		var urlFound = false;
		for (var i = 0; i < currentUrls.length; i++){
			if (url == currentUrls[i]){
				urlFound = true;
				break;
			}
		}
		if (urlFound == false){
			chrome.tabs.create({url: url, active:false});
		}

		});
}

function getArticlesNYTimes(){

    //declare a variable that holds Quora array of tags
	console.log(quoraTags);

    //loop through tags and get articles related to each 
    for (var tagIndex in quoraTags){
        //put current tag in a variable
        tagname=quoraTags[tagIndex];
        
        //call function that will use API to search for this tag
        getArticles(tagname,tagIndex,hideDivsNow);
        tagIndex++; //move on to next tag in array
    }

	// Hide all the divs
    function HideAllDivs(){
		$('#Box').children().each(function(){
			$(this).hide();
		});
	}
	// hide all the divs now, show the first one by default
    function hideDivsNow(){
    	HideAllDivs();
		$('#div0').show();
		divHid++;

		// addLinks to page once all divs have been loaded
		if (divHid >= quoraTags.length){
			addLinks();
		}
    }

    function getArticles(currentTag,currentIndex,callback){ 
		// call proxy which uses NYTimes API to search articles related to the current tag
        $.getJSON('https://people.ischool.berkeley.edu/~nkhalawi/NYTproxy.php?tagname='+currentTag+'&callback=?', 
            function(json){ 
                
                articlesObj=$.parseJSON(json.xml);// parse returned object as JSON
                articles=articlesObj.results;//get the article objects as an array 
				tag = currentTag.substring(6, currentTag.length);//remove 'title:' from tag

				//if statement to identify 'active' tag as the one with index 0
				if (currentIndex == 0){//append first tag and set class to 'active' so its seleceted (css)
					$('#tagSearch').append('<li class="active"><a id="tag0" href="">'+tag+'</a></li>');
					$('#Box').append('<div id="div0" class="tagArticles"></div>');//container to later append articles
				}
				else{ //append tag without 'active' class so its not seleceted
					$('#tagSearch').append('<li ><a id="tag'+currentIndex +'" href="">'+tag+'</a></li>');
					$('#Box').append('<div id="div'+currentIndex+'" class="tagArticles"></div>');//container to later append articles
				}
                
			    //SETTING MARGIN-TOP OF "BOX" AS PER HEIGHT OF TABS
			    HeightOfTabs=$('#Tabs').height();
			    MarginOfBox=HeightOfTabs+42; //42px is top marign of Tabs itself.
			    MarginOfBox=MarginOfBox+'px';
			    $('#Box').css('margin-top',MarginOfBox);
			    
			    //error checkin if there are no articles returned from the API- print no articles found
                if(articlesObj.results.length == 0){
                	$('.tagArticles').last().append('<div id="" class="article"><h5>No articles found</h5></div>');
                }
                else{//append all articles for current tag
	                var x=0;//article counter
	                $(articles).each(function(){
	                    curArt=articles[x];
	                    $('.tagArticles').last().append('<div id="article'+x+'" class="article"><h5><div class="article_link" ><a href="'+curArt.url +'">' + curArt.title + '</a></div></h5><p><i>' + curArt.byline + ', Date:'+curArt.date+'</i></p><p>' + curArt.body + '...<span class="article_link" style="display:inline;" ><a href="'+curArt.url +'">[Read More]</a></span></p></div>');

	                    x++;//increment article counter
	                });
                }//end error checking
                
                callback();//hides all divs then shows div0 and sets tag0 to 'active'
            }
        );
    }
	}

});

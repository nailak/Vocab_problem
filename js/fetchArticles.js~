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
	requestNum = 0;
	// Get tagnames from the page
	
	chrome.tabs.executeScript(null, {file: "contentscript.js"});

	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
		if (sender.tab && requestNum == 0){

			console.log("[[[ STEP 1 ]]] Getting Quora Tags: Request number: " + requestNum);
			requestNum++;
			getTagsFromPage(TLTest);

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
			
			function TLTest(){
				removeDuplicates(logGetTags);
			}
			// Remove duplicate tags
			function removeDuplicates(callback){
				for (var i = 0; i < tagList.length; i++){

					if (getTags.length == 0){
						getTags.push(tagList[i]);
					}
					else { // Otherwise, try to find a place for tag in getTags list.
						
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
			
			// converts tags into a Times API-ready format, calls getArticlesNYTimes
			function logGetTags(){
				console.log("INSIDE LOG GET TAGS");
				convertToTimesFormat(getArticlesNYTimes);
				// callback(); This was where the callback used to be
				console.log("INSIDE LOG GET TAGS 2");
			}

			// Conver to format and send to Times when finished
			function convertToTimesFormat(callback){
				for (var i = getTags.length - 1; i >= 0; i--){
					// quoraTags is what we're passing to the NY Times API, formatted accordingly
					var tag = "title:" + getTags[i];
					
					//tag = tag.replace(" ", "%20");
					quoraTags.push(tag);
				}
				callback();
			}

		}
	  else
		sendResponse({}); // snub them.
	});
// opens link in new tab
function openLink(link){
	chrome.tabs.create({url: url, active:false});
}
// called at the end of getArticlesNYTimes
// adds links to the page after articles have been loaded
function addLinks(){
		console.log("iINSIDE ADD LINKS");
		var currentUrls = [];
		chrome.windows.getCurrent (function (win) {
			chrome.tabs.getAllInWindow (win.id, function (tabs) {
				for (var i=0; i<tabs.length; i++) {
					var url = tabs[i].url;
					currentUrls.push(url);
				}
			});
		});
		console.log("inside hide all divs");
		console.log(currentUrls);

		$('.article_link').one("click", function() {
			console.log("Article link clicked.");
			var url = $(this).children().attr('href');
			var urlFound = false;
			for (var i = 0; i < currentUrls.length; i++){
				if (url == currentUrls[i]){
					urlFound = true;
					break;
				}
			}
			if (urlFound == false){
				// currentUrls.push(url);
				chrome.tabs.create({url: url, active:false});
			}
		});
}

function getArticlesNYTimes(){

     console.log('[[[ STEP 2 ]]] Fetch NYT Articles..inside get articles NY Times ')
    //declare a variable that holds Quora array of tags
	console.log(quoraTags);

    //loop through tags and get articles related to each 
    for (var tagIndex in quoraTags){
        //put current tag in a variable
        tagname=quoraTags[tagIndex];
        console.log('Tag name: '+tagname);   
        
        // $('.searchContainer').append(getArticles(tagname,tagIndex));
        
        //call function that will use API to search for this tag
        getArticles(tagname,tagIndex,hideDivsNow);
        console.log('End tag loop round: '+tagIndex+' >> Calling JSON..');
        tagIndex++; //move on to next tag in array
    }
	console.log("Done with article TAGS");

    function HideAllDivs(){
		$('#Box').children().each(function(){
			$(this).hide();
		});
	}
    function hideDivsNow(){
    	HideAllDivs();
		$('#div0').show();
		console.log("Inside callback function hideDivsNow");
		divHid++;
		if (divHid >= quoraTags.length){
			addLinks();
		}
    }
    function getArticles(currentTag,currentIndex,callback){ 

        $.getJSON('https://people.ischool.berkeley.edu/~nkhalawi/NYTproxy.php?tagname='+currentTag+'&callback=?', 
            function(json){ 
                
                articlesObj=$.parseJSON(json.xml);// parse returned object as JSON
                articles=articlesObj.results;//get the article objects as an array 
				tag = currentTag.substring(6, currentTag.length);//remove 'title:' from tag
				console.log('Status: appending tag number '+currentIndex+' - '+tag);

				//if statement to identify 'active' tag as the one with index 0
				if (currentIndex == 0){//append first tag and set class to 'active' so its seleceted 
					$('#tagSearch').append('<li class="active"><a id="tag0" href="">'+tag+'</a></li>');
					$('#Box').append('<div id="div0" class="tagArticles"></div>');
				}
				else{ //append tag without 'active' class so its not seleceted
					$('#tagSearch').append('<li ><a id="tag'+currentIndex +'" href="">'+tag+'</a></li>');
					$('#Box').append('<div id="div'+currentIndex+'" class="tagArticles"></div>');
				}
			    console.log('Status: appending tag articles ..');
                
			    //SETTING MARGIN-TOP OF "BOX" AS PER HEIGHT OF TABS
			    HeightOfTabs=$('#Tabs').height();
			    MarginOfBox=HeightOfTabs+42; //42px is top marign of Tabs itself.
			    MarginOfBox=MarginOfBox+'px';
			    $('#Box').css('margin-top',MarginOfBox);
			    
			    //error checkin if there are no articles	
                if(articlesObj.results.length == 0){
                	console.log("THERE ARE NO ARTICLES");
                	$('.tagArticles').last().append('<div id="" class="article"><h5>No articles found</h5></div>');
                }
                else{console.log('ARTICLES FOUND')
	                //append all articles for current tag
	                var x=0;//article counter
	                $(articles).each(function(){
	                    curArt=articles[x];
	                    $('.tagArticles').last().append('<div id="article'+x+'" class="article"><h5><div class="article_link" ><a href="'+curArt.url +'">' + curArt.title + '</a></div></h5><p><i>' + curArt.byline + ', Date:'+curArt.date+'</i></p><p>' + curArt.body + '...<a href="'+curArt.url +'">[Read More]</a></p></div>');
						// var art = "#article" + x;
						/*$(art).one("click", function() {
							console.log("clicked");
							console.log(this);
							
							//var url = $(this);
							//.children().attr('href');
							//console.log(url);
							//var url = this.children().attr('href');
							//openLink(url);
						});*/ 
	                    x++;//increment article counter
	                });

		


                }//end error checking
                

                callback();//hides all divs then shows div0 and sets tag0 to 'active'
            }
        );
    }
	}

});

function returnUrl(url){
	return url;
}

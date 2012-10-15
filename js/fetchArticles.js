var tagList = [];		// a list of Quora tags from the webpage
var getTags = []; 		// we're getting the articles for these tags
						// (same as tagList, but with duplicates removed
var tfTags = [];		// tags converted to Times Format
var quoraTags = [];
var requestNum = 0;

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
						console.log("TAG OBJECT");
						console.log(tagObj);
						tagList.push(tagObj.html());
					}
					
					callback();
			}
			
			function TLTest(){
				console.log('TAG LIST IS: '+tagList);
				removeDuplicates(logGetTags);
			}

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
			
			function logGetTags(){
				console.log(getTags);
				convertToTimesFormat(getArticlesNYTimes);
			}

			function convertToTimesFormat(callback){
				for (var i = getTags.length - 1; i >= 0; i--){
					// quoraTags is what we're passing to the NY Times API, formatted accordingly
					var tag = "title:" + getTags[i];
					
					//tag = tag.replace(" ", "%20");
					quoraTags.push(tag);
					//console.log("TAG PRINTING ");
					//console.log(tag);
				}
				callback();
			}

		}
	  else
		sendResponse({}); // snub them.
	});
	

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

    function HideAllDivs(){
		$('#Box').children().each(function(){
			$(this).hide();
		});
	}
    function hideDivsNow(){
    	HideAllDivs();
		$('#div0').show();
		console.log("Inside callback function hideDivsNow")
    }
    function getArticles(currentTag,currentIndex,callback){ 

        $.getJSON('https://people.ischool.berkeley.edu/~nkhalawi/NYTproxy.php?tagname='+currentTag+'&callback=?', 
            function(json){ 
                // parse returned object as JSON
                articlesObj=$.parseJSON(json.xml);
                //get the article objects only ..as an array of article objects. 
                articles=articlesObj.results;
                console.log(currentIndex+') JSON FOR TAG=== :  '+currentTag);
                // $('#tagSearch').append('<div id="box'+currentIndex+'" class="searchContainer"><h1 class="tagName">'+currentTag+'</h1><div class="tagArticles"></div><div>');
                tag = currentTag;
		//tag = tag.substring(6,currentTag.length); // this line removes "title:" from "title:(nameoftag)"
				tag = currentTag.substring(6, currentTag.length);
				// $('#tagSearch').append('<li ><a href="" id="tag'+currentIndex +'">'+tag+'</a></li>');
				if (currentIndex == 0){
					$('#tagSearch').append('<li class="active"><a id="tag0" href="">'+tag+'</a></li>');
					$('#Box').append('<div id="div0" class="tagArticles"></div>');
					// $('#div0').show();
					console.log('WE ARE APPENDING INDEX ZERO TAG AND DIV')

				}
				else{
					console.log('WE ARE APPENDING REMIANING INDEX TAGS AND DIVS')
					$('#tagSearch').append('<li ><a id="tag'+currentIndex +'" href="">'+tag+'</a></li>');
					$('#Box').append('<div id="div'+currentIndex+'" class="tagArticles"></div>');

				}
			    
                console.log(articles);

                var x=0;//article counter
                // var articleID=1;

                // $('.tagArticles').append('=[Get - ');
                $(articles).each(function(){
                    curArt=articles[x];
                    // console.log(x+') ARTICLE : '+curArt.title);
                    $('.tagArticles').last().append('<div id="article'+x+'" class="article"><h5><a href="'+curArt.url +'">' + curArt.title + '</a></h5><p> By: ' + curArt.byline + ', Date:'+curArt.date+'</p><p>' + curArt.body + '...<a href="'+curArt.url +'">[Read More]</a></p></br></div>');
                    // $('#div').last().append('<div id="div'+x+'""><h3><a href="'+curArt.url +'">' + curArt.title + '</a></h3><p> By: ' + curArt.byline + ', Date:'+curArt.date+'</p><p>' + curArt.body + '</p></div>');
            
                    x++;//increment article counter
                });
                // $('.tagArticles').append('- End]=');
                callback();
            }
        );
    }
	}

});

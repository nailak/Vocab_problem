var tagList = [];
var getArticlesTags = [];
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


			console.log("Request number: " + requestNum);
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
				console.log(tagList);
			}

			function getTagsFromMessage(callback){
					for (var i = 0; i < tags.length; i++){
						
						var tagObj = $(tags[i]);
						console.log("TAG OBJECT");
						console.log(tagObj);

						var tag = returnMe(tagObj.html());
						
						if (tagList.length == 0){
							tagList.push(tag);
							console.log(tag + " ADDED AT BEGINNING");
							console.log(tagList);
						}
						else {
							// if the tag isn't already there, add it
							for (var j = 0; j < tagList.length; j++){
								// if the tag is already in the list
								if (tagList[j] == tag){
									// continue without adding
									console.log(tag + " NOT ADDED b/c of DUPLICATE");
									console.log(tagList);
									break;
								} 
								// otherwise, if the tagList item is larger, insert before
								else if (tagList[j] > tag){
									tagList = tagList.splice(j, 0, tag);
									console.log(tag + " ADDED");
									console.log(tagList);
									break;
								}
								// otherwise, if you've reached the end of the list, add it there
								else if (j == tagList.length - 1){
									tagList = tagList.push(tag);
									console.log(tag + " ADDED AT END");
									console.log(tagList);
									break;
								}
								else; // otherwise, go on and check next tagList item
							}
							
						}
						console.log(tagList);
						lastCallback();
					}

			}
			function lastCallback(){
						console.log(tagList);
						if (tagList.length > 0){
							getArticlesTags = returnMe(tagList);
							getArticlesNYTimes();
						}
			}

		}
	  else
		sendResponse({}); // snub them.
	});
	

function getArticlesNYTimes(){

     console.log('fetchArticles.js loaded.. ')
    //=============================TRY using proxy
    //declare a variable that holds Quora array of tags
    console.log("inside get articles NY Times");
	console.log(getArticlesTags);

	// for each article in getArticlesTags
	for (var i = 0; i < getArticlesTags.length; i++){
		quoraTags.push(getArticlesTags[i].prepend("title:"));
	}
	console.log(getArticlesTags);
	quoraTags = getArticlesTags;

    //var quoraTags=['title:ice','title:fire'];
    //loop through tags and get articles realted to each 
    for (var tagIndex in quoraTags){
        //put current tag in a variable
        tagname=quoraTags[tagIndex];
        console.log(tagname);   
        
        // $('.searchContainer').append(getArticles(tagname,tagIndex));
        
        //call function that will use API to search for this tag
        getArticles(tagname,tagIndex);
        console.log('END TAG FORLOOP ROUND '+tagIndex);
        tagIndex++; //move on to next tag in array
    }
    
    function getArticles(currentTag,currentIndex){ 

        $.getJSON('https://people.ischool.berkeley.edu/~nkhalawi/NYTproxy.php?tagname='+currentTag+'&callback=?', 
            function(json){ 
                // parse returned object as JSON
                articlesObj=$.parseJSON(json.xml);
                //get the article objects only ..as an array of article objects. 
                articles=articlesObj.results;
                console.log(currentIndex+') ===JSON FOR TAG=== :  '+currentTag);
                // $('#tagSearch').append('<div id="box'+currentIndex+'" class="searchContainer"><h1 class="tagName">'+currentTag+'</h1><div class="tagArticles"></div><div>');
                tag = currentTag;
		//tag = tag.substring(6,currentTag.length); // this line removes "title:" from "title:(nameoftag)"
		$('#tagSearch').append('<li><a href="" id="tag'+currentIndex +'">'+tag+'</a></li>');
                $('#Box').append('<div id="div'+currentIndex+'" class="tagArticles"></div>');
                
                console.log(articles);

                var x=0;//article counter
                // var articleID=1;

                // $('.tagArticles').append('=[Get - ');
                $(articles).each(function(){
                    curArt=articles[x];
                    // console.log(curArt);
                    console.log(x+') ARTICLE : '+curArt.title);
                    $('.tagArticles').last().append('<div id="article'+x+'" class="article"><a href="'+curArt.url +'">' + curArt.title + '</a><p> By: ' + curArt.byline + ', Date:'+curArt.date+'</p><p>' + curArt.body + '...<a href="'+curArt.url +'">[Read More]</a></p></br></div>');
                    // $('#div').last().append('<div id="div'+x+'""><h3><a href="'+curArt.url +'">' + curArt.title + '</a></h3><p> By: ' + curArt.byline + ', Date:'+curArt.date+'</p><p>' + curArt.body + '</p></div>');
            
                    x++;//increment article counter
                });
                // $('.tagArticles').append('- End]=');
                
            }
        );
    }
	}

});



$(document).ready(function(){
     console.log('fetchArticles.js loaded.. ')
    //=============================TRY using proxy
    //declare a variable that holds Quora array of tags
    var quoraTags=['title:ice','title:fire','title:mining'];
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

        $.getJSON('http://people.ischool.berkeley.edu/~nkhalawi/NYTproxy.php?tagname='+currentTag+'&callback=?', 
            function(json){ 
                // parse returned object as JSON
                articlesObj=$.parseJSON(json.xml);
                //get the article objects only ..as an array of article objects. 
                articles=articlesObj.results;
                console.log(currentIndex+') ===JSON FOR TAG=== :  '+currentTag);
                // $('#tagSearch').append('<div id="box'+currentIndex+'" class="searchContainer"><h1 class="tagName">'+currentTag+'</h1><div class="tagArticles"></div><div>');
                $('#tagSearch').append('<li><a href="" id="tag'+currentIndex +'">'+currentTag+'</a></li>');
                $('#Box').append('<div id="div'+currentIndex+'" class="tagArticles"></div>');
                
                console.log(articles);

                var x=0;//article counter
                // var articleID=1;

                // $('.tagArticles').append('=[Get - ');
                $(articles).each(function(){
                    curArt=articles[x];
                    // console.log(curArt);
                    console.log(x+') ARTICLE : '+curArt.title);
                    $('.tagArticles').last().append('<div id="article'+x+'" class="article"><h3><a href="'+curArt.url +'">' + curArt.title + '</a></h3><p> By: ' + curArt.byline + ', Date:'+curArt.date+'</p><p>' + curArt.body + '</p></div>');
                    // $('#div').last().append('<div id="div'+x+'""><h3><a href="'+curArt.url +'">' + curArt.title + '</a></h3><p> By: ' + curArt.byline + ', Date:'+curArt.date+'</p><p>' + curArt.body + '</p></div>');
            
                    x++;//increment article counter
                });
                // $('.tagArticles').append('- End]=');
                
            }
        );
    }

});

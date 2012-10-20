
$(document).ready(function()
	{
	function HideAllDivs(){
		$('#Box').children().each(function(){
			$(this).hide();
		});
	}

	$('#Tabs a').live('click', function() {
		//FIRST, CHANGE ALL TABS TO NORMAL
		$('.nav-pills li').each(function(){
			$(this).removeClass("active");
		});

		//NEXT, CHNAGE STYLE OF SELECTED TAB
		$(this).parent().addClass("active");
		//SHOW RESPECTIVE DIV IN "BOX"
		tagname=$(this).attr('id');

		//ABOVE COMMAND RETURNS CAPITALISED ID. THEREFORE NEED TO CONVERT TO LOWERCASE FOR MATCHING TEXT IN "REPLACE"
		tagname=tagname.toLowerCase();
		
		//HIDE ALL DIV
		HideAllDivs();
		
		//SHOW NEW DIV									 
		divname='#'+tagname.replace('tag','div');
		$(divname).show();


		return false;
	});
});


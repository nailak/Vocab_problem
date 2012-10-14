
$(document).ready(function()
	{
	//HIDE ALL DIVS
	HideAllDivs();
										 
	//SHOW FIRST DIV BY DEFAULT
	$('#div0').show();
	
	//CHANGE HEIGHT OF "BOX" AS PER CONTENT
	ChangeBoxHeight('#div0');
	
	function HideAllDivs(){
		$('#Box').children().each(function(){
			$(this).hide();
		});
	}
	
	function ChangeBoxHeight(divid){
		HeightOfDivContent=$(divid).height();
		$('#Box').css("height",HeightOfDivContent);
	}

	$('#Tabs a').live('click', function() {
	// $("#Tabs li").on('click', function(){
		//FIRST, CHANGE ALL TABS TO NORMAL
		$('.nav-pills li').each(function(){
			$(this).removeClass("active");
		});
		//NEXT, CHNAGE STYLE OF SELECTED TAB
		$(this).parent().addClass("active");
		console.log('changing tab');
		//SHOW RESPECTIVE DIV IN "BOX"
		// tagname=$(this).text();  //Naila: changed this so it gets ID instad of text
		tagname=$(this).attr('id');

		//ABOVE COMMAND RETURNS CAPITALISED ID. THEREFORE NEED TO CONVERT TO LOWERCASE FOR MATCHING TEXT IN "REPLACE"
		tagname=tagname.toLowerCase();
		console.log(tagname);

		//HIDE ALL DIV
		HideAllDivs();
		
		//SHOW NEW DIV									 
		divname='#'+tagname.replace('tag','div');
		console.log(divname);
		$(divname).show();
		
		//CHANGE HEIGHT OF "BOX" AS PER CONTENT
		ChangeBoxHeight(divname);

		return false;
	});
});



	$(document).ready(function()
	{
	//HIDE ALL DIVS
	HideAllDivs();
	
	
										 
	//SHOW FIRST DIV BY DEFAULT
	$('#div1').show();
	
	//CHANGE HEIGHT OF "BOX" AS PER CONTENT
	ChangeBoxHeight('#div1');
	
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
	
	//FIRST, CHANGE ALL TABS TO NORMAL
	
	$('.nav-pills li').each(function(){
									 $(this).removeClass("active");
									 });
	//NEXT, CHNAGE STYLE OF SELECTED TAB
	$(this).parent().addClass("active");
	
	//SHOW RESPECTIVE DIV IN "BOX"
	tagname=$(this).text();
	//ABOVE COMMAND RETURNS CAPITALISED ID. THEREFORE NEED TO CONVERT TO LOWERCASE FOR MATCHING TEXT IN "REPLACE"
	tagname=tagname.toLowerCase();
	
	//HIDE ALL DIV
	HideAllDivs();
	
	//SHOW NEW DIV									 
	divname='#'+tagname.replace('tag','div');
	$(divname).show();
	
	//CHANGE HEIGHT OF "BOX" AS PER CONTENT
	ChangeBoxHeight(divname);

	
	return false;
	});
	});


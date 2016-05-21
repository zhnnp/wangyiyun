// JavaScript Document

//custom get object function
function getObj(id){return document.getElementById(id);};


//play page init function
function init(){
	
	//hide this page function
	getObj("toMin").onclick=function(){
         window.parent.document.getElementById("playPage").style.display="none";
	}

}
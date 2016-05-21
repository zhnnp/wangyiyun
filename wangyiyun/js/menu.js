// JavaScript Document

function getObj(id){return document.getElementById(id);};

var menuScrollBarTimer;//scroll hide setInterval
var timeSum=0;//scroll hide sum time by setInterval

//menu page init functon
function init(){
	 
	 //hide this page's scroll bar
	 document.body.style.overflow='hidden';
	 
	 //去掉默认的contextmenu事件，否则会和右键事件同时出现。
     document.oncontextmenu = function(e){
               e.preventDefault();
      };
	 
	 
	 //menu btn onmouseout function,200ms later hide iframe's scroll bar in this
     document.body.onmouseout=function(){
	   menuScrollBarTimer=setInterval(function(){
	      if(timeSum==2){
	        clearInterval(menuScrollBarTimer);
		    document.body.style.overflow='hidden';
		    timeSum=0;
	      }
	      timeSum++;
	   },200)  
     }	
  
    //menu btn onmouseover function and show iframe scroll bar in this 
    document.body.onmouseover=function(){
	  clearInterval(menuScrollBarTimer);
	  document.body.style.overflow='';
    }	
  
    //add music list btn onclick function object
    getObj("createMusicList").onclick=function(){
	      parent.document.getElementById("musicAddFilterDiv").style.display="block";
		  parent.document.getElementById("musicAddBox").style.display="block";
		  
    }
	
	getObj("findMusic").onclick=function(){choiceMenu("findMusic")};
	getObj("localMusic").onclick=function(){choiceMenu("localMusic")};
	
	
  
}


//menu onclick function
function choiceMenu(id){
	var rightIframe=parent.document.getElementById("rightIframe");
    switch(id){
	   case "findmusic":
	      rightIframe.src="right.html"
	   break;
	   case "localMusic":
	      rightIframe.src="local_music.html"
	   break;
	   default:
	      rightIframe.src="right.html"
	   break;
    }	
}


//mouse right click function






















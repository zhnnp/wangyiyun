// JavaScript Document

//custom variable

var oldBgc;//old backgroundcolor
var b=true;


//custom get object function
function getObj(id){return document.getElementById(id);};


//local music list page init function
function init(){
	
	//init music list style and bind function for every div object
	changes();
	//choice button onclick function
	getObj("choice").onclick=function(){
	
	  	var musicList=getObj("musicLists").getElementsByTagName("div"); //get music list array
	    if(b){
		  for(var i=0;i<musicList.length;i++){
		     var liArray=musicList[i].getElementsByTagName("li"); //get every div object's li Array
		     liArray[0].style.display="block";
			
		  }
		  getObj("choiceTitle").innerHTML="Íê³É";
		  getObj("choiceTitle").style.color="red";
		  getObj("choiceImg").src="img/logo/choice.png"
		  b=false;
		}else{
		  for(var i=0;i<musicList.length;i++){
		     var liArray=musicList[i].getElementsByTagName("li"); //get every div object's li Array
		     liArray[0].style.display="none";
		  }
		  getObj("choiceTitle").innerHTML="Ñ¡Ôñ";
		  getObj("choiceTitle").style.color="#666666";
		  getObj("choiceImg").src="img/logo/music.png"
		  b=true;
		}
		
		
		
		
	}
	
	
function loadMusicList(){
	
	  var list=getObj("localAudio").getElementsByTagName("source")
	  
}
	
	
}

//music list double line change backgroundcolor 
function changes(){
	//get music list array
  	var musicList=getObj("musicLists").getElementsByTagName("div"); 
	
	//iterates over music list array
	for(var i=0;i<musicList.length;i++){
		
		//hide all checkbox
		var liArray=musicList[i].getElementsByTagName("li"); //get this div object's li Array
		liArray[0].style.display="none";
		
		//over write mouse right click function
		musicList[i].oncontextmenu =function(e){
			//if e.button==2,explain this click is right click
		    if(e.button==2) {
				mouseMenuBox.style.display="block";
				//if(event.clientX>450){ window.scrollTo((event.clientX+100,event.clientX+100);}
			    mouseMenuBox.style.left=event.clientX-10;
				mouseMenuBox.style.top=event.clientY-20;
	            mouseMenuBox.onclick=function(){this.style.display="none"}
				mouseMenuBox.onmouseout=function(){this.style.display="none"}
				mouseMenuBox.onmouseover=function(){this.style.display="block"}
			} 
		    return false;	  
	    }
		
		musicList[i].onclick=function(){
		     	mouseMenuBox.style.display="none";
		}
		
			 
		// if i remainder's 2 result is 0,change this object's backgroundcolor to #999999
		if(i%2==0){
		   	musicList[i].style.backgroundColor="#F5F5F5";
		}
		
		
		//every div obj onmouseover function bind
		musicList[i].onmouseover=function(){
			
			//record old backgroundcolor
		    oldBgc=this.style.backgroundColor;
			
			//change backgroundcolor
			this.style.backgroundColor="#C0C0C0"
		}
		//every div obj onmouseout function bind
		musicList[i].onmouseout=function(){
			//return old backgroundcolor
			this.style.backgroundColor=oldBgc;
		}
    }
}
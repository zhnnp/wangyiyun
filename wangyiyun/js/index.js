// JavaScript Document

//custom get object function
function getObj(id){return document.getElementById(id);};

//custom variable
var b=true;// now play list switch,default true
var rightModMoveTimer;//right message box move setInterval object
var playTypeBoxTimer;//play type message box show and hide setInterval object
var rightModleft=1366;//right message box width,default max value is 1366
var playPageBtn=true;//play page show and hide switch custom,default true
var playBtn=true;//play switch custom,default true

//index page init function
//init function star
function init(){
	
	//alert(getObj("musicLogoHover").offsetTop)
	//set page height equal to windows browser visible area 
	
	getObj("paly").style.height=window.innerHeight-66;
	getObj("mainRight").style.width=window.innerWidth*0.857;
	
	//now music playList box close and open onclick function
	getObj("musicListBtn").onclick=function(){
		var listBox=document.getElementById("musicListNow");
		
		if(b){
	      listBox.style.display="block";
		  b=false;
	    }else{
		  listBox.style.display="none";
		  b=true;
	    }
	}	
	
	//play page show onclick function
	getObj("musicLogoHover").onclick=function(){
	   if(playPageBtn){
	     getObj("playPage").style.display="block";
	     getObj("musicLogos").src="img/logo/tomin2.png";
		 playPageBtn=false;
	   }else{
		 getObj("playPage").style.display="none";
	     getObj("musicLogos").src="img/logo/music-logo-hover.png";
		 playPageBtn=true;
	   }
	}
	
	// play button onclick function
	getObj("play").onclick=function(){
		if(playBtn){
			getObj("playBgi").src="img/logo/play.png";
			playTypeChange("播放");
			audioPlay();
			playBtn=false;
		}else{
		    getObj("playBgi").src="img/logo/pause.png";
			playTypeChange("暂停");
			audioPause();
			playBtn=true;
		}	
	}
	
    //close add musicList box onclick function
	getObj("claerAddMusic").onclick=function(){
	  getObj("musicAddFilterDiv").style.display="none";
	  getObj("musicAddBox").style.display="none";
    }
	
	//change music play type onclick function
	getObj("playType").onclick=function(){
	  var imgSrc=this.src;
	  var srcNameStr=imgSrc.substring(imgSrc.lastIndexOf("/")+1);//get image path's name 
	  
	  if(srcNameStr=="play-list-suiji.png"){
		  this.src="img/logo/play-list-xunhuan.png";
		  playTypeChange("循环播放");
	  }else if(srcNameStr=="play-list-xunhuan.png"){
	      this.src="img/logo/play-list-danqu.png";
		  playTypeChange("单曲播放");
	  }else{
	      this.src="img/logo/play-list-suiji.png";
		  playTypeChange("随机播放");
	  }
	}
	
	//collect music button onclick function
	getObj("toLove").onclick=function(){
	  var imgSrc=this.src;
	  var srcStr=imgSrc.substring(imgSrc.lastIndexOf("/")+1);//get image path's name 
	  if(srcStr=="love.png"){
		  this.src="img/logo/love-hover.png";
		  playTypeChange("已收藏至我喜欢的音乐");
	  }else{
		  this.src="img/logo/love.png";  
		  playTypeChange("取消收藏");
	  }
	}

	//music logo onmouseover function
	getObj("musicLogo").onmouseover=function(){
	  getObj("musicLogoHover").style.display="block";
	}
	
	//music logo onmouseout function
	getObj("musicLogoHover").onmouseout=function(){
	  this.style.display="none";
	}
	
	//user set button onclick function
	getObj("userSet").onclick=function(){
		rightModMove("setBox");
	}
	//user header logo onclick function
	getObj("userInfoBtn").onclick=function(){
	  	rightModMove("userInfoBox");
	}
	
	//user info button onclick function
	getObj("userNameBtn").onclick=function(){
	  	rightModMove("userInfoBox");
	}
	
	//user message button onclick function
	getObj("userMessageBtn").onclick=function(){
	  	rightModMove("userMessageBox");
	}
	

	
	
}
//init function end


//play type message box change content and this hide/show function
function playTypeChange(str){
	var playTypeBox=getObj("playTypeBox");
	playTypeBox.style.display="block";
	playTypeBox.innerHTML=str;
	//if setInterval object's type not null,then clear setInterval object
	if(playTypeBoxTimer!=null){clearTimeout(playTypeBoxTimer);}
	//800ms end hide message box
	playTypeBoxTimer=setTimeout(
	  function(){playTypeBox.style.display="none";
	},800)
}

//right message box to move function by setInterval one
function rightModMove(id){
	var leftMod=getObj(id);
	if(leftMod.offsetLeft==1366){
      rightModMoveTimer=setInterval(function(){
		 leftMod.style.left=rightModleft;	
		 if(leftMod.offsetLeft==1076){
		   clearInterval(rightModMoveTimer);	
		 }
		 rightModleft-=10;							
      },5)
	}else if(leftMod.offsetLeft<1366){
	  rightModMoveTimer=setInterval(function(){
		 leftMod.style.left=rightModleft; 
		 if(leftMod.offsetLeft==1366){
		   clearInterval(rightModMoveTimer);   
		 }
		 rightModleft+=10;      
	  },5);
   }
}
var audioTimer;
function audioPause(){
	 var audio=getObj("localAudio");
	if(!audio.paused){
	   audio.pause();
	   clearInterval(audioTimer);
	   getObj("audioNowTime").style.color="#666666";
	   getObj("musicName").style.color="#666666";
	}
}

var nowTime;
var barWidth=1;
function audioPlay(){
	
	 var audio=getObj("localAudio");
	  audio.volume = 1;//设置audio初始音量
	 audio.play();
	 
	 var sumTime=(audio.duration/60).toFixed(2);
	// var timerAdd=sumTime;
	 
	 var audioScheduleBtn=getObj("audioScheduleBtn").offsetLeft;
	 getObj("audioNowTime").style.color="red";
	 var musicUrl=audio.currentSrc
	 var musicName=musicUrl.substring(musicUrl.lastIndexOf("/")+1,musicUrl.lastIndexOf("."));//get music name from music path
	 getObj("musicName").innerHTML=musicName;
	 getObj("musicName").style.color="red";
	 
	 audioTimer=setInterval(function(){
	   nowTime=(audio.currentTime/60).toFixed(2); 
	   getObj("audioNowTime").innerHTML=nowTime+"&nbsp;&nbsp;/&nbsp;&nbsp;"+sumTime;
	   audioScheduleBtn+=2;
	   barWidth+=2;
	   getObj("audioScheduleBtn").style.left=audioScheduleBtn;
	   getObj("barMove").style.width=barWidth+"px";
	   if(audio.ended){ 
	     audioPlay();
		 barWidth=1;
	     clearInterval(audioTimer);
	     getObj("audioNowTime").style.color="#666666";
		 getObj("audioScheduleBtn").style.left=220+"px";
		 getObj("barMove").style.width=1+"px";
		 audioScheduleBtn=getObj("audioScheduleBtn").offsetLeft;
	   }
	 },1000)
	 //(audio.currentTime/60).toFixed(2))播放时间进度
	 //audio.audioTracks.length);//播放列表
	
	 //(audio.duration/60-0.22).toFixed(2);//播放总时间
	 
	 
	
}


//audio object factory function
function createMusic(name,src,bgi){
    var audio=new Audio();
	audio.name=name;
	audio.src=src;
	audio.bgi=bgi;
	
	audio.play=function(){
	  if(audio.paused){
		  this.play(); 
	  }	
	}
	
	audio.puesr=function(){
	  if(!audio.paused){
		  this.pause();  
	  }	
	}
	
	audio.addVolume=function(){
		if(this.volume==0.9){
	      this.volume+=0.1;
		}else{
		  playTypeChange("已经最大声了！");
		}
	}
	
	audio.minusVolume=function(){
		if(this.volume==0.1){
	      this.volume-=0.1;
		}else{
		  playTypeChange("已经最小声了！");
		}
	}
	
	return music;
}

//audio play init function
function playInit(audio){
	audio.play();
	var audioScheduleBtn=getObj("audioScheduleBtn").offsetLeft;
	getObj("audioNowTime").style.color="red";
	var musicUrl=audio.currentSrc
	var musicName=musicUrl.substring(musicUrl.lastIndexOf("/")+1,musicUrl.lastIndexOf("."));//get music name from music path
	getObj("musicName").innerHTML=musicName;
	getObj("musicName").style.color="red";
	audioTimer=setInterval(function(){
	   nowTime=(audio.currentTime/60).toFixed(2); 
	   getObj("audioNowTime").innerHTML=nowTime+"&nbsp;&nbsp;/&nbsp;&nbsp;"+sumTime;
	   audioScheduleBtn+=2;
	   barWidth+=2;
	   getObj("audioScheduleBtn").style.left=audioScheduleBtn;
	   getObj("barMove").style.width=barWidth+"px";
	   if(audio.ended){ 
	     audioPlay();
		 barWidth=1;
	     clearInterval(audioTimer);
	     getObj("audioNowTime").style.color="#666666";
		 getObj("audioScheduleBtn").style.left=220+"px";
		 getObj("barMove").style.width=1+"px";
		 audioScheduleBtn=getObj("audioScheduleBtn").offsetLeft;
	   }
	 },1000)
}
















//var playOrder="shunxu";
//function playinit(){
//	 var audio=getObj("localAudio");
//	 var audioList=audio.getElementsByTagName("source");
//	 
//	 for( var i=0;i<audioList;i++){
//		 audioPlay(audioList[i]);
//		 if(audioList[i].currentTime==audioList[i].duration){
//		     if(playOrder=="shunxu"){
//			   i++;
//			   audioPlay(audioList[i])
//			 }
//		 }
//	 }
//}





















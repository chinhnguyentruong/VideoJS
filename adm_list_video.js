
var prefixBoxTop = 'admBoxList';		
var admHeightVideoBox = 400, admBoxListVideo, admPopUPController,isAdmOpenPopup=false,admVideoViewed,admVideoViewedCount,admTypeBoxVideo=1,admImageHostPlayer='http://adi.vcmedia.vn/adt/cpc/tvcads/files/others/player/pluginadmicro/images/',admIndexlist=0, admKeyVideoMain = '',admVideoHot , isShowPopup = false, currentIndexList = 0, admIndexVideoHot=0, checkScroll = false, swiper; 

if(!jQuery().swiper) {
	
}

if (typeof jQuery.ui != 'undefined') {
	
}else{
	var script_ui = document.createElement('script');
	script_ui.type = "text/javascript";
	script_ui.src = "http://adi.admicro.vn/adt/cpc/tvcads/files/others/demolistvideo/js/jquery-ui.min_.js";
	document.getElementsByTagName('head')[0].appendChild(script_ui);
}

/*if (typeof dataPlayer != 'undefined'){
	admBoxListVideo = new admBoxListVideo();
	if(typeof(admBoxListVideo.admVideoPlayerSetData) == 'function') 
		admBoxListVideo.admVideoPlayerSetData(dataPlayer);	  
}else{
	loadScript("http://admicro1.vcmedia.vn/js_tvc/tvcboxvideo_27975.js", function(){
		admBoxListVideo = new admBoxListVideo();
		if(typeof(admBoxListVideo.admVideoPlayerSetData) == 'function') 
			admBoxListVideo.admVideoPlayerSetData(dataPlayer);	  
	});	
}*/


function loadScript(url, callback){
    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function(){
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function admBoxListVideo() {
	var admBoxTopController, isAdmBoxTop = false,
		admImageHostPlayer = 'http://adi.vcmedia.vn/adt/cpc/tvcads/files/others/player/pluginadmicro/images/',   		
		isDrawBoxTop = false,
		screenWidth = screen.width,
		videoWidth = Math.round(screenWidth * 0.5),
		videoHeight = Math.round(videoWidth * 9 / 16);	
		
	this.onEndedVideo = function(id)	
	{						
		if(!isShowPopup){
									
			var idNext = $('#'+'li'+id).next().find('a').attr('id');
			var indexNext = idNext.charAt(idNext.length-1);
			showItemActive(idNext);
			if(parseInt(indexNext) % 4 == 0) swiper.slideNext(function(){}, 1000);		
				
		}
	}	
	
	this.onHandlerPause = function(){		
		checkScroll = true;
	}
		
		
	this.admVideoPlayerSetData = function (data) {		
		if(detectmob() == true) return;
		var _data = admCheckDataWriteInBox(data);		
		if(_data == 0) return;
		admDataVideo.setData(_data);			
		
		var displayadmBoxListVideo = function(){				
			var admViewedList = admCookiesVideo.getCookie("admViewedList");				
			var indexList = 'list'+admDataVideo.Id;
			if(admViewedList != ''){
				admViewedList = $.parseJSON(admViewedList);
			}
			
			Array.prototype.move = function (old_index, new_index) {
				if (new_index >= this.length) {
					var k = new_index - this.length;
					while ((k--) + 1) {
						this.push(undefined);
					}
				}
				this.splice(new_index, 0, this.splice(old_index, 1)[0]);
				return this;
			};			
			
			if(admViewedList == '' || (typeof admViewedList[indexList] === "undefined")){				
				if(admDataVideo.listvideo.length > 0){
					writeBox(admDataVideo.listvideo[0]);
					admVideoHot = admDataVideo.listvideo[0];
					admIndexVideoHot = 0;
				}
			}else{							
				for(var i=0; i < admDataVideo.listvideo.length;i++){
					var id = admDataVideo.listvideo[i].KeyVideo;													
					if(typeof admViewedList[indexList][id] === "undefined"){
						admDataVideo.listvideo.move(0,i);
						
						writeBox(admDataVideo.listvideo[0]);
						admVideoHot = admDataVideo.listvideo[0];
						admIndexVideoHot = 0;
						break;
					}					
				}
			}
			admKeyVideoMain = admVideoHot.KeyVideo;						
			
			admPopUPController = new function(){
				this.onMidpointReady=function(id){							
					var admViewedList = admCookiesVideo.getCookie("admViewedList");
						
					if(admViewedList == ''){
						var admViewedList = {};						
					}else{
						admViewedList = $.parseJSON(admViewedList);
					}						
					var indexList = 'list'+admDataVideo.Id;					
					if(typeof admViewedList[indexList] === "undefined"){						
						admViewedList[indexList] = {};									
					}						
					admViewedList[indexList][id] = true;					
					admCookiesVideo.setCookie('admViewedList',JSON.stringify(admViewedList),7);
				};
				this.onEndedVideo=function(id){							
					
				};
				this.onReadyVideo=function(id){							
					
				};
			}						
			
			$(document).ready(function () {
				swiper = new Swiper('#'+prefixBoxTop+'liVideo .'+prefixBoxTop+'wrapper-slide', {
						nextButton: '.'+prefixBoxTop+'kvli-next',
						prevButton: '.'+prefixBoxTop+'kvli-prev',
						slidesPerView: 'auto',
						slidesPerGroup: 4,
						direction: 'vertical'
					});					
				window.setTimeout(function(){
					if(typeof(admaddEventListener)=='function'){
						admaddEventListener(window, "scroll", function () { admCheckPlayerBoxInViewPort(); });
					}else{ 
						if(window.addEventListener)
							window.addEventListener('scroll', admCheckPlayerBoxInViewPort, false);   
						else if (window.attachEvent)
							window.attachEvent('onscroll', admCheckPlayerBoxInViewPort);
					}
					admCheckPlayerBoxInViewPort();
				},2000);
					
					
				$('.'+prefixBoxTop+'kvli-ava').click(function(){
					var id = $(this).attr('id');
					showItemActive(id);
					return false;
				});	
				
				$('.'+prefixBoxTop+'player').hover(function(){
					$('#'+prefixBoxTop+'over_videobox').show();					
				},function(){
					$('#'+prefixBoxTop+'over_videobox').hide();
				});
				
				var admOverVideobox = document.getElementById(prefixBoxTop+'over_videobox');
				admOverVideobox.style.display='none';
				admOverVideobox.addEventListener('click',function(){	
					//var old_element = document.getElementById(prefixBoxTop+"main_iframe_container");
					//var new_element = old_element.cloneNode(true);
					//old_element.parentNode.replaceChild(new_element, old_element);
					
					admPopUPController = new admLoadPopupBoxVideo();									
					admPopUPController.showCurrentVideo(currentIndexList);																				
				});																										
			});
		}					
			
		displayadmBoxListVideo();	
	}

	var showItemActive = function(id){
		$('.'+prefixBoxTop+'kvli-ava').find('span').hide();
		$('.'+prefixBoxTop+'kvli-ava').parent('li').css('background-color','');
		$('.'+prefixBoxTop+'kvli').removeClass('playing');
		$('#'+id).find('span').show();
		$('#'+id).parent('li').css('background-color','#444444');
		$('#'+id).parent('li').addClass('playing');
		url = $('#'+id).attr('href');
		$('#'+prefixBoxTop+'itemMainVideo').attr('src',url);																
		playVideoTop(prefixBoxTop+'itemMainVideo');			
		currentIndexList = $('#'+id).closest('.'+prefixBoxTop+'kvli-ava').index('.'+prefixBoxTop+'kvli-ava'); 					
		admVideoHot = admDataVideo.listvideo[currentIndexList];		
		
	}	

	var writeBox = function (admMainVideo) {		
		var dataList = admDataVideo.listvideo;
		var boxTitle = admDataVideo.title;
		if(dataList.length < 2) return;									
		
		var main_video_html = '<iframe style="display:block;z-index:1;position:absolute;" id="'+prefixBoxTop+'itemMainVideo" width="100%" height="100%" src="http://vcplayer.vcmedia.vn/1.1/?_site=kenh14&vid='+admMainVideo.FileName+'&tag=0&_listsuggest=no&_info='+admMainVideo.KeyVideo+'&volume=0&boxVideoID='+admMainVideo.KeyVideo+'&isListBox=true" frameborder="0" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen="" oallowfullscreen="" msallowfullscreen="" scrolling="no"></iframe>';
		
		var right_list_html = '';
		var classActive = '';
		for(var i=0; i<dataList.length;i++){
			classActive = (i == 0) ? 'playing' : '';
			var display = (i == 0) ? 'block' : 'none';
			right_list_html += '<li id="li'+dataList[i].KeyVideo+'" class="'+prefixBoxTop+'kvli swiper-slide '+classActive+'"><a id="'+prefixBoxTop+'avaitem'+i+'" class="'+prefixBoxTop+'kvli-ava" onclick="return false;" href="http://vcplayer.vcmedia.vn/1.1/?_site=kenh14&vid='+dataList[i].FileName+'&tag=0&autoplay=true&filler=false&_listsuggest=no&_info='+dataList[i].KeyVideo+'&volume=0.8&boxVideoID='+dataList[i].KeyVideo+'&isListBox=true">'	
										+'<span style="display:'+display+'">Đang xem</span>'
										+'<img src="'+dataList[i].Thumb+'">'
										+'<h5>'+dataList[i].Title+'</h5>'					
									+'</a></li>'
		}
		
		var html = 	
					'<h3 class="'+prefixBoxTop+'knswli-object-title"><span class="sprite i-video"></span>Video</h3>'
					+'<div id="'+prefixBoxTop+'liVideo">'                        
						+'<div class="'+prefixBoxTop+'player">'
							+'<div id="'+prefixBoxTop+'main_iframe_container">'
							+'<div id="'+prefixBoxTop+'main_iframe_wrap">'
							+'<div style="height:100%;">'+main_video_html+'</div>'
							+'</div>'
							+'</div>'
							+'<div id="'+prefixBoxTop+'over_videobox"><div>Nhấp vào để xem thêm</div></div>'
											
						+'</div>'
						+'<div class="petrol '+prefixBoxTop+'knswlivr-wrapper">'		 
							+'<div class="'+prefixBoxTop+'wrapper-slide">'
								+'<ul class="contentPlaylist swiper-wrapper">'				
								+right_list_html								
								+'</ul>'                               
							+'</div>'  
							+'<div class="'+prefixBoxTop+'kvli-prev swiper-button-disabled"></div>'
							+'<div class="'+prefixBoxTop+'kvli-next"></div>'	
						+'</div>'	
						+'<br clear="all"/>'	
					+'</div>';
		
		var container = document.getElementById('adm_list_player_box');
		container.innerHTML = html;
	}
	
	var addBoxStyle = new function () {
		var boxcss = '<style>'			
			+ '.'+prefixBoxTop+'knswli-object-title {font-family: SFD-Heavy;font-size: 30px;margin-left: 60px;margin-bottom: 35px;letter-spacing: 2px;color: #ffffff;text-transform: uppercase;position: relative;}'
			+'.'+prefixBoxTop+'knswli-object-title .i-video {background-position: -440px 0px;width: 44px;height: 30px;position: absolute;top: 0;left: -60px;display: block;}'
			+'.'+prefixBoxTop+'knswli-object-title .sprite {background: url("'+admImageHostPlayer+'sprite-k14_1462876116.png");background-repeat: no-repeat;background-position: -440px 0px;}'
			+ '.'+prefixBoxTop+'player{width:70%;height:'+admHeightVideoBox+'px;display:inline-block;position:relative;overflow:hidden;}'
			+ '#'+prefixBoxTop+'main_iframe_container{position:relative;height:100%;width:100%;}'
			+ '#'+prefixBoxTop+'over_videobox{width: 100%; height: '+(admHeightVideoBox - 50)+'px; position: absolute; z-index: 2; display: none; top:0px;}'
			+ '#'+prefixBoxTop+'over_videobox>div{background-color:rgba(0, 0, 0, 0.5);padding:4px 10px; border-radius:6px;color: #fff;cursor: pointer;display: inline-block;font-family: helvetica, arial, sans-serif;font-size: 14px;font-weight: bold;height: auto;left: 50%;line-height: 18px;position: absolute;text-shadow: 0 0 3px rgba(20, 22, 26, .7);top: auto;transform: translateX(-50%);-webkit-user-select: none;width: auto;z-index: 1;bottom:50px;}'
			+ '.'+prefixBoxTop+'wrapper-slide{padding-left:10px;height: 395px;overflow: hidden;}'
			+ '.'+prefixBoxTop+'knswlivr-wrapper{display:inline-block;width:30%;position:relative;}'
			+ '.'+prefixBoxTop+'kvli{padding: 10px;border-bottom: 1px solid #343434;height: 78px;width: auto;}'
			+ '.'+prefixBoxTop+'kvli-ava{width:100%;height:100%;display:inline-block;margin-right: 10px;position: relative;text-decoration:none;color:#cecece;font-size:14px;line-height: 16px;font-family: SFD-Medium !important;}'
			+ '.'+prefixBoxTop+'kvli-ava img{width: 140px;height: 80px;display: block;float:left;padding-right: 5px;}'
			+ '.'+prefixBoxTop+'kvli-ava span{position: absolute;top: 44%;left: 17%;}'
			+ '.'+prefixBoxTop+'kvli.playing, .'+prefixBoxTop+'kvli:hover {background: #444444;}'
			+ '.'+prefixBoxTop+'kvli-next, .'+prefixBoxTop+'kvli-prev {position: absolute;top: -36px;width: 50px;height: 26px;cursor: pointer;background: #777;border-radius: 3px;-webkit-border-radius: 3px;-moz-border-radius: 3px;transition: background 0.3s;-webkit-transition: background 0.3s;-moz-transition: background 0.3s;}'
			+ '.'+prefixBoxTop+'kvli-next:before, .'+prefixBoxTop+'kvli-prev:before {display: block;width: 0;height: 0;border-left: 6px solid transparent;border-right: 6px solid transparent;border-top: 6px solid #222;content: "";position: absolute;top: 50%;left: 50%;margin-top: -3px;margin-left: -6px;}'
			+ '.'+prefixBoxTop+'kvli-prev:before {border-bottom: 6px solid #222;border-top: none;}'
			+ '.'+prefixBoxTop+'kvli-next {right: 0;}'
			+ '.'+prefixBoxTop+'kvli-prev {right: 58px;}'
			+ '.'+prefixBoxTop+'knswlivr-wrapper .swiper-button-disabled {opacity: 0.2;}'					
			+ '</style>';
		$("head").append(boxcss);
	}
	
	var getScrollTop = function(){
		var ScrollTop = document.body.scrollTop;
		if (ScrollTop == 0)          
		{
			if (window.pageYOffset)
				ScrollTop = window.pageYOffset;
			else
				ScrollTop = (document.body.parentElement) ?     document.body.parentElement.scrollTop : 0;
		}
		return ScrollTop;
	}
	
	var admCheckPlayerBoxInViewPort = function()
	{	
		if(checkScroll) return;
		
		var getTopScroll = getScrollTop() + windowPrototype.wdHeight();
		var getTopVideo = parseInt(getElementTop('adm_list_player_box'))+admHeightVideoBox;
			
		if(getTopScroll> getTopVideo && getTopScroll - getTopVideo < windowPrototype.wdHeight() - admHeightVideoBox )
		{			
			playVideo(prefixBoxTop+'itemMainVideo');			
			//inview		
		}else{
			//outview						
			pauseVideo(prefixBoxTop+'itemMainVideo');
		}	
	}
	
	var playVideoTop = function(idIframe){			
		/*var mele = document.getElementById(idIframe);					
		var params = 'admReviceMessageToPlayer("play")'; 				
		setTimeout(function(){
			if(mele){	
				mele.contentWindow.postMessage(params, '*');
			}
		},1500);*/					
	}	
	
	var playVideo = function(idIframe){			
		var mele = document.getElementById(idIframe);					
		var params = 'admReviceMessageToPlayer("playvideo")'; 						
		if(mele){	
			mele.contentWindow.postMessage(params, '*');
		}					
	}

	var pauseVideo = function(idIframe){			
		var mele = document.getElementById(idIframe);					
		var params = 'admReviceMessageToPlayer("pausevideo")'; 						
		if(mele){	
			mele.contentWindow.postMessage(params, '*');
		}					
	}	
	
	var admCheckDataWriteInBox = function (data) {
		var randItem = function (sourceArray) {
			var j = Math.floor(Math.random() * (sourceArray.length));
			return sourceArray[j];
		}
		
		var shuffle = function(sourceArray) {
			for (var i = 0; i < sourceArray.length - 1; i++) {			
				var j = i + Math.floor(Math.random() * (sourceArray.length - i));			
				var temp = sourceArray[j];			
				sourceArray[j] = sourceArray[i];
				sourceArray[i] = temp;			
			}				
			return sourceArray;
		}

		var getListInMode = function (mode) {
			dataVideo = shuffle(data[mode].Data);			
			for(var i =0;i<dataVideo.length;i++)
			{							
				if(checkListVideoHot(dataVideo[i]) == true){					
					return dataVideo[i];
				}
			}	
			return 0;			
			//var dataVideo = randItem(data[mode].Data);
			//return dataVideo;
		}

		var mode = 1;
		var _data = getListInMode(mode);
		return _data;
	}
	
	var checkListVideoHot = function(data){	
	
		var admViewedList = admCookiesVideo.getCookie("admViewedList");		
		var indexList = 'list'+data.Id;
		data = data.SuggestVideoList;
		if(admViewedList != ''){		
			admViewedList = $.parseJSON(admViewedList);
			if(typeof admViewedList[indexList] === "undefined" &&  data.length>3){	
				return true;
			}				
			countVideo = 0;		
			var i;

			for (i in admViewedList[indexList]) {
				if (admViewedList[indexList].hasOwnProperty(i)) {
					countVideo++;
				}
			}			
			
			if(countVideo >= data.length || data.length<4)
				return false;
			else 
				return true;
		}else{
			if(data.length >3)return true;
			else return false;
		}
	}
	
	var detectmob = function() { 
		if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
		){
		return true;
		 }
		else {
			return false;
		}
	}
		
}

var admDataVideo = new function (data) {
	this.setData = function (data) {
		for (i in data) {
			switch (i) {
				case "TitleToCallAction":
					this.title = data.TitleToCallAction;
					break;
				case "VideoHot":
					this.videohot = data.VideoHot;
					break;
				case "ShortVideo":
					this.videoshort = data.ShortVideo;
					break;
				case "SuggestVideoList":
					this.listvideo = data.SuggestVideoList;
					break;
				case "MoreVideoList":
					this.morelist = data.MoreVideoList;
					break;
				case "IntroVideoList":
					this.introlist = data.IntroVideoList;
					break;
				default:
					this[i] = data[i];
			}
		}
	}
}

var admCookiesVideo = new function()
{
	this.getCookie = function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	this.setCookie = function(cname,cvalue,exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires=" + d.toGMTString();		
		document.cookie = cname+"="+(cvalue)+"; "+expires+"; path=/";
	}
}

if (window.addEventListener) {
	window.addEventListener('message', function (e) {
		checkMessageFromPlayer(e);
	}, false);
} else if (window.attachEvent) {
	window.attachEvent('onmessage', function (e) {
		checkMessageFromPlayer(e);
	});
}

function checkMessageFromPlayer(e)
{
	if(e.origin.indexOf('vcplayer.vcmedia.vn') !=-1 && typeof(e.data)=='string'){				
		if(e.data.indexOf('admPopUPController')!= -1 || e.data.indexOf('admBoxListVideo')!= -1){
			try{
				eval(e.data);
			}catch(e){};	
		};
	}
	
}

function admSendTrackingPlayer(a){
	var vid= prefixBoxTop+"itemMainVideo";
	var mele = document.getElementById(vid);
	var params = 'admReviceMessageToPlayer("'+a+'")';	
	mele.contentWindow.postMessage(params, '*');
}

function admLoadPopupBoxVideo(){	
	if(!isAdmOpenPopup){
		isAdmOpenPopup = true;
		admSendTrackingPlayer("sendlog");//tracking open pop up
		admVideoViewed += ','+admDataVideo.Id; 			
	}

	var doc = document;
	doc.getElementsByTagName('body')[0].style.overflow = 'hidden';
	var t = this;	
	var popupInBox = 'popupInList', prefixBox = 'popupVideoList', prefixComment = 'popupCommentBox';		
	var screenWidth = screen.width;
	var videoWidth = Math.round(screenWidth * 0.5);	
	var videoHeight = Math.round(videoWidth * 9 / 16);
	var scrolling = false, handlerScroll = false, lastScrollTop = 0;				
	var numberVideos = admDataVideo.listvideo.length, section_number = 0, section_height_scrollbar = 0; // section height - scrollbar
	var section_height = $(window).height(); // chiều cao section
	var append = false, animationIn = false, fullScreen = false, deltaHeight = screen.height * 1/10, detalButtonScroll = 105;	
	var admListVideos = [], admListVideosId = [], admIndexCurrentVideo = 0, admCurrentHeight = 0, loadedVideo = {}, admOffsetTop = 0, admOffsetLeft = 0;	
	if(admTypeBoxVideo == 1){ 
		append = true;
		loadedVideo[prefixBoxTop+'itemMainVideo'] = true; 	
		section_number = numberVideos;
	}else{
		section_number = numberVideos;
	}
	isShowPopup = true;
	
	var draw = function(){			
		var css 
        	='.'+prefixBox+'{width:100px;height:auto;position:relative;border:1px solid #c30e2e;padding:0;margin:auto 10px;float:left;}'
        	+'.'+prefixBox+'bgtop{width:100%;height:auto;clear:both;}'
			+'.'+popupInBox+'animated {-webkit-animation-duration: .35s;animation-duration: .35s;-webkit-animation-fill-mode: both;animation-fill-mode: both;}'
			+'@-webkit-keyframes zoomIn {from {opacity: 0;-webkit-transform: scale3d(.3, .3, .3);transform: scale3d(.3, .3, .3);}50% {opacity: 1;}}'
			+'@keyframes zoomIn {from {opacity: 0;-webkit-transform: scale3d(.3, .3, .3);transform: scale3d(.3, .3, .3);}50% {opacity: 1;}}'
			+'.zoomIn {-webkit-animation-name: zoomIn;animation-name: zoomIn;}'
			+'@-webkit-keyframes zoomOut {from {opacity: 1;}50% {opacity: 0;-webkit-transform: scale3d(.3, .3, .3);transform: scale3d(.3, .3, .3);}to {opacity: 0;}}'
			+'@keyframes zoomOut {from {opacity: 1;}50% {opacity: 0;-webkit-transform: scale3d(.3, .3, .3);transform: scale3d(.3, .3, .3);}to {opacity: 0;}}'				
			+'@keyframes bounceEnd {0%   {transform: translateY(0);-webkit-transform: translateY(0);-ms-transform: translateY(0);}0%   {transform: translateY(-120px);-webkit-transform: translateY(-120px);-ms-transform: translateY(-120px);}100% {transform: translateY(0);-webkit-transform: translateY(0);-ms-transform: translateY(0);} }'
			+'.'+popupInBox+'zoomOut {-webkit-animation-name: zoomOut;animation-name: zoomOut;}'	
			+'#'+prefixBoxTop+'main_iframe_container::-webkit-scrollbar{-webkit-appearance: none !important};'	
        	+'@-moz-keyframes spinLoading { 100% { -moz-transform: rotate(360deg); } }@-webkit-keyframes spinLoading { 100% { -webkit-transform: rotate(360deg); } }@keyframes spinLoading { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }';

        addStyle(css, prefixBox);		

		popup();

	};
	var time, timePop;
	this.onLoadHandler = function(a){			
		
	}
	
	this.onReadyVideo = function(a){			
		loadedVideo[admListVideosId[a]] = true; 				
		playVideo(admListVideosId[a]);			
	}
	
	this.onMidpointReady = function(id)
	{				
		var admViewedList = admCookiesVideo.getCookie("admViewedList");
						
		if(admViewedList == ''){
			var admViewedList = {};						
		}else{
			admViewedList = $.parseJSON(admViewedList);
		}						
		var indexList = 'list'+admDataVideo.Id;					
		if(typeof admViewedList[indexList] === "undefined"){						
			admViewedList[indexList] = {};									
		}						
		admViewedList[indexList][id] = true;					
		admCookiesVideo.setCookie('admViewedList',JSON.stringify(admViewedList),7);		
		
	}
	
	this.onEndedVideo = function(id)
	{						
		if(append == false && id == admKeyVideoMain) return;						
		if(isShowPopup == true)
			scrollRun(-1);
		
	}
	var drawVideo = function(number){			
		var videoHtml = '',url = '',title = '',image_loading = '', line='';
		for(var k=0; k< number;k++){	
			if(k == 0) line = '<div class="'+popupInBox+'line" id="line"><span>Video khác</span></div>';
			else line = '';
			if(admDataVideo.listvideo[k].KeyVideo != admVideoHot.KeyVideo){				
				title = admDataVideo.listvideo[k].Title;
				url = "http://vcplayer.vcmedia.vn/1.1/?_site=kenh14&vid="+admDataVideo.listvideo[k].FileName+"&_info="+admDataVideo.listvideo[k].KeyVideo+"&tag=0";				
				htmliFrame = '';				
				thumb = 'background-image:url('+admDataVideo.listvideo[k].Thumb+');background-size:cover;';		
				image_loading = '<div class="adm-loading-image" style="'+thumb+'width:100%;height:100%;position:absolute;z-index:3;"><img class="'+popupInBox+'loading-image" src="'+admImageHostPlayer+'loading_1_1460453022.png" alt="" width="80" height="80"/></div>';				
				video = drawHtmlVideo(k,title,image_loading,htmliFrame,line);			
				videoHtml += video;
			}else{						
				htmliFrame = '';
				thumb = 'background-image:url('+admVideoHot.Thumb+');background-size:cover;';
				title = '';
				if(admVideoHot.Title) title = admVideoHot.Title;
				admListVideosId[admVideoHot.KeyVideo] = popupInBox+'itemVideo'+k;									
				image_loading = '<div class="adm-loading-image" style="'+thumb+'width:100%;height:100%;position:absolute;z-index:3;"><img class="'+popupInBox+'loading-image" src="'+admImageHostPlayer+'loading_1_1460453022.png" alt="" width="80" height="80"/></div>';
				
				var videoMain = drawHtmlVideo(k,title,image_loading,htmliFrame,line);
				videoHtml += videoMain;
			}
						
		} 
		
		return videoHtml;
	}	

	var drawHtmlVideo = function(index,title,image_loading,htmliFrame,line){
		var video = 
				'<div class="'+popupInBox+'item" id="'+popupInBox+'itemWrap'+index+'">'
				+	'<div class="'+popupInBox+'vtitle"><span>'+(index+1)+'</span>'+title+'</div>'
				+'<div>'				
				+'<div id="'+popupInBox+'wrap_iframe'+index+'" style="position:relative;width:'+videoWidth+'px;height:'+videoHeight+'px;">'+image_loading+htmliFrame+'</div>'
				+'<div style="height:70px;"></div>'
				+'<div class="'+popupInBox+'action">'
				+'<div class="'+popupInBox+'view"><span>1000 Lượt xem</span></div>'
				+'<div class="'+popupInBox+'social">'
				+'<div class="'+popupInBox+'sp-detail-share '+popupInBox+'social-button"><span>980 Chia sẻ</span></div>'	
				+'<div class="'+popupInBox+'sp-detail-comment '+popupInBox+'social-button">'								
				+'' 
				+'</div></div></div>'
				+'</div>'+line
				+'</div>';
		return video;		
	}	
		
	var stopVideo = function(idIframe){		
		if(idIframe == '') return;
		var mele = document.getElementById(idIframe);
		if(mele){
			var params = 'admReviceMessageToPlayer("pause")';  
			mele.contentWindow.postMessage(params, '*');
		}
	}
	
	var playVideo = function(idIframe){			
		if(loadedVideo[idIframe] != true) return;			
		if((idIframe == popupInBox+'itemVideo'+ admIndexCurrentVideo || idIframe == prefixBoxTop+'itemMainVideo') && isShowPopup == true && animationIn == false)
		{								
			var mele = document.getElementById(idIframe);				
			var params = 'admReviceMessageToPlayer("play")';  			
			mele.contentWindow.postMessage(params, '*');
			var pr = document.getElementById(idIframe).parentNode;				
			setTimeout(function(){
				amdloanding = pr.getElementsByClassName('adm-loading-image')[0];
				if (typeof(amdloanding) != 'undefined' && amdloanding != null)
				{
					amdloanding.style.display = 'none';
				}
					
			},200);
		}			
	}	
	
	this.showCurrentVideo =  function(number){			
		$('.'+popupInBox+'wrapperitem').removeClass('bource');		
		if(number == admIndexCurrentVideo) return;				
		if( number >= 0 && number < admListVideos.length){										
			clearTimeout(time);			
			if(admListVideos[admIndexCurrentVideo].find('iframe').length != 0){						
				stopVideo(popupInBox+'itemVideo'+admIndexCurrentVideo);			
			}
			if(number > admIndexCurrentVideo){			
				for(var j = admIndexCurrentVideo; j < number; j++){
					admCurrentHeight -= admListVideos[j].height(); 
				}
			}else{			
				for(var j = admIndexCurrentVideo - 1; j >= number; j--){
					admCurrentHeight += admListVideos[j].height(); 
				}
			}				
			admIndexCurrentVideo = number;	   
			scrolling = true;
			$('.'+popupInBox+'item').find('iframe').removeClass(popupInBox+'viframeactive');			
			$('.'+popupInBox+'item').css('opacity','0.2');
		   		   
		   if(admListVideos[admIndexCurrentVideo].find('iframe').length == 0){
				if(append == true && admIndexCurrentVideo == currentIndexList){
					admListVideos[admIndexCurrentVideo].find('iframe').css('display','block');					
				}
			}else{
				admListVideos[admIndexCurrentVideo].find('iframe').css('display','block');				
			}									
			$( "#"+popupInBox+"content").removeClass(popupInBox+'content-drag-scroll');
			$('#'+popupInBox+'content').css('transform', 'translate3d(0px, '+admCurrentHeight+'px, 0px)');	
			$('#'+popupInBox+'content').css('-ms-transform', 'translate3d(0px, '+admCurrentHeight+'px, 0px)');	
			$('#'+popupInBox+'content').css('-webkit-transform', 'translate3d(0px, '+admCurrentHeight+'px, 0px)');	
				
			admListVideos[admIndexCurrentVideo].css('opacity','1');
			admListVideos[admIndexCurrentVideo].find('iframe').addClass(popupInBox+'viframeactive');							
						
			$("#"+popupInBox+"drag").find(".section-label").html('<span class="curr-item">'+(admIndexCurrentVideo+1) + '</span><i></i><span class="total-items">' + (section_number) + '</span>');
			$("#"+popupInBox+"drag").css("top", admIndexCurrentVideo * section_height_scrollbar);	
			$('#'+popupInBox+'content').one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(event) {	
				$( "#"+popupInBox+"content").addClass(popupInBox+'content-drag-scroll');
				if(admIndexCurrentVideo != 0)
					document.getElementById(prefixBoxTop+'main_iframe_container').scrollTop = 1;	
				if(admIndexCurrentVideo == currentIndexList){					
					$('#'+popupInBox+'wrap_iframe'+currentIndexList).find('.adm-loading-image').hide();	
					$('#'+prefixBoxTop+'main_iframe_wrap').addClass(popupInBox+'stylemain');				
					$('#'+prefixBoxTop+'main_iframe_wrap').css({ top: admOffsetTop, left: admOffsetLeft });	
					$('#'+prefixBoxTop+'main_iframe_wrap').show();					
				}	
				
				if(admListVideos[admIndexCurrentVideo].find('iframe').length == 0){
					if(admIndexCurrentVideo != currentIndexList){										
						loadiFrame(admIndexCurrentVideo,admIndexCurrentVideo);
					}
				}													
				scrolling = false;		
			});		
	  }
		
	 }
	 
	var checkIframeLoaded = function(idIframe)
	{				
		  var admIframeLoad = document.getElementById(idIframe);
		  var admIframeDoc = admIframeLoad.contentDocument || admIframeLoad.contentWindow.document;
		   if (  admIframeDoc.readyState  == 'complete' ) {        
				admIframeLoad.contentWindow.onload = function(){   
			};
			// The loading is complete
			setTimeout(function(){
				playVideo(idIframe);	
			},1000);	
			return;
		}
		window.setTimeout('checkIframeLoaded();', 100);
	}
	 
	
	var popup = function(){
		var c = this;
		var prefix = popupInBox;		
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");			
		 var css
			= '.'+prefix+'{font-family:arial;background-color:#111;width:100%;height:100%;padding-top:70px;box-sizing: border-box;z-index:700;z-index:999999999;opacity:0;transition:1s}'
			+ '.'+prefix+'header{background: #fff;height: 50px;border-bottom:1px solid #333333;position:fixed;top:0px;width:100%;z-index:999}'
			+ '.'+prefix+'mtitle{margin:0 auto;width:'+videoWidth+'px;height: 100%;text-align:left;line-height: 50px;font-size: 20px;}'			
			+ '.'+prefix+'mtitle div{background: url('+admImageHostPlayer+'icon_title.png) 0px center no-repeat;background-size: 40px;padding-left: 50px;position: absolute;display: inline-block;max-width: '+(videoWidth - 55)+'px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}'
			+ '.'+prefix+'vtitle{font-size: 20px;color:#fffefe;text-align:left;padding: 30px 0px 12px 0px;line-height: 32px;}'			
			+ '.'+prefix+'vtitle span{background:url('+admImageHostPlayer+'nvideo.png) center center no-repeat;font-family:SFD-Heavy;font-size:22px;width:33px;height:33px;display:inline-block;margin-right:16px;color:#000;text-align:center;}'
			+ '.'+prefix+'content{width:'+videoWidth+'px;margin:0 auto;height: 100%;position: relative;}'
			+ '.'+prefix+'content-drag-scroll{-webkit-transition: all 1000ms ease !important;-moz-transition: all 1000ms ease !important;transition: all 1000ms ease !important;-webkit-transform-origin: 50% 50%;-moz-transform-origin: 50% 50%;-ms-transform-origin: 50% 50%;-o-transform-origin: 50% 50%;transform-origin: 50% 50%;}'
			+ '.'+prefix+'item{text-align:left;border-bottom: 1px solid #222;}'
			+ '.'+prefix+'item:not(:first-child) {opacity:0.2;transition:1s}'
			+ '.'+prefix+'wclose{position:absolute;top:0px;right:0px;}'
			+ '.'+prefix+'headclose{height:50px;width:60px;float:right;cursor:pointer;color: #333333;font-size: 60px;display: inline-block;border-left:1px solid #e0e0e0;background:url('+admImageHostPlayer+'pclose.png) center center no-repeat;}'
			//+ '.'+prefix+'headclose:before {content: "×";}'
			+ '.'+prefix+'line { width:100%; text-align:center; border-bottom: 1px solid #222; line-height:0.1em; margin:10px 0 0px; font-size:20px; color: #999;}' 
			+ '.'+prefix+'line span { background:#111; padding:0 10px; }'
			+ '.'+prefix+'action{background: #000;height: 50px;padding:10px 0px;display:none;}'
			+ '.'+prefix+'view{display:inline-block;padding-top:6px;}'
			+ '.'+prefix+'view span{background:url('+admImageHostPlayer+'view.png) no-repeat;padding-left:24px;font-size:13px;font-family:myriad pro;color: #a4a4a4;}'
			+ '.'+prefix+'social{float:right;}'
			+ '.'+prefix+'social-button{display: inline-block;font-size:13px;font-family:myriad pro;cursor:pointer;color: #a4a4a4;background: #1A1A1A;padding: 6px 14px;border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;}'
			+ '.'+prefix+'sp-detail-share{margin: 0px 10px;padding-top:8px;}'
			+ '.'+prefix+'sp-detail-comment{padding-top:8px;}'
			+ '.'+prefix+'sp-detail-comment a{text-decoration:none;color: #a4a4a4;}'
			+ '.'+prefix+'sp-detail-share span{background:url('+admImageHostPlayer+'fb.png) no-repeat;padding-left:14px;padding-top:2px;}'
			+ '.'+prefix+'sp-detail-comment span{background:url('+admImageHostPlayer+'comment.png) no-repeat;padding-left:20px;}'			
			+ '.'+prefix+'scroll-fullpage{position: fixed;top: 10%;bottom: 10%;z-index: 1;right: 40px;height: 80%;width: 40px;padding-top: 1px;}'			
			+ '.'+prefix+'scroll-fullpage .drag{display: inline-block;width: 37px;position: relative;left: 0px;background-color: #3a3a3a;color: #fff;cursor: pointer;text-align: center;font-size: 20px;border-radius: 3px;-webkit-border-radius: 3px;-moz-border-radius: 3px;padding: 10px 0;}'
			+ '.'+prefix+'scroll-fullpage .uparr{width: 0;height: 0;border-left: 5px solid transparent;border-right: 5px solid transparent;border-bottom: 5px solid #555;position: absolute;top: 5px;left: 14px;}'
			+ '.'+prefix+'scroll-fullpage .downarr{width: 0;height: 0;border-left: 5px solid transparent;border-right: 5px solid transparent;border-top: 5px solid #555;position: absolute;bottom: 5px;left: 14px;}'
			+ '.'+prefix+'scroll-fullpage .section-label span{display: block;height: 40px;line-height: 40px;}'
			+ '.'+prefix+'scroll-fullpage .section-label .total-items{color: #888;}'
			+ '.'+prefix+'scroll-fullpage .section-label i{display: block;height: 5px;width: 20px;margin: 0 auto;background:url(http://adi.vcmedia.vn/adt/cpc/tvcads/files/others/player/pluginadmicro/images/drag-icon_1461130981.png) center center no-repeat;}'
			+ '.'+prefix+'scroll-fullpage .drag-scroll{-webkit-transition: all 1s ease;-moz-transition: all 1s ease;transition: all 1s ease;}'
			+ '.'+prefix+'scroll-fullpage:before{content: "";position: absolute;top: 1px;bottom: 0;left: 50%;margin-left: -1px;width: 1px;border-left: 1px solid rgba(255, 255, 255, 0.1);}'
			+ '.'+prefix+'wrapperitem{transition: all 0.5s;}'
			+ '.'+prefix+'wrapperitem.bource {animation-name: bounceEnd;animation-delay: 0s;animation-duration: 0.5s;animation-timing-function: linear;}'			
			+ '.'+prefix+'stylemain{z-index:99999 !important;width:'+videoWidth+'px !important;height:'+videoHeight+'px !important;position:absolute !important;}'	
			+ '.'+prefix+'nostylemain{position:relative}'
			+ '.'+prefix+'loading-image{position: absolute;top: 50%;left: 50%;width: 80px;height: 80px;margin:-40px 0 0 -40px;-webkit-animation:spinLoading 1.5s linear infinite;-moz-animation:spinLoading 1.5s linear infinite;animation:spinLoading 1.5s linear infinite;}'
			+ '.'+prefix+'stylecontainer{z-index:99999 !important;position:fixed !important;left:0px;top:0px;overflow:auto;background-color: #111;}';	
			
		addStyle(css, prefix);
		
		var html_bottom = '';	
		//if((/Firefox/i.test(navigator.userAgent)) || ((msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)))){	
			html_bottom = '<div style="height:300px;width:100%;display:block;"></div>';
		//}
		
		var html 
			= '<div class="'+prefix+'header">'
			+   '<div class="'+prefix+'mtitle"><div><span>'+admDataVideo.title+'</span></div></div>'
			+	'<div class="'+prefix+'wclose">'
			+ 	'<span class="'+prefix+'headclose" id="'+prefix+'headclose"></span>'
			+	'</div>'
			+ '</div>'
			
			+ '<div class="'+prefix+'content '+prefix+'content-drag-scroll" id="'+prefix+'content"><div class="'+prefix+'wrapperitem">'
			+ drawVideo(numberVideos)						
			+ '</div></div>'			
			+ html_bottom
			+ '<div id="'+prefix+'scroll-fullpage" class="'+prefix+'scroll-fullpage"><span id="'+prefix+'drag" class="drag drag-scroll"><b class="uparr"></b><span class="section-label"><span class="curr-item">1</span><i></i><span class="total-items">'+section_number+'</span></span><b class="downarr"></b></span></div>'			
			+ '';	
		var div = doc.createElement("div");
			div.className = prefix;	
			div.id = prefix;
			div.innerHTML = html;
		
		doc.getElementById(prefixBoxTop+"main_iframe_container").appendChild(div);		
		setTimeout(function(){
			$('#'+popupInBox).css('opacity','1');		
		},100);				
		
		addEvent(doc.getElementById(prefix+'headclose'),"click",function(){	
			if(scrolling) return;
			doc.body.style.overflowX = '';
			doc.body.style.overflowY = '';				
			addClassName(doc.getElementById(popupInBox),popupInBox+"zoomOut");
			addClassName(doc.getElementById(popupInBox),popupInBox+"animated");	
			doc.getElementById(prefix).style.display = 'none';	
			clearTimeout(time);
			$('#'+prefixBoxTop+'main_iframe_wrap').show();			
			if(admIndexCurrentVideo != currentIndexList){							
				stopVideo(popupInBox+'itemVideo'+admIndexCurrentVideo);				
			}		
			doc.getElementsByTagName('body')[0].style.overflow = 'scroll';	
			$('#'+popupInBox).css('opacity','0.2');
			$('#'+prefixBoxTop+'main_iframe_wrap').css('top','auto');
			$('#'+prefixBoxTop+'main_iframe_wrap').css('left','auto');			
			$('#'+prefixBoxTop+'main_iframe_wrap').removeClass(prefix+'stylemain');		
			$('#'+prefixBoxTop+'main_iframe_container').removeClass(prefix+'stylecontainer');
			$('#'+prefixBoxTop+'main_iframe_wrap').removeClass(popupInBox+'nostylemain');
			$('#'+prefixBoxTop+'main_iframe_container').css('width','100%');				
			isShowPopup = false;	
			scrolling = false;		
			doc.getElementById(prefixBoxTop+'main_iframe_container').removeEventListener('scroll', handlerScroll ,false);		
			doc.getElementById(prefixBoxTop+"main_iframe_container").removeChild(doc.getElementById(popupInBox));
		});			
		
		$('#'+prefixBoxTop+'main_iframe_container').click(function() {
			if(scrolling) return;
			doc.body.style.overflowX = '';
			doc.body.style.overflowY = '';				
			addClassName(doc.getElementById(popupInBox),popupInBox+"zoomOut");
			addClassName(doc.getElementById(popupInBox),popupInBox+"animated");			
			doc.getElementById(prefix).style.display = 'none';	
			clearTimeout(time);
			$('#'+prefixBoxTop+'main_iframe_wrap').show();			
			if(admIndexCurrentVideo != currentIndexList){							
				stopVideo(popupInBox+'itemVideo'+admIndexCurrentVideo);				
			}
			doc.getElementsByTagName('body')[0].style.overflow = 'scroll';	
			$('#'+popupInBox).css('opacity','0.2');
			$('#'+prefixBoxTop+'main_iframe_wrap').css('top','auto');
			$('#'+prefixBoxTop+'main_iframe_wrap').css('left','auto');			
			$('#'+prefixBoxTop+'main_iframe_wrap').removeClass(prefix+'stylemain');		
			$('#'+prefixBoxTop+'main_iframe_container').removeClass(prefix+'stylecontainer');
			$('#'+prefixBoxTop+'main_iframe_wrap').removeClass(popupInBox+'nostylemain');
			$('#'+prefixBoxTop+'main_iframe_container').css('width','100%');	
			isShowPopup = false;
			scrolling = false;				
			doc.getElementById(prefixBoxTop+'main_iframe_container').removeEventListener('scroll', handlerScroll ,false);		
			doc.getElementById(prefixBoxTop+"main_iframe_container").removeChild(doc.getElementById(popupInBox));
		});

		$('.'+popupInBox+'wrapperitem').click(function(event){
			event.stopPropagation();
		});
		
		$('#'+popupInBox+'scroll-fullpage').click(function(event){
			event.stopPropagation();
		});
		
		$('.'+popupInBox+'header').click(function(event){
			event.stopPropagation();
		});
		
		$('#'+prefixBoxTop+'main_iframe_container').addClass(prefix+'stylecontainer');
		$('#'+prefixBoxTop+'main_iframe_container').css('width','102%');
		if(append == true){
			var offsetNew = $('#'+popupInBox+'wrap_iframe0').offset();
			admOffsetLeft = offsetNew.left;
			admOffsetTop = (offsetNew.top) - $(window).scrollTop();					
			$('#'+prefixBoxTop+'main_iframe_wrap').addClass(prefix+'stylemain');									
			$('#'+prefixBoxTop+'main_iframe_wrap').css({ top: admOffsetTop, left: admOffsetLeft });									
		}else{
			$('#'+prefixBoxTop+'main_iframe_wrap').addClass(prefix+'nostylemain');
		}
				
		$(document).ready(function(){									
			$('.'+prefix+'item').each(function(){
				admListVideos.push($(this));					
			});			
			
			
			
			section_height_scrollbar = ($("#"+prefix+"scroll-fullpage").height() - detalButtonScroll) / section_number;			
			var $scroll_fullpage = $("#"+popupInBox+"scroll-fullpage"),
			$drag = $("#"+popupInBox+"drag"),
			$fullpage = $("#"+popupInBox+"content");			
			current_page = 0;			
						
			$('.'+prefix+'item').first().find('iframe').addClass(prefix+'viframeactive');		
			
			$('#'+prefix).append('<div style="width: 36px;position: fixed;height: 100%;top: 50px;right: -16px;background-color:#111;"></div>');	
			document.getElementById(prefixBoxTop+'main_iframe_container').scrollTop = 0; 								
			document.getElementById(prefixBoxTop+'main_iframe_container').addEventListener('scroll', handlerScroll ,false);						
			section_height = $('.'+prefix+'item').first().height();
			$( "#"+prefix+"drag" ).draggable({
				axis: "y",
				containment: "parent",
				appendTo: 'body',
				start: function() {					
					$fullpage.addClass('active');
				},
				drag: function() {
					$( "#"+popupInBox+"content").removeClass(popupInBox+'content-drag-scroll');					
					if($drag.position().top > ($("#"+prefix+"scroll-fullpage").height() - detalButtonScroll)){							
						$drag.css("top", $("#"+prefix+"scroll-fullpage").height() - detalButtonScroll);
					}
					if($drag.position().top < 0){
						$drag.css("top", 0);
					}						
					scroll_page($drag.position().top);														
					get_current_page($drag.position().top);
					update_label();								
				},
				stop: function() {
					if(section_number <= 1) return;										
					get_current_page($drag.position().top);
					// update for fullpage plugin					
					$fullpage.find("."+popupInBox+"item").removeClass("active");
					$fullpage.find("."+popupInBox+"item").eq(current_page).addClass("active");						
					$fullpage.removeClass('active');
					$( "#"+prefix+"drag" ).addClass('drag-scroll');	
					$( "#"+popupInBox+"content").addClass(popupInBox+'content-drag-scroll');
					update_label();		
					if($drag.position().top > ($("#"+prefix+"scroll-fullpage").height() - detalButtonScroll)){
						$drag.css("top", $("#"+prefix+"scroll-fullpage").height() - detalButtonScroll);
					}
					if($drag.position().top < 0){
						$drag.css("top", 0);
					}					
					if(current_page > admIndexCurrentVideo){								
						for(var j = admIndexCurrentVideo; j < current_page; j++){							
							admCurrentHeight -= admListVideos[j].height();		
							if(j == section_number - 2) 
								admCurrentHeight += deltaHeight;	
						}
					}else{									
						for(var j = admIndexCurrentVideo - 1; j >= current_page; j--){
							admCurrentHeight += admListVideos[j].height();	
							if(j == section_number - 2) 
								admCurrentHeight -= deltaHeight;	
						}
					}						
					admIndexCurrentVideo = current_page;		
					if(admIndexCurrentVideo == 0) 
						document.getElementById(prefixBoxTop+'main_iframe_container').scrollTop = 0;
					else 
						document.getElementById(prefixBoxTop+'main_iframe_container').scrollTop = 1;					
					transform_matrix3d(1, admCurrentHeight);									
					animationIn = false;
					$('#'+prefix+'content').one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(event) {
						if(!animationIn && scrolling == false){							
							admListVideos[admIndexCurrentVideo].css('opacity','1');
						
							if(admListVideos[admIndexCurrentVideo].find('iframe').length == 0){
								if(append == true && admIndexCurrentVideo == currentIndexList){											
									admListVideos[admIndexCurrentVideo].find('iframe').css('display','block');																		
									$('#'+prefixBoxTop+'main_iframe_wrap').addClass(popupInBox+'stylemain');							
									$('#'+prefixBoxTop+'main_iframe_wrap').css({ top: admOffsetTop, left: admOffsetLeft });												
									$('#'+prefixBoxTop+'main_iframe_wrap').show();
								}else{														
									loadiFrame(admIndexCurrentVideo,admIndexCurrentVideo);
								}
							}else{
								admListVideos[admIndexCurrentVideo].find('iframe').css('display','block');
							}
							if(append == true && admIndexCurrentVideo == currentIndexList){						
								playVideo(prefixBoxTop+'itemMainVideo');									
							}else{					
								playVideo(prefix+'itemVideo'+admIndexCurrentVideo);	
							}
							scrolling = false;							
						}
					});										
				}
			}).mousedown(function() {												
				animationIn	= true;				
				$('.'+popupInBox+'item').css('opacity','0.2');	
				if(append == true && admIndexCurrentVideo == currentIndexList){	
					$('#'+prefixBoxTop+'main_iframe_wrap').hide();	
					stopVideo(prefixBoxTop+'itemMainVideo');						
				}else{				
					if(admListVideos[admIndexCurrentVideo].find('iframe').length != 0){
						stopVideo(prefix+'itemVideo'+admIndexCurrentVideo);	
					}
				}					
				$( "#"+prefix+"drag" ).removeClass('drag-scroll');					
				scroll_page($drag.position().top);						
			}).mouseup(function() {								
				get_current_page($drag.position().top);												
				$fullpage.removeClass('active');							
				$( "#"+prefix+"drag" ).addClass('drag-scroll');		
				$( "#"+popupInBox+"content").addClass(popupInBox+'content-drag-scroll');	
				transform_matrix3d(1, admCurrentHeight);					
				update_label();
				animationIn	= false;
				$('#'+prefix+'content').one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(event) {
					if(!animationIn){						
						admListVideos[current_page].css('opacity','1');
						if(admListVideos[current_page].find('iframe').length == 0){
							if(append == true && current_page == currentIndexList){
								admListVideos[current_page].find('iframe').css('display','block');
							}else{													
								loadiFrame(current_page,current_page);
							}
						}else{
							admListVideos[current_page].find('iframe').css('display','block');
						}
						if(append == true && current_page == currentIndexList){						
							playVideo(prefixBoxTop+'itemMainVideo');																				
							$('#'+prefixBoxTop+'main_iframe_wrap').addClass(popupInBox+'stylemain');							
							$('#'+prefixBoxTop+'main_iframe_wrap').css({ top: admOffsetTop, left: admOffsetLeft });												
							$('#'+prefixBoxTop+'main_iframe_wrap').show();
						}else{					
							playVideo(prefix+'itemVideo'+current_page);	
						}
						scrolling = false;							
					}
				});
			});		

			function changeHandler(e) {
				if(fullScreen == false){ 
					fullScreen = true;
					$( "#"+popupInBox+"content").removeClass(popupInBox+'content-drag-scroll');	
				}else{ 
					fullScreen = false;
					$( "#"+popupInBox+"content").addClass(popupInBox+'content-drag-scroll');
				}
			}

			document.addEventListener("fullscreenchange", changeHandler, false);
			document.addEventListener("webkitfullscreenchange", changeHandler, false);
			document.addEventListener("mozfullscreenchange", changeHandler, false);
			
			function update_label() {				
				$drag.find(".section-label").html('<span class="curr-item">'+(current_page+1) + '</span><i></i><span class="total-items">' + (section_number) + '</span>');
				height = section_height * (current_page);  
			}

			function update_drag() {
				$drag.css("top", (current_page) * section_height_scrollbar);
			}

			function scroll_page(position_top) {							
				var percent_scroll =  position_top * ($('.'+prefix+'wrapperitem').height() * 0.75 ) / ($scroll_fullpage.height()-detalButtonScroll);					
				percent_scroll = percent_scroll*(-1);									
				transform_matrix3d(0.75, percent_scroll);
			}

			function transform_matrix3d(scale, distance) {												
				$fullpage.css('transform', 'matrix3d(' + scale + ',0,0.00,0,0.00,' + scale + ',0.00,0,0,0,1,0,0,' + distance + ',0,1)');
				$fullpage.css('-ms-transform', 'matrix3d(' + scale + ',0,0.00,0,0.00,' + scale + ',0.00,0,0,0,1,0,0,' + distance + ',0,1)');
				$fullpage.css('-webkit-transform', 'matrix3d(' + scale + ',0,0.00,0,0.00,' + scale + ',0.00,0,0,0,1,0,0,' + distance + ',0,1)');				
			}

			function get_current_page(position_top) {
				current_page = Math.floor((position_top * section_number) / ($scroll_fullpage.height() - detalButtonScroll));	
				if(current_page > (section_number - 1)) current_page = section_number - 1;
				if(current_page < 0) current_page = 0;	
				return current_page;						
			}				
		});										
		
	};		
	
	var handlerScroll = function(e){			
		if(isShowPopup == false) return;		
		st = document.getElementById(prefixBoxTop+'main_iframe_container').scrollTop;				
		//if(admIndexCurrentVideo == 0 && st == 0) return;
		if(admIndexCurrentVideo == 0)
			document.getElementById(prefixBoxTop+'main_iframe_container').scrollTop = 0;
		else	
			document.getElementById(prefixBoxTop+'main_iframe_container').scrollTop = 1;	
			
		if($('#'+popupInBox).css('opacity') != 1) return;			
		if(scrolling) return;	
		e.preventDefault();										
		if (st == 0){	
			// up
			delta = 1;
		} else {	
			// down
			delta = -1;
		}				
		scrollRun(delta);																
												
		return false;
	}; 
		
	var scrollRun = function(delta){		
		var prefix = popupInBox;		
		if (fullScreen || scrolling || admListVideos.length <= 1) return;									
		$('.'+prefix+'wrapperitem').removeClass('bource');		
		if(delta > 0) {	
			//up				
			if(admIndexCurrentVideo > 0){						
				stopVideo(prefixBoxTop+'itemMainVideo');			
				$('#'+prefixBoxTop+'main_iframe_wrap').hide();	
				
				admListVideos[admIndexCurrentVideo].find('iframe').removeClass(prefix+'viframeactive');				
				stopVideo(admListVideos[admIndexCurrentVideo].find('iframe').attr('id'));								
				if(admIndexCurrentVideo == section_number - 1) 
					admCurrentHeight -= deltaHeight;
				admIndexCurrentVideo--;						
				admCurrentHeight += admListVideos[admIndexCurrentVideo].height(); 	
				
				if(admIndexCurrentVideo > 0){
					admListVideos[admIndexCurrentVideo-1].find('iframe').css('display','block');
				}	
			}else{
				scrolling = false;				
				return;
			}					
		}else{
			// down	
			if(admIndexCurrentVideo < admListVideos.length-1){		
				if(append == true){
					stopVideo(prefixBoxTop+'itemMainVideo');			
					$('#'+prefixBoxTop+'main_iframe_wrap').hide();	
				}
				
				stopVideo(admListVideos[admIndexCurrentVideo].find('iframe').attr('id'));
				
				admListVideos[admIndexCurrentVideo].find('iframe').removeClass(prefix+'viframeactive');					
				admCurrentHeight -= admListVideos[admIndexCurrentVideo].height();								
				admIndexCurrentVideo++;			
				if(admIndexCurrentVideo == section_number - 1) 
					admCurrentHeight += deltaHeight;		
				if(admIndexCurrentVideo < admListVideos.length-1){								
					admListVideos[admIndexCurrentVideo+1].find('iframe').css('display','block');
				} 		
			}else{
				scrolling = false;				
				return;
			}
		}			
		clearTimeout(time);
		clearTimeout(timePop);
		$('.'+popupInBox+'item').css('opacity','0.2');
		
		var b = admIndexCurrentVideo;			
				
		if(admListVideos[b].find('iframe').length == 0){
			if(append == true && b == currentIndexList){
				admListVideos[b].find('iframe').css('display','block');							
			}
		}else{
			admListVideos[b].find('iframe').css('display','block');			
		}			
		scrolling = true;			
		$( "#"+prefix+"content").addClass(popupInBox+'content-drag-scroll');
		$('#'+prefix+'content').css('transform', 'translate3d(0px, '+admCurrentHeight+'px, 0px)');
		$('#'+prefix+'content').css('-ms-transform', 'translate3d(0px, '+admCurrentHeight+'px, 0px)');	
		$('#'+prefix+'content').css('-webkit-transform', 'translate3d(0px, '+admCurrentHeight+'px, 0px)');	
		$("#"+prefix+"drag").css("top", b * section_height_scrollbar);
		if(b != 0) 
			document.getElementById(prefixBoxTop+'main_iframe_container').scrollTop = 1;
		else
			document.getElementById(prefixBoxTop+'main_iframe_container').scrollTop = 0;		
		
		var timesRun = 0;
		$('#'+prefix+'content').one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(event) {
			//if(timesRun > 0) return; else timesRun++;			
			if(b != 0) 
				document.getElementById(prefixBoxTop+'main_iframe_container').scrollTop = 1;
			else
				document.getElementById(prefixBoxTop+'main_iframe_container').scrollTop = 0;
			if(b == admListVideos.length - 1){
				$('.'+prefix+'wrapperitem').addClass('bource');
			}		
			clearTimeout(time);				   
			admListVideos[b].css('opacity','1');
			admListVideos[b].find('iframe').addClass(prefix+'viframeactive');									
			$("#"+prefix+"drag").find(".section-label").html('<span class="curr-item">'+(b+1) + '</span><i></i><span class="total-items">' + (section_number) + '</span>');				
			if(b == currentIndexList){					
				if(scrolling === false){						
					$('#'+prefixBoxTop+'main_iframe_wrap').addClass(popupInBox+'stylemain');							
					$('#'+prefixBoxTop+'main_iframe_wrap').css({ top: admOffsetTop, left: admOffsetLeft });																
				}				
				$('#'+prefixBoxTop+'main_iframe_wrap').show();
				$('#'+popupInBox+'wrap_iframe'+currentIndexList).find('.adm-loading-image').hide();		
			}else{
				$('#'+popupInBox+'wrap_iframe'+currentIndexList).find('.adm-loading-image').show();	
			}
			
			if(admListVideos[b].find('iframe').length == 0){
				if(b != currentIndexList){														
					loadiFrame(b,b);
				}
			}
												
			if(isShowPopup == true){			
				if(b == currentIndexList){						
					playVideo(prefixBoxTop+'itemMainVideo');	
				}else{					
					playVideo(prefix+'itemVideo'+b);	
				}					
			}
			scrolling = false;						
		});										  	
	}	
		
	var loadiFrame = function(index, no){			
		url = "http://vcplayer.vcmedia.vn/1.1/?_site=kenh14&vid="+admDataVideo.listvideo[index].FileName+"&_info="+admDataVideo.listvideo[index].KeyVideo+"&tag=0";						
		var ifr = $('<iframe/>', {
			id:popupInBox+'itemVideo'+no,
			src:url+'&tag=0&volume=0.8&muted=false&_listsuggest=no&filler=false&boxVideoID='+admDataVideo.listvideo[index].KeyVideo,
			style:'display:block',
			width:"100%",
			height:"100%",
			frameborder:"0",
			allowfullscreen:"",
			webkitallowfullscreen:"",
			mozallowfullscreen:"",
			oallowfullscreen:"",
			msallowfullscreen:"",
			scrolling:"no",				
			load:function(){					
				$(this).show();				
				admPopUPController.onLoadHandler(popupInBox+'itemVideo'+no);								
			},
		});
		admListVideosId[admDataVideo.listvideo[index].KeyVideo] = popupInBox+'itemVideo'+no;
		$('#'+popupInBox+'wrap_iframe'+no).append(ifr);		
		
	}				

	var easeInOut = function(currentTime, start, change, duration) {
		currentTime /= duration / 2;
		if (currentTime < 1) {
			return change / 2 * currentTime * currentTime + start;
		}
		currentTime -= 1;
		return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
	};
	
	var addStyle = function(a, b, c) {
 		b = void 0 == b ? null : "" + b;
 		if (void 0 == c) c = 1;
 		else switch (c = c.toLowerCase(), c) {
 			case "overwrite":
 				c = 2;
 				break;
 			case "append":
 				c = 3;
 				break;
 			default:
 				c = 1
 		}
 		var e = document.head || document.getElementsByTagName("head")[0],
 			d = null;
 		if (null != b)
 			for (var h = e.getElementsByTagName("style"), g = 0, f = h.length; g < f; ++g)
 				if (h[g].getAttribute("name") == b) {
 					if (1 == c) return !0;
 					d = h[g];
 					break
 				}
 		null == d && (d = document.createElement("style"), d.type = "text/css", b && d.setAttribute("name", b), e.appendChild(d), c = 2);
 		d.styleSheet ? d.styleSheet.cssText = 2 == c ? a : d.styleSheet.cssText + a : (2 == c && (d.innerHTML = ""), a = document.createTextNode(a), d.appendChild(a));
 		return !0
 	};
	
	var removeStyle = function(a) {
 		a = "" + a;
 		for (var b = (document.head || document.getElementsByTagName("head")[0]).getElementsByTagName("style"),
 				c = 0, e = b.length; c < e; ++c)
 			if (b[c].getAttribute("name") == a) return b[c].remove(), !0;
 		return !1
 	};
 	var addEvent = function(a, b, c) {
 		return a.addEventListener ? (a.addEventListener(b, c), !0) : a.attachEvent ? (a.attachEvent("on" + b, c), !0) : !1
 	};
 	var removeEvent = function(a, b, c) {
 		return a.removeEventListener ? (a.removeEventListener(b, c), !0) : a.detachEvent ? (a.detachEvent("on" + b, c), !0) : !1
 	};
 	var addClassName = function(a, b) {
 		var c = a.className || "";
 		if ("" == c) a.className = b;
 		else {
 			var e = c.split(" ");
 			inArray(b, e) || (a.className = c + " " + b)
 		}
 	};
 	var removeClassName = function(a, b) {
 		for (var c = a.className || "", e = c.split(" "), d = 0, h = e.length; d < h; ++d) e[d] == b && (e[d] = null);
 		c = "";
 		d = 0;
 		for (h = e.length; d < h; ++d) null !== e[d] && (c += " " + e[d]);
 		a.className = c.substr(1)
 	};
	
	var inArray = function(a, b, c) {
 		if (c)
 			for (k in b) {
 				if (b[k] === a) return !0
 			} else
 				for (k in b)
 					if (b[k] == a) return !0;
 		return !1
 	};
		
	draw();		
}

var newStyle = document.createElement('style');
newStyle.appendChild(document.createTextNode("\
	@charset \"utf-8\";\
	@font-face {\
		font-family: 'SFD-Heavy';\
		src: url('http://k14.vcmedia.vn/web_font/SFD-Heavy.eot'), url('http://k14.vcmedia.vn/web_font/SFD-Heavy.ttf'), url('http://k14.vcmedia.vn/web_font/SFD-Heavy.woff'), url('http://k14.vcmedia.vn/web_font/SFD-Heavy.woff2');\
	}\
	"));
document.head.appendChild(newStyle);

try{	
	//var dataPlayer=[];
	
	if (typeof dataPlayer != 'undefined'){		
		admBoxListVideo = new admBoxListVideo();
		if(typeof(admBoxListVideo.admVideoPlayerSetData) == 'function') 
			admBoxListVideo.admVideoPlayerSetData(dataPlayer);	  
	}else{		
		loadScript("http://admicro1.vcmedia.vn/js_tvc/tvcboxvideo_27975.js", function(){
			admBoxListVideo = new admBoxListVideo();
			if(typeof(admBoxListVideo.admVideoPlayerSetData) == 'function') 
				admBoxListVideo.admVideoPlayerSetData(dataPlayer);	  
		});	
	}
}catch (e) {}

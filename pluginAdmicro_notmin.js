var _admParamTVC = "",admGameOnVideoObject,_chkPrLink = false,tagAudien = "",listAudienceSince = "dantri.com.vn,kenh14.vn,soha.vn,cafef.vn,genk.vn,afamily.vn,vtv.vn,giadinh.net.vn,cafebiz.vn",isGetDataAudien = false,admTvcTag = 0,isIPSeted=false,admMyIP,isTimeReplay=0;

//get param of TVC
function addParamTVC(val) {
    _admParamTVC = val
}
try {
    parent.postMessage("addParam", "*")
} catch (err) {}


//check PR type
function addChkPrLink(val) {
    _chkPrLink = val
}
try {
    parent.postMessage("chkPrLink", "*")
} catch (err) {}

//get AudienSince VASTURI
function setDataAudien(val) {
    tagAudien = val
}
//create AudienSince Tag to the site
function createTagAudien(){
  listAudienceSince = listAudienceSince.split(",");
  for (var i = 0; i < listAudienceSince.length; i++)
      if (document.referrer.indexOf(listAudienceSince[i]) != -1 && !isGetDataAudien) {
          isGetDataAudien = true;
          top.postMessage("getDataAudien", "*")
      }
}
createTagAudien();
try {
    parent.postMessage("admGetIP", "*")
} catch (err) {}
function admSetIP(ip) {

  let arrIP=['1908336650','1906395496','1906312522','3741063452','1984318109'];
  for(var i = 0; i < arrIP.length; i++){
    if(ip == arrIP[i]){
      isIPSeted = true;
      admMyIP=ip;
    }
  }
}


//list domain accepted
var whitelist = ",local.kenh14.vn,b13.channelvn.net,thunghiem.vtv.vn,b3.channelvn.net,b14.channelvn.net,b4.channelvn.net,local.vtv.vn:2016,s2.channelvn.net,adi.admicro.vn,admicro.vn,kenh14.channelvn.net,s4.channelvn.net,beta1.kenh14.vn,adi.vcmedia.vn,kenh14.vn,afamily.vn,b11.channelvn.net,localhost:86,wechoice.vn,a20.channelvn.net,autopro.com.vn,vtv,dantri.com.vn,b12.channelvn.net,soha.vn,cafef.vn,cafebiz.vn,giadinh.net.vn,genk.vn,gamek.vn,vneconomy.vn,";

//listen message from site
if (window.addEventListener) window.addEventListener("message", function(e) {
    listenParent(e)
}, false);
else if (window.attachEvent) window.attachEvent("onmessage", function(e) {
    listenParent(e)
});

function listenParent(e) {
    var domain = e.origin.replace("http://", "");
    domain = domain.replace("www.", "");
    domain = "," + domain + ",";
    if (whitelist.indexOf(domain) != -1) try {
        setTimeout(function() {
            if (typeof e.data == "string" && e.data.indexOf("admReviceMessageToPlayer") == -1) eval(e.data)
        }, 100)
    } catch (err) {
        try {
            if (typeof e.data == "string" && e.data.indexOf("admReviceMessageToPlayer") == -1) eval(e.data)
        } catch (err) {
            console.log(err)
        }
    }
    receiveMessage(e)
}


var idPlayer = "video_flash_api",admPlayer,iplayHtml5;
function posMessageExpandPreroll(url) {
    parent.postMessage(url, "*");
    admPlayer = getFlashPlayer(idPlayer);
    if (!admPlayer) admPlayer = getFlashPlayer("vpaid_0")
}
function posMessageExpandPreroll(url) {
    top.postMessage(url, "*");
    admPlayer = getFlashPlayer(idPlayer);
    iplayHtml5 = document.getElementsByTagName("iframe")[0]
}

function receiveMessage(event) {
    if (event.data == "CloseExpandable" && iplayHtml5) iplayHtml5.contentWindow.postMessage("admCloseExpand", "*");
    if (event.data == "admSendClickTracking" && iplayHtml5) iplayHtml5.contentWindow.postMessage("admSendClickTracking", "*");
    if (event.data == "CloseExpandable" && !iplayHtml5 && admPlayer && typeof admPlayer.resumeAds == "function") {
        console.log("CloseExpandable");
        admPlayer.resumeAds()
    }
    if (event.data == "SendClickTracking" && admPlayer && typeof admPlayer.clickAds == "function") admPlayer.clickAds()
}

function getFlashPlayer(movieName) {
    if (window.document[movieName]) return window.document[movieName];
    if (navigator.appName.indexOf("Microsoft Internet") == -1) {
        if (document.embeds && document.embeds[movieName]) return document.embeds[movieName]
    } else return document.getElementById(movieName)
}

//Plugin For API
(function(window, vcplayer) {
    var defaults = {},admicroAPIPlugin,admicroADSPlugin;
    admicroAPIPlugin = function(options) {
        var player = this,
            isTracking3s = false,
            isTrackingmidpoint = false;
            var admSendTrackingPlayer = new function() {
                var AdmArrPlayer = [];
                this.sendLog = function(a) {
                    if (player.mediaInfo.videoID&&player.mediaInfo.videoID!= '0') {
                        let we1 = "//lg1.logging.admicro.vn/tk?p="
                        let we2 = a+";";
                        var py = 0,
                            cp = 0,
                            sc = 0,
                            bl = 0,
                            sk = 0,
                            zm = 0,
                            vl = 0,
                            ps = 0,
                            mi = 0,
                            cl = 0;
                        var parms = cp + ";" + sc + ";" + bl + ";" + sk + ";" + ps + ";" + zm + ";" + vl + ";" + player.mediaInfo.videoID + ";" + cl + ";" + (player.mediaInfo.domain?player.mediaInfo.domain:null);
                        parms += "|" + (player.mediaInfo.tag?player.mediaInfo.tag:admTvcTag) + ";" + (player.mediaInfo.pathname?player.mediaInfo.pathname:null);
                        var img = new Image;
                        img.src = we1 +encodeURIComponent(we2 + parms);
                    } else {
                        AdmArrPlayer.push(a);
                        player.on("updateMediaInfo", function() {
                            for (var i = 0; i < AdmArrPlayer.length; i++) {
                                let we1 = "//lg1.logging.admicro.vn/tk?p=";
                                let we2 =  AdmArrPlayer[i] + ";"
                                var py =
                                    0,
                                    cp = 0,
                                    sc = 0,
                                    bl = 0,
                                    sk = 0,
                                    zm = 0,
                                    vl = 0,
                                    ps = 0,
                                    mi = 0,
                                    cl = 0;
                                var parms = cp + ";" + sc + ";" + bl + ";" + sk + ";" + ps + ";" + zm + ";" + vl + ";" + player.mediaInfo.videoID + ";" + cl + ";" + (player.mediaInfo.domain?player.mediaInfo.domain:null);
                                parms += "|" + (player.mediaInfo.tag?player.mediaInfo.tag:admTvcTag) + ";" + (player.mediaInfo.pathname?player.mediaInfo.pathname:null);
                                var img = new Image;
                                img.src = we1 + encodeURIComponent(we2 + parms);
                            }
                        })
                    }
                }
            }
        admSendTrackingPlayer.sendLog("2");
        //when player play video 1st
        var onePlay = function() {
            player.off(["play", "playing"], vcplayer.bind(this, onePlay));
            admSendTrackingPlayer.sendLog("-1");
            player.on("timeupdate", function() {
                if (!isTracking3s && player.currentTime() >= 3) {
                    isTracking3s = true;
                    admSendTrackingPlayer.sendLog("11")
                }
                if (!isTrackingmidpoint && player.currentTime() / player.duration() > .5) {
                    isTrackingmidpoint = true;
                    admSendTrackingPlayer.sendLog("12");
                    if (player.mediaInfo.boxVideoID) parent.postMessage('admPopUPController.onMidpointReady("' + player.mediaInfo.boxVideoID + '")', "*")
                }
            });
            player.on("ended", function() {
                if (player.mediaInfo._listsuggest && player.mediaInfo._listsuggest == "no"&&typeof(document.getElementsByClassName("vjs-finish-play-bar")[0]) != 'undefined') document.getElementsByClassName("vjs-finish-play-bar")[0].style.display = "none";
            });
            if (player.mediaInfo.bottomVideo) {
                setTimeout(function() {
                    player.controlBar.volumeControl.volumeBar.setVolume(.4)
                }, 2E3);
                isPlayVideo = true;
                admSendTrackingPlayer.sendLog("5");
                player.on("ended", function() {
                    parent.postMessage("addCallToActionFrame","*");
                    player.muted(true);
                    player.play()
                })
            }

            if (player.mediaInfo.boxVideoID) admSendTrackingPlayer.sendLog("7")
        };
        player.one(["play", "playing"], vcplayer.bind(this, onePlay));

        //when player loaded video
        if (player.mediaInfo.boxVideoID) {
            admSendTrackingPlayer.sendLog("6");
            player.on("endedcontent", function() {
              parent.postMessage('admPopupEPLController.onEndedVideo("' + player.mediaInfo.boxVideoID + '")', "*");
              parent.postMessage('admBoxEPLVideo.onEndedVideo("' + player.mediaInfo.boxVideoID + '")', "*");
              parent.postMessage('admPopUPController.onEndedVideo("' +player.mediaInfo.boxVideoID + '")', "*");
              parent.postMessage('admBoxListVideo.onEndedVideo("' + player.mediaInfo.boxVideoID + '")', "*");
              parent.postMessage('admStreamVideo.onEndedVideo("' + player.mediaInfo.boxVideoID + '")', "*")
              parent.postMessage('admTVCPopUPController.onEndedVideo("' + player.mediaInfo.boxVideoID +'")', "*")
              parent.postMessage('admBoxTVCVideo.onEndedVideo("' + player.mediaInfo.boxVideoID +'")', "*")

            })
        }
        if (player.mediaInfo.bottomVideo) admSendTrackingPlayer.sendLog("4");


        //API message from site to player
        var isPlayVideo =isTriggerPlay =postMessagePause = false;
        function admReviceMessageToPlayer(e) {
            var action = e;
            switch (action) {
                case "playvideo":
                    if (!isPlayVideo) {
                        isPlayVideo = true;
                        player.trigger("clickPlayButton");
                        player.play()
                    }
                    break;
                case "play":
                    if (!isTriggerPlay) {
                        isTriggerPlay = true;
                        player.play();
                        if (player.mediaInfo.muted == "false") {
                            player.muted(false);
                            player.volume(.5);
                            document.getElementsByClassName("volume-level-label")[0].style.display = "none"
                        }
                    } else player.play();
                    break;
                case "pause":
                    player.pause();
                    break;
                case "pausevideo":
                    if (isPlayVideo) {
                        isPlayVideo = false;
                        postMessagePause = true;
                        player.pause()
                    }
                    break;
                case "mutevideo":
                    player.muted(true);
                    break;
                case "unmutevideo":
                    player.muted(false);
                    player.volume(.5);
                    if (player.mediaInfo.showIconMute) document.getElementById("vjs_icon_mute_contain").style.opacity = "0";
                    break;
                case "spinvideo":
                    player.trigger("autofill");
                    setTimeout(function() {
                            player.controlBar.volumeControl.volumeBar.setVolume(.4)
                        },
                        2E3);
                    isPlayVideo = true;
                    player.on("ended", function() {
                        parent.postMessage("addCallToActionFrame", "*");
                        player.muted(true);
                        player.play()
                    });
                    break;
                case "autospin":
                    player.trigger("autofill");
                    isPlayVideo = true;
                    player.on(["play", "playing"], function() {
                        if (!isPlayVideo) player.pause()
                    });
                    break;
                case "sendlog":
                    admSendTrackingPlayer.sendLog("8");
                    break;
                case "sendlogcta":
                    admSendTrackingPlayer.sendLog("9");
                    break;
                case "showcontrolbar":
                    var d = document.getElementsByClassName("vjs-control-bar")[0];
                    d.className = " vjs-control-bar";
                    break;
                case "hidecontrolbar":
                    var d = document.getElementsByClassName("vjs-control-bar")[0];
                    d.className += " hide-control-bar";
                    break
            }
        }
        if (window.addEventListener) window.addEventListener("message", function(e) {
            var _domain = e.origin.replace("http://", "");
            _domain = _domain.replace("www.", "");
            //if (whitelist.indexOf(_domain) != -1)
            try {
                if (e.data.indexOf("admReviceMessageToPlayer") != -1) eval(e.data)
            } catch (er) {}
        }, false);
        else if (window.attachEvent) window.attachEvent("onmessage", function(e) {
            var _domain = e.origin.replace("http://", "");
            _domain = _domain.replace("www.", "");
            //if (whitelist.indexOf(_domain) != -1)
            try {
                if (e.data.indexOf("admReviceMessageToPlayer") != -1) eval(e.data)
            } catch (er) {}
        });

        //player loaded data and call to site
        player.one("loadeddata", function() {
            if (player.mediaInfo.boxVideoID ) {
                parent.postMessage('admPopupEPLController.onReadyVideo("' + player.mediaInfo.boxVideoID + '")', "*");
                parent.postMessage('admBoxEPLVideo.onReadyVideo("' + player.mediaInfo.boxVideoID + '")', "*");
                parent.postMessage('admPopUPController.onReadyVideo("' + player.mediaInfo.boxVideoID + '")', "*");
                parent.postMessage('admBoxListVideo.onReadyVideo("' + player.mediaInfo.boxVideoID + '")', "*");
                parent.postMessage('admStreamVideo.onReadyVideo("' + player.mediaInfo.boxVideoID +'")', "*")
                parent.postMessage('admTVCPopUPController.onReadyVideo("' + player.mediaInfo.boxVideoID +'")', "*")
                parent.postMessage('admBoxTVCVideo.onReadyVideo("' + player.mediaInfo.boxVideoID +'")', "*")
            }
        });

        //check ADS Completed And Call to site
        var isPostEndedAds = false;
        if (player.mediaInfo.onlyAds) {
            var event = ["vast.adsCancel", "vast.contentStart", "vast.adError", "vast.adSkip", "restorePlayer"];
            for (var i = 0; i < event.length; i++) player.on(event[i], function(e) {
                if (!isPostEndedAds) {
                    isPostEndedAds = true;
                    if (player.mediaInfo.idAds) parent.postMessage('onAdmicroAdsComple("' + player.mediaInfo.idAds + '")', "*")
                }
            })
        }
        var isInitAdmPopup = !1;
        if (0 == detectmob())
            if ("undefined" != typeof player.mediaInfo.config && 1 == player.mediaInfo.config[0].Type) admPopupFunction(),isInitAdmPopup = !0;
            else player.on("updateMediaInfo", function() {
                isInitAdmPopup || "undefined" == typeof player.mediaInfo.config || 1 != player.mediaInfo.config[0].Type || (admPopupFunction(), isInitAdmPopup = !0)
            });


        //detect Mobile Device
        function detectmob() {
            return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ? !0 :
                !1
        }
        function admPopupFunction() {
            function m(a) {
                "undefined" != typeof c.banners[a].content && 1 != g[c.banners[a].banner_id] && (admGameOnVideoObject.writeContent({
                    title: "",
                    content: c.banners[a].content
                }), g[c.banners[a].banner_id] = !0)
            }

            function p() {
                this.admVideoPlayerSetData = function(d) {
                    (function() {
                        a();
                        document.getElementById("admGameOnVideoclose").addEventListener("click", function() {
                            document.getElementById("admGameOnVideocontent").innerHTML = "";
                            document.getElementById("admGameOnVideomain").style.transform = "scale(0)";
                            player.play()
                        })
                    })()
                };
                this.hidePopup = function() {
                    document.getElementById("admGameOnVideocontent").innerHTML = "";
                    document.getElementById("admGameOnVideomain").style.transform = "scale(0)";
                    player.play()
                };
                this.showPopup = function() {
                    player.pause();
                    document.getElementById("admGameOnVideomain").style.transform = "scale(1)";
                    document.getElementsByClassName("vjs-play-control")[0].className += " animate-flicker3";
                    document.getElementsByClassName("vjs-current-time-display")[0].className += " animate-flicker";
                    document.getElementsByClassName("vjs-slider-handle")[0].className +=
                        " animate-flicker2"
                };
                this.checkActive = function() {
                    return "undefined" != typeof player.mediaInfo.isShowActive && "true" == player.mediaInfo.isShowActive ? !0 : !1
                };
                this.nextPopup = function() {
                    n = !0
                };
                this.writeContent = function(a) {
                    document.getElementById("admGameOnVideocontent").innerHTML = "";
                    d(a.content, function() {})
                };
                var a = function() {
                    var a = document.createElement("div");
                    a.id = "admGameOnVideomain";
                    a.innerHTML = '<div id="admGameOnVideowrap_questions"><div id="admGameOnVideocontent"></div><div id="admGameOnVideoclose"></div></div>';
                    document.getElementById("video").appendChild(a)
                };
                new function() {
                    AddCss('#admGameOnVideomain{width:100%;height:100%;top:0px;position:absolute;-webkit-transition: 0.75s ease-in-out;-moz-transition: 0.75s ease-in-out;-o-transition: 0.75s ease-in-out;transition: 0.75s ease-in-out;transform: scale(0);z-index:9999999;}#admGameOnVideowrap_questions{width:90%;height:70%;position: absolute;top: 38px;left: 32px;border-radius: 6px;border: 1px solid rgba(255,255,255,0.7);z-index: 9; background-color: rgba(0, 0, 0, 0.8);font-size:20px;}#admGameOnVideocontent{width:100%;height:100%}#admGameOnVideocontent iframe{width:100%;height:100%;border:none;}#admGameOnVideoclose{    position: absolute;top: 6px;right: 10px;color: #fff;font-size: 25px;}#admGameOnVideoclose:before{content: "x";}')
                };
                var d = function(a, d) {
                    var b = document.createElement("script");
                    b.type = "text/javascript";
                    b.readyState ? b.onreadystatechange = function() {
                        if ("loaded" == b.readyState || "complete" == b.readyState) b.onreadystatechange = null, d()
                    } : b.onload = function() {
                        d()
                    };
                    b.src = a;
                    var c = document.createElement("iframe");
                    c.id = "admGameOnVideoiframe";
                    c.setAttribute("allowtransparency", "true");
                    c.setAttribute("scrolling", "no");
                    c.onload = function() {
                        var a = c.contentDocument || c.contentWindow.document,
                            d = document.createElement("div");
                        d.id = "adm_game_on_video_content";
                        d.appendChild(b);
                        a.body.appendChild(d)
                    };
                    document.getElementById("admGameOnVideocontent").appendChild(c);
                    c.contentWindow.document.body.style.margin = "0 auto"
                }
            }

            function q(a) {
                this.setData = function(a) {
                    for (b in a) switch (b) {
                        case "TitleToCallAction":
                            this.title = a.TitleToCallAction;
                            break;
                        case "widthPopup":
                            this.widthPopup = a.widthPopup;
                            break;
                        case "heightPopup":
                            this.heightPopup = a.heightPopup;
                            break;
                        case "banners":
                            this.banners = a.banners;
                            break;
                        default:
                            this[b] = a[b]
                    }
                }
            }
            for (var k = {
                    banners: [{
                        banner_id: "admbannergame1",
                        content: "http://adi.admicro.vn/adt/cpc/tvcads/files/others/gamefull/game.js?" + (new Date).getTime(),
                        type: 1
                    }, {
                        banner_id: "admbannergame2",
                        content: "http://adi.admicro.vn/adt/cpc/tvcads/files/others/gamefull/game2.js?" + (new Date).getTime(),
                        type: 1
                    }]
                }, f = [], h = JSON.parse(player.mediaInfo.config[0].Value), b = 0; b < h.length; b++)
                for (var l = 0; l < h[b].Timelines.length; l++) {
                    var a = h[b].Timelines[l],
                        e = a.Start;
                    e && (e = e.split(":"), e = 3600 * parseInt(e[0]) + 60 * parseInt(e[1]) + parseInt(e[2]));
                    if (a = a.End) a = a.split(":"), a = 3600 * parseInt(a[0]) +
                        60 * parseInt(a[1]) + parseInt(a[2]);
                    f.push({
                        type: h[b].Type,
                        start: e,
                        end: a
                    })
                }
            f.sort(function(a, b) {
                return a.start > b.start ? 1 : b.start > a.start ? -1 : 0
            });
            var g = {},
                n = !1,
                c;
            "undefined" != typeof k && (c = new q, c.setData(k), admGameOnVideoObject = new p, admGameOnVideoObject.admVideoPlayerSetData(k));
            AddCss("@keyframes flickerAnimation {0%   { opacity:1; }50%  { opacity:0.3; }100% { opacity:1; }}@-o-keyframes flickerAnimation{0%   { opacity:1; }50%  { opacity:0.3; }100% { opacity:1; }}@-moz-keyframes flickerAnimation{0%   { opacity:1; }  50%  { opacity:0.3; }100% { opacity:1; }}@-webkit-keyframes flickerAnimation{0%   { opacity:1; }50%  { opacity:0.3; }100% { opacity:1; }}.animate-flicker {-webkit-animation: flickerAnimation 1s infinite;-moz-animation: flickerAnimation 1s infinite;-o-animation: flickerAnimation 1s infinite;animation: flickerAnimation 1s infinite;} .animate-flicker2 {-webkit-animation: flickerAnimation 1s infinite;-moz-animation: flickerAnimation 1s infinite;-o-animation: flickerAnimation 1s infinite;animation: flickerAnimation 1s infinite;    display: block;top: -4px;width: 14px;height: 14px;background: #ff5400;border-radius: 100%;visibility: visible !important;}.animate-flicker3{-webkit-animation: flickerAnimation 1s infinite;-moz-animation: flickerAnimation 1s infinite;-o-animation: flickerAnimation 1s infinite;animation: flickerAnimation 1s infinite;}.animate-flicker3:before {background: url(http://vcplayer.vcmedia.vn/1.1/vcplayer/kenh14/skin/k14vp-pause-icon.png) top left no-repeat !important;background-size: 20px !important;}");
            player.on("timeupdate", function() {
                f[0] && !player.hasClass("vjs-ad-playing") && (player.currentTime() >= f[0].start && 1 != g[c.banners[0].banner_id] && m(0), player.currentTime() >= f[0].start && 1 == n && 1 != g[c.banners[1].banner_id] && (document.getElementById("admGameOnVideowrap_questions").style.width = "100%", document.getElementById("admGameOnVideowrap_questions").style.height = "100%", document.getElementById("admGameOnVideowrap_questions").style.top = "0px", document.getElementById("admGameOnVideowrap_questions").style.left =
                    "0px", m(1)))
            });
            player.on(["play", "playing"], function() {
                document.getElementsByClassName("vjs-play-control")[0].classList.remove("animate-flicker3");
                document.getElementsByClassName("vjs-current-time-display")[0].classList.remove("animate-flicker");
                document.getElementsByClassName("vjs-slider-handle")[0].classList.remove("animate-flicker2")
            })
        }
        if (player.mediaInfo.isListBox) {
            var handePlay = function() {
                if (postMessagePause == false) parent.postMessage("admBoxListVideo.onHandlerPause()", "*");
                else postMessagePause =
                    false
            };
            postMessagePause = false;
            player.on("pause", handePlay)
        }
        if (player.mediaInfo.showIconMute) {
            var stateMute = "off";
            var controbar = document.getElementsByClassName("vjs-control-bar")[0];
            var imgIconMute = '<div id="vjs_icon_mute_contain" style="position:absolute;right:15px;bottom:60px;-webkit-transition: 1s;transition: 1s;"><img src="http://adi.vcmedia.vn/adt/cpc/tvcads/files/others/player/pluginadmicro/images/music_1462875995.gif" alt="" id="vjs_imgMute"><p id="vjs_admTextMusic" style="text-transform: uppercase;opacity: 0.5;color: #fff;text-align: center;font-family: arial;margin: 0;font-size:14px;">' +
                stateMute + "</p><div>";
            var iconMute = document.createElement("div");
            iconMute.id = "vjs_icon_mute";
            iconMute.innerHTML = imgIconMute;
            controbar.appendChild(iconMute);
            iconMute.addEventListener("click", function() {
                if (stateMute == "off") {
                    stateMute = "on";
                    document.getElementById("vjs_admTextMusic").innerHTML = stateMute;
                    player.muted(false);
                    player.volume(.5)
                } else {
                    stateMute = "off";
                    document.getElementById("vjs_admTextMusic").innerHTML = stateMute;
                    player.muted(true)
                }
                parent.postMessage('admBoxTopVideo.onHandlerMute("' + stateMute +
                    '")', "*")
            })
        }

        function AddCss(a) {
            var b = document.createElement("style");
            b.type = "text/css";
            document.getElementsByTagName("head")[0].appendChild(b);
            b.styleSheet ? b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a))
        }
        if (player.mediaInfo._controlbar == "hide") {
            AddCss(".hide-control-bar .vast-skip-button,.hide-control-bar .vjs-res-button,.hide-control-bar .vjs-big-play-button,.hide-control-bar .vjs-K14Duration-content,.hide-control-bar .vjs-volume-control,.vjs-mute-control,.hide-control-bar .vjs-titleVideo-content,.hide-control-bar .vjs-play-control,.hide-control-bar .vjs-current-time,.hide-control-bar .vjs-time-divider,.hide-control-bar .vjs-time-divider,.hide-control-bar .vjs-duration,.hide-control-bar.vjs-fullscreen-control{display:none !important}.hide-control-bar:before{display:none!important;}.hide-control-bar{position:fixed!important;z-index:11;bottom:-5px!important;height:5px!important;}");
            var d = document.getElementsByClassName("vjs-control-bar")[0];
            d.className += " hide-control-bar"
        }

    };

    admicroADSPlugin = function(options) {
        let player = this;
        let zoneIDMobile = [];
        zoneIDMobile.dantri = 5939;
        zoneIDMobile.kenh14 = 5938;
        zoneIDMobile.genk = 5940;
        zoneIDMobile.gamek = 5940;
        zoneIDMobile.afamily = 5942;
        zoneIDMobile.autopro = 5944;
        zoneIDMobile.cafef = 5943;
        zoneIDMobile.linkhay = 5941;
        zoneIDMobile.giadinhnet = 5945;
        zoneIDMobile["71"] = 2657;
        zoneIDMobile.sohanews = 5818;
        zoneIDMobile.soha = 5818;
        zoneIDMobile.channelvn = 2657;
        zoneIDMobile.cafebiz =2661;
        zoneIDMobile.vcmedia = "vcmedia";
        zoneIDMobile.thegioivanhoa = 6703;
        zoneIDMobile.phim14 = 7692;
        zoneIDMobile["beta.autopro"] = 5944;
        zoneIDMobile.vtv = 23260;
        zoneIDMobile.ttvn = 25438;
        zoneIDMobile.thanhnien = 37079;
        zoneIDMobile.docbao = 7493;
        zoneIDMobile.thethaovanhoa = 6331;
        zoneIDMobile.anninhthudo = 16834;
        zoneIDMobile.bongda24h = 32159;
        zoneIDMobile.bongdanet=11227;
        zoneIDMobile.laodong=10698;
        zoneIDMobile.vtc = 6300;
        let zoneID = [];
        zoneID.kenh14 = 2656;
        zoneID.dantri = 2657;
        zoneID.autopro = 2760;
        zoneID.afamily = 2763;
        zoneID.genk = 2658;
        zoneID.gamek = 2658;
        zoneID.cafef = 2661;
        zoneID.cafebiz = 2661;
        zoneID.giadinh = 2971;
        zoneID.libero = 4298;
        zoneID.nld = 2790;
        zoneID.phapluattp = 2787;
        zoneID.phapluattp = 2787;
        zoneID.sannhac = 2762;
        zoneID.socnhi = 3034;
        zoneID.sohanews = 2761;
        zoneID.soha =2761;
        zoneID.suckhoedoisong = 2972;
        zoneID.vneconomy = 3385;
        zoneID["beta.autopro"] = 2760;
        zoneID.vtv = 6301;
        zoneID.ttvn = 25437;
        zoneID.thanhnien = 37079;
        zoneID.docbao = 7493;
        zoneID.thethaovanhoa = 6331;
        zoneID.anninhthudo = 16834;
        zoneID.bongda24h = 32159;
        zoneID.bongdanet=11227;
        zoneID.laodong=10698;
        zoneID.ole=42329;
        zoneID.go=42341;
        zoneID.tintuc=42331;
        zoneID.lichthidau=42334;
        zoneID.docbaogiay=42337;
        zoneID.vntinnhanh=42338;
        zoneID.thanhnien=37079;
        zoneID.tuoitre=42339;
        zoneID.ale=42340;
        zoneID.bongda=42333;
        zoneID.vtc = 6300;
        let mediaInfo = new function() {
            this.creatInfo = function() {
                this.getZoneID = function(site) {
                    if (player.mediaInfo.isMobile) return zoneIDMobile[site];
                    else return zoneID[site]
                };
                if (typeof player.mediaInfo._admParamTvc != "undefined" && player.mediaInfo._admParamTvc != "") this.admParam = player.mediaInfo._admParamTvc;
                else this.admParam = "0;0;0;0";
                if (typeof player.mediaInfo._site != "undefined" && player.mediaInfo._site !=
                    "") this.zoneId = this.getZoneID(player.mediaInfo._site);
                else this.zoneId = "2760";
                if(document.referrer.indexOf('dantri.channelvn.net') != -1)this.zoneId = "39546";
                if (typeof player.mediaInfo.tag != "undefined" && player.mediaInfo.tag != "") this.tag = player.mediaInfo.tag;
                if (typeof player.mediaInfo.videoID != "undefined" && player.mediaInfo.videoID != "") this.videoID = player.mediaInfo.videoID;
                else this.videoID = "0";
                if (typeof player.mediaInfo.domain != "undefined" && player.mediaInfo.domain != "") this.domain = player.mediaInfo.domain;
                else this.domain = "null";
                if (typeof player.mediaInfo.pathname != "undefined" &&
                    player.mediaInfo.pathname != "") this.pathname = player.mediaInfo.pathname;
                else this.pathname = "null"
            }
        }

        function createDataAds() {


            var time =(new Date).getTime(), vast, admBannerID, admTvcParam = "";
            mediaInfo.creatInfo();
            admTvcParam = mediaInfo.admParam;
            if (_admParamTVC != "" && _admParamTVC != null) admTvcParam = _admParamTVC;
            if (typeof mediaInfo.tag == "number" || mediaInfo.tag) admTvcTag = mediaInfo.tag;
            else {
                admTvcTag = 0;
                player.on("updateMediaInfo", function() {
                    admTvcTag = player.mediaInfo.tag
                })
            }

            function isEpl() {
                var config = player.mediaInfo.config;
                if (config && config.length) {
                    var setting = {is_epl: false};
                    config.map(function(option) {
                        switch (option.Type) {
                            case 2:
                                setting.is_epl = option.Value === '1';
                                break;
                        }
                    });

                    if (setting.is_epl) {
                        return true;
                    }
                }

                return false;
            }
            function triggerNomalPlayer() {
              vast = {
                  url: "//lg.logging.admicro.vn/proxy?p=2;1;" + admTvcParam + ";" + mediaInfo.zoneId + ";" + admTvcTag + ";0;" + mediaInfo.domain + "&path=" + mediaInfo.pathname +
                      "?r=" + time
              };

                /*if(isIPSeted&&admTvcTag !=0){
                  vast = {
                    url: "//adi.admicro.vn/adt/cpc/tvcads/072016/ads_preroll_1468481655.xml"
                };
                let img = new Image();
                img.src= 'https://adnetwork.admicro.vn/tvc/pk/?bid=14157&p=385:dahuong|632:'+admMyIP;
              }*/
              let checkEPL =isEpl();
                if(player.mediaInfo.vid.indexOf('premierleague/')!= -1 || player.mediaInfo.eplpre == 'true' ||checkEPL==true ){
                  let rd = Math.floor(Math.random()*10);
                  if(rd<10) admBannerID = "395127";
                  else if(!player.mediaInfo.boxVideoID && rd<10){}
                  admTvcParam = admTvcParam.split(";");
                  admTvcParam[0] = admBannerID;
                  admTvcParam = admTvcParam.join(";");
                  vast = {
                      url: "//lg.logging.admicro.vn/proxy?p=2;1;" + admTvcParam + ";" + mediaInfo.zoneId + ";" + admTvcTag + ";0;" + mediaInfo.domain + "&path=" + mediaInfo.pathname +
                          "?r=" + time
                  };
                }
                if (_chkPrLink != false){
                  admTvcTag = 0;
                 vast = {
                     url: "//lg.logging.admicro.vn/proxy?p=2;1;" + '0;0;0;0' + ";" + mediaInfo.zoneId + ";" + admTvcTag + ";0;" + mediaInfo.domain + "&path=" + mediaInfo.pathname +
                         "?r=" + time
                 };
                }
                if (mediaInfo.domain == 'b3.channelvn.net'){

                 vast = {
                     url: "//adi.admicro.vn/adt/cpc/tvcads/122016/ads_preroll_1481515851.xml?r=" + time
                 };
                }
                if (typeof player.mediaInfo.vast != "undefined") vast = {
                    url: decodeURIComponent(player.mediaInfo.vast)
                };
                return vast.url;
            }

            function admCheckTagAudien() {
                    admBannerID = "384597";
                    admTvcParam = admTvcParam.split(";");
                    admTvcParam[0] = admBannerID;
                    admTvcParam = admTvcParam.join(";");
                    if (_chkPrLink != false) admTvcTag = 0;
                    vast = {
                        url: "//lg.logging.admicro.vn/proxy?p=2;1;" + admTvcParam + ";" + mediaInfo.zoneId + ";" + admTvcTag + ";0;" + mediaInfo.domain + "&wrap=" + encodeURIComponent(tagAudien) + "&path=" + mediaInfo.pathname + "?r=" + time
                    };
                    if (admTvcTag == 0) vast = {
                        url: "//lg.logging.admicro.vn/proxy?p=2;1;" + admTvcParam + ";" + mediaInfo.zoneId + ";" + admTvcTag + ";0;" + mediaInfo.domain + "&path=" + mediaInfo.pathname + "?r=" + time
                    };
                    if (typeof player.mediaInfo.vast != "undefined") vast = {
                        url: decodeURIComponent(player.mediaInfo.vast)
                    };
                  return vast.url;
            }

            function admRunAds() {
                if (player.mediaInfo.isMobile) {
                  vast = {
                      url: "//lg.logging.admicro.vn/proxy?p=2;1;" + admTvcParam + ";" + mediaInfo.zoneId + ";" + admTvcTag + ";0;" + mediaInfo.domain + "&path=" + mediaInfo.pathname +
                          "?r=" + time
                  };

                    if (_chkPrLink != false) admTvcTag = 0;
                    vast = {
                        url: "//lg.logging.admicro.vn/proxy?p=2;1;" + admTvcParam + ";" + mediaInfo.zoneId + ";" + admTvcTag + ";0;" + mediaInfo.domain + "&path=" + mediaInfo.pathname + "?r=" + time
                    };
                    let checkEPL =isEpl();
                    if(player.mediaInfo.vid.indexOf('premierleague/')!= -1 || player.mediaInfo.eplpre == 'true' ||checkEPL==true ){
                      let rd = Math.floor(Math.random()*10);
                      if(rd<10) admBannerID = "395128";
                      admTvcParam = admTvcParam.split(";");
                      admTvcParam[0] = admBannerID;
                      admTvcParam = admTvcParam.join(";");
                      vast = {
                          url: "//lg.logging.admicro.vn/proxy?p=2;1;" + admTvcParam + ";" + mediaInfo.zoneId + ";" + admTvcTag + ";0;" + mediaInfo.domain + "&path=" + mediaInfo.pathname + "?r=" + time
                      };
                    }
                    if (typeof player.mediaInfo.vast != "undefined") vast = {
                        url: decodeURIComponent(player.mediaInfo.vast)
                    };

                    return vast.url;
                } else if (tagAudien != "" && tagAudien != "notag") return admCheckTagAudien();
                else return triggerNomalPlayer()
            }

            if (typeof player.mediaInfo.isads != "undefined" && player.mediaInfo.isads == "false")return '';
            else return admRunAds()
        }
        if(player.mediaInfo.replay != 'undefined' && player.mediaInfo.replay=='true' && isTimeReplay == 0 && !player.mediaInfo.boxVideoID){
          isTimeReplay =1 ;
          return false;
        }else if(isTimeReplay == 0 && player.mediaInfo.nopre=='true'){
          isTimeReplay =1 ;
          return false;
        }

        return createDataAds();
    }
    vcplayer.plugin("admicroAPI", admicroAPIPlugin)
    vcplayer.plugin("admicroADS", admicroADSPlugin);
})(window, window.vcplayer);

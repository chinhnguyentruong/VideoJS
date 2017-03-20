//check speed network
(function() {
    function n() {
        var c = new Image,
            f = new Image,
            g = new Image,
            a = (new Date).getTime(),
            d = 0,
            h = 0,
            k = 0,
            l = 0;
        c.onload = function() {
            h = (new Date).getTime() - a;
            d++
        };
        f.onload = function() {
            k = (new Date).getTime() - a;
            d++
        };
        g.onload = function() {
            l = (new Date).getTime() - a;
            d++
        };
        var b = "",
            m = !1;
        if (1 >= Math.floor(10 * Math.random())) {
            var m = !0,
                e = new Image;
            e.onerror = function() {
                b = "-1"
            };
            e.onload = function() {
                b = (new Date).getTime() - a
            };
            e.src = "http://www.lazada.vn/favicon.ico"
        }
        f.src = "http://admicro5.vcmedia.vn/rtc?rd=" + Math.random();
        c.src =
            "//admicro4.vcmedia.vn/rtc?rd=" + Math.random();
        g.src = "//admicro6.vcmedia.vn/rtc?rd=" + Math.random();
        window.setTimeout(function() {
            var a = "",
                c = "";
            m && ("" == b && (e.src = "", b = "loop"), a = "_lz", c = "_" + b);
            b = "loop";
            3 == d && ((new Image).src = "http://lg.logging.admicro.vn/rtc?dmn=ad4_ad5_ad6" + a + "&d=" + (h + "_" + k + "_" + l + c), ADS_CHECKER.setStorage("__speednw", "1", 360, "/"))
        }, 1E4)
    }
    "" == ADS_CHECKER.getStorage("__speednw") && "https:" != window.location.protocol && n()
})();

//call get param
var playerTvc, playerIframe, isAudienceCreated = !1;
window.addEventListener ? window.addEventListener("message", function(a) {
    "addParam" == a.data && a.source.postMessage('addParamTVC("' + admParamTvc() + '")', a.origin);
    "admGetIP" == a.data && a.source.postMessage('admSetIP("' + _AdmGetIP("__IP") + '")', a.origin);
    if(a.origin.indexOf("vcmedia.vn")!= -1 && a.data.toSring().indexOf("_admTargetTvcPreroll")!= -1)
    {
      eval(e.data);
    }
    "chkPrLink" == a.data && "undefined" != typeof _chkPrLink && a.source.postMessage('addChkPrLink("' + _chkPrLink + '")', a.origin); - 1 !== a.origin.indexOf("vcmedia.vn") && -1 !== a.data.toString().indexOf(".html") ? (playerIframe = a.origin, playerTvc = a.source, ExpandableTVCPreroll(a.data)) :
    "getDataAudien" != a.data || isAudienceCreated || (_AdmAudienData.createTag(a), isAudienceCreated = !0)
}, !1) : window.attachEvent && window.attachEvent("onmessage", function(a) {
    "addParam" == a.data && a.source.postMessage('addParamTVC("' + admParamTvc() + '")', a.origin);
    "admGetIP" == a.data && a.source.postMessage('admSetIP("' + _AdmGetIP("__IP") + '")', a.origin);
    if(a.origin.indexOf("vcmedia.vn")!= -1 && a.data.toSring().indexOf("_admTargetTvcPreroll")!= -1)
    {
      eval(e.data);
    }
    "chkPrLink" == a.data && "undefined" != typeof _chkPrLink && (console.log("event.data :" + a.data), a.source.postMessage('addChkPrLink("' + _chkPrLink + '")', a.origin)); - 1 !== a.origin.indexOf("vcmedia.vn") && -1 !== a.data.toString().indexOf(".html") ? (playerIframe = a.origin,
        playerTvc = a.source, ExpandableTVCPreroll(a.data)) : "getDataAudien" != a.data || isAudienceCreated || (_AdmAudienData.createTag(a), isAudienceCreated = !0)
});
window.addEventListener("message", function(a) {
    "admCloseExpandVpaidHtml" == a.data && CloseTVCPreroll();
    "admSendClickTracking" == a.data && posMesClickTracking()
});
var _AdmPrerollIplay = new function() {
    this.create = function(a) {
        var b = document.createDocumentFragment(),
            c = document.createElement("div");
        for (c.innerHTML = a; c.firstChild;) b.appendChild(c.firstChild);
        return b
    };
    this.expand = function(a) {
        document.body.style.overflow = "hidden";
        if (void 0 == document.getElementById("_AdmPrerollIplay")) {
            var b = this.create('<div  class="blockUI blockMsg blockPage" style="width:100%; height:100%;border: 0px none; margin: 0px; padding: 0px; text-align: left; overflow: visible; position: fixed; z-index: 100000; top: 0px; left: 0px;" dir="ltr" id="_AdmPrerollIplay"></div>');
            document.body.insertBefore(b, document.body.childNodes[0])
        }
        b = document.getElementById("_AdmPrerollIplay");
        b.style.display = "";
        b.style.left = "0px";
        b.style.top = "0px";
        b.innerHTML = '<iframe  width="100%" height="100%" frameborder="0" scrolling="no" src="' + a + '" ></iframe>'
    };
    this.closeExpand = function() {
        document.body.style.overflow = "auto";
        var a = document.getElementById("_AdmPrerollIplay");
        a.innerHTML = "";
        a.style.display = "none"
    }
};

function ExpandableTVCPreroll(a) {
    _AdmPrerollIplay.expand(a)
}

function CloseTVCPreroll() {
    _AdmPrerollIplay.closeExpand();
    playerTvc.postMessage("CloseExpandable", playerIframe)
}

function posMesClickTracking() {
    playerTvc.postMessage("admSendClickTracking", playerIframe)
}
function _admTargetTvcPreroll(bid){
    var keyTarget = "484";
    var retarObject = _jsGetfrlso('retargetPopup');

      if(typeof retarObject !='undefined' && retarObject!='' && typeof retarObject !='object') retarObject = JSON.parse(retarObject);
      var checkExistTarget = false;

      for(var i in retarObject)
      {
        if(i == bid) checkExistTarget = true;
      }

      if(!checkExistTarget)
      {
        if(!retarObject) retarObject = {};
        var time = (new Date()).getTime();
        var expTime = time + 18144*1e2;
        var ele = new Object();
        ele.target = keyTarget;
        ele.timestamp = expTime;
        retarObject[bid]= ele;

        retarObject = JSON.stringify(retarObject);

        _jsSetfrlso('retargetPopup',retarObject);
      }
}
function _AdmGetIP(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    return "noip"
}
var _AdmAudienData = new function() {
    this.createTag = function(a) {
        var b = (new Date).getTime(),
            c = document.createElement("script"),
            b = "//pq-direct.revsci.net/pql?placementIdList=RVHyEf&cb=" + b,
            d = document.getElementsByTagName("script")[0];
        c.async = !0;
        c.onload = function() {
            if ("undefined" != typeof asiPlacements) {
                "undefined" != typeof asiPlacements.RVHyEf && "undefined" != typeof asiPlacements.RVHyEf["default"] && (window.gwdTagDataAdGroup = "adgroup=" + asiPlacements.RVHyEf["default"].key, window.gwdTagDataBlob = "blob=" + asiPlacements.RVHyEf.blob,
                    window.gwdTagDataAdserver = "adserver=" + asiAdserver, window.asiAdserver = asiAdserver);
                for (var b in asiPlacements) {
                    window["ASPQ_" + b] = "";
                    for (var c in asiPlacements[b].data) window["ASPQ_" + b] += "PQ_" + b + "_" + c
                }
            }
            console.log("send message: @", (new Date).getTime(), _AdmAudienData.getDataAudien());
            a.source.postMessage('setDataAudien("' + _AdmAudienData.getDataAudien() + '")', a.origin)
        };
        c.src = b;
        d.parentNode.insertBefore(c, d)
    };
    this.getDataAudien = function() {
        var a = (new Date).getTime();
        return "undefined" != typeof asiPlacements &&
            "undefined" != typeof gwdTagDataAdGroup && "undefined" != typeof gwdTagDataBlob ? "//" + asiAdserver + "/rtbads/pq?mode=s&placement=RVHyEf&" + gwdTagDataAdGroup + "&" + gwdTagDataBlob + "&cachebuster=" + a + "&click=%%http://admicro.vn%%" : "notag"
    }
};
(function() {
    var __uid = ADM_AdsTracking.get('__uid');
    AdmonDomReady(function() {
        if (typeof(window.admlgnews) == 'undefined') {
            _admloadJs('//media1.admicro.vn/core/lgnews.js');
        }

        var __AdmDomain = document.domain + '';

        var chk = ADS_CHECKER.getStorage('_fips');
        if ((__uid == '' || chk == '')) {
            ADS_CHECKER.setStorage('_fips', 1, 30, '/');
            _admloadJs('//media1.admicro.vn/core/fipmin.js');
        }
        //__admdoc
        /*
        if(__AdmDomain.indexOf('admicro.vn')==-1){
        	var pg = document.createElement('script'); pg.type = 'text/javascript'; pg.async = true;
        	pg.src = '//js.revsci.net/gateway/gw.js?csid=F09828&auto=t&bpid=admicrovn';
        	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(pg, s);
        }*/
    });

})();

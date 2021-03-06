(function (window,document) {
    function sFullpage(sOption){
      /*global variables*/
      var _isAnimate=false,
          _num=document.querySelectorAll(".fullPage").length,
          _index=0,
          _timer=null,
          _scrollTime=0,
          callbackRecord={},
          callbackObj=sOption.callback;

      /* animation funciton */
        /* @param
              @option:{
                top:100px,
                duraton:100s
              }
        */
        var sAnimate=function(el,option,callback){
            if( _timer || _isAnimate ){
              return false;
            }
            var sTime = new Date().getTime(),
                sTop=parseFloat(el.style.top),
                eTop=parseFloat(option.top),
                duration=option.duration || 300;

            function tick(){
              _isAnimate=true;
              var remaining = Math.max(0,sTime+duration-new Date().getTime());
              var temp=1-remaining/duration;
              var nowTop=sTop+(eTop-sTop)*temp;
              if(temp === 1){
                el.style.top=nowTop+"px";
                clearInterval(_timer);
                _isAnimate=false;
                _timer=null;
                if( typeof callback === "function"){
                  callback();
                  return;
                }
              }else{
                el.style.top=nowTop+"px";
              }
            }
            _timer=setInterval(tick,13);
        };

      var setStyle=function(el,cssObj){
        if(!el){
          return false;
        }
        if( typeof (cssObj) === "object"){
          for(var i in cssObj){
            el.style[i]=cssObj[i];
          }
        }
      };

      var setSizeForPages=function(){
        var wHeight=document.body.offsetHeight;
        var pArray=document.querySelectorAll(".fullPage");
        for(var i=0;i<_num;i++){
          setStyle(pArray[i],{
            "position":"relative",
            "height":wHeight+"px",
            "width":"100%",
          });
        }
        setStyle(document.querySelector(".fullPage-Container"),{
          "width":"100%",
          "position":"relative",
          "height":_num*wHeight+"px",
          "top":-_index*wHeight+"px"
        });
      };

      /*  locate to the page accroding to the hash */
      var locateToHash = function(hash){
        var nowHash =  hash.substr(1,hash.length);
        var selector    = "[page-id='"+nowHash+"']";
        var slide_to    = document.querySelector(selector);
        var wHeight=document.body.offsetHeight;
        var pArray = document.querySelectorAll(".fullPage");
        var index_to = 0;
        for(var j=0;j<_num;j++){
          if(pArray[j].getAttribute("page-id") === nowHash){
            index_to=j;
          }
        }
        sAnimate(document.querySelector(".fullPage-Container"),{top:(_index-index_to)*wHeight+"px",duration:500},function(){
          _index = index_to;
          var nowPage=document.querySelectorAll(".fullPage")[_index];
          if(!nowPage){
            return false;
          }
          var page_id=nowPage.getAttribute("page-id");
          location.hash=page_id;
          var fn=callbackObj[page_id];
          if(!callbackRecord[fn]){
            callbackRecord[fn]=1;//makesure every callback can only run once;
            setTimeout(fn,0);
          }
        });
      };

      /*  function to run when the pages first onloaded */
      var pageOnLoad=function(){
        var start_hash=location.hash;
        if(!start_hash){ /* the url has no hash . run the callback function of the first page */
          var page_id=document.querySelector(".fullPage").getAttribute("page-id");
          var fn=callbackObj[page_id];
          if(typeof fn === "function"){
            setTimeout(fn,0);
          }
        }else{
          /* if the url has hash , locate to the page */
          locateToHash(start_hash);
        }
      };

      /* if reach boundary */
      var isReachBoundary=function(arg){
        return (_index === 0 && arg === 1) || (_index === _num-1 && arg === -1);
      };

      /*
        function to control the pages to slide
        arg: 1 | -1
        1 ---- slide up
        -1 ----slide down
      */
      var pageSlide=function(arg){
        if(isReachBoundary(arg)){
          return false;
        }
        var pHeight=parseFloat(document.querySelector(".fullPage").style.height);
        var pre_top=parseFloat(document.querySelector(".fullPage-Container").style.top);
        sAnimate(document.querySelector(".fullPage-Container"),{top:pre_top+arg*pHeight+"px",duration:sOption.duration},function(){
          _index -= arg;
          if( _index > _num || _index < 0){
            return false;
          }
          var nowPage=document.querySelectorAll(".fullPage")[_index];
          if(!nowPage){
            return false;
          }
          var page_id=nowPage.getAttribute("page-id");
          location.hash=page_id;
          var fn=callbackObj[page_id];
          if(!callbackRecord[fn]){
            callbackRecord[fn]=1;//makesure every callback can only run once;
            setTimeout(fn,0);
          }
        });
      };
      /* main function to control the pages to slide when scroll the mouse*/
      var controlFuncForScroll=function(ev){
        if(new Date().getTime() < _scrollTime + 800){/* avoid the mistakes caused by scrolling too too too fast */
          return false;
        }
        _scrollTime = new Date().getTime();
        var e = ev || window.event;
        if ( e && e.preventDefault ){
          e.preventDefault();
        }
        else{
          window.event.returnValue = false;
        }
        if(e.wheelDelta){//非FireFox
          if(e.wheelDelta>0){//up
            pageSlide(1);
          }else{//down
            pageSlide(-1);
          }
        }else{//FireFox
          if(e.detail>0){//down
            pageSlide(-1);
          }else{//up
            pageSlide(1);
          }
        }
      };

      /* main function to control the pages to slide when the keyboard is pressed*/
    	var controlFuncForKeyboard=function(keyCode){
    		switch(keyCode){
    			case 37://up
    				pageSlide(1);
    				break;
    			case 38://up
    				pageSlide(1);
    				break;
    			case 39://down
    				pageSlide(-1);
    				break;
    			case 40://down
    				pageSlide(-1);
    				break;
    			default:
    		}
    	};

      var bindEvent=function(){
        /*listen to the scroll*/
        if(document.attachEvent){//IE
          document.attachEvent("onmousewheel",controlFuncForScroll,false);
        }else if (document.addEventListener){//FireFox
          document.addEventListener("DOMMouseScroll",controlFuncForScroll,false);
        }
        document.onmousewheel=controlFuncForScroll;//Safari，Chrome

        /*listen to the keyboard*/
        document.onkeydown=function(event){
          var ev = event || window.event;
          if ( ev && ev.preventDefault ){
            ev.preventDefault();
          }
          else{
            window.event.returnValue = false;
          }
          controlFuncForKeyboard(ev.keyCode);
        };

        /*listen to the window's size*/
        window.onresize=setSizeForPages;
      };

      function init(){
        setStyle(document.documentElement,{
          "width":"100%",
          "height":"100%",
          "margin":"0px",
          "padding":"0px"
        });
        setStyle(document.body,{
          "width":"100%",
          "height":"100%",
          "overflow":"hidden",
          "margin":"0px",
          "padding":"0px"
        });
        setSizeForPages();
        pageOnLoad();
        bindEvent();
      }

      return {
        init:init
      };
    }

    window.sFullpage=sFullpage;
})(window,document);

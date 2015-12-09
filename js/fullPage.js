(function(window,document){
    /* global variable */
    var _duration=1000,//animation duration
        _start=0,//animation start time;
        _num=$(".fullPage").length || 0, // number of screens to slide
        _index=0; // the index of div onView;

    /* set the style for the body and div */
    function init(){
      $("html").css({
        "width":"100%",
        "height":"100%",
        "margin":"0px",
        "padding":"0px"
      });
      $("body").css({
        "width":"100%",
        "height":"100%",
        "overflow":"hidden",
        "margin":"0px",
        "padding":"0px"
      });
      $(".fullPage").css({
        "position":"relative",
        "height":"100%",
        "width":"100%",
        "top":"0px"
      });
    }

    /* listen the scroll */
    function listenScroll(){
      if(document.attachEvent){//IE
        document.attachEvent("onmousewheel",controlFunc,false);
      }else if (document.addEventListener){//FireFox
        document.addEventListener("DOMMouseScroll",controlFunc,false);
      }
      document.onmousewheel=controlFunc;//Safari，Chrome
    }

    /*
      function to control the pages to slide
      arg: 1 | -1
      1 ---- slide up
      -1 ----slide down
    */
    function pageSlide(arg){
      if((_index === 0 && arg === -1) || (_index === _num-1 && arg === 1) ){ /* stop sliding when reach boundary */
        return false;
      }
      var pages_list=$(".fullPage");
      var pages_height=$(".fullPage").eq(0).height();
      for(var i=0,len=pages_list.length;i<len;i++){
        var pre_top=pages_list.eq(i).css("top");
        pages_list.eq(i).animate({top:parseInt(pre_top)-arg*pages_height},"normal","swing");
      }
      _index+=arg;
    }

    /* main function to control the page to slide */
    function controlFunc(ev){
      if(new Date().getTime() < _start + _duration){/* avoid the mistakes caused by scrolling too fast */
        return false;
      }
      var e = ev || window.event;
        _start=new Date().getTime();
      if( e.wheelDelta){//非FireFox
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
    }

    /* exec function */
    function go(){
      if($(".fullPage")){
        init();
        listenScroll();
      }
    }
    go();

})(window,document);

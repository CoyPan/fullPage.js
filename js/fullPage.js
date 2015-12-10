(function(window,document){
    /* global variable */
    var _duration=1000,//animation duration
        _start=0,//animation start time;
        _num=$(".fullPage").length || 0, // number of screens to slide
        _index=0; // the index of div onView;

    /* function to set size for per page */
    function setSizeForPages(){
      var screen_height=$(window).height();
      $(".fullPage").css({
        "position":"relative",
        "height":screen_height+"px",
        "width":"100%",
      });
      $(".fullPage-Container").css({
        "width":"100%",
        "position":"relative",
        "height":_num*screen_height+"px",
        "top":-_index*screen_height+"px"
      });
    }

    /* set the style for the whole page */
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
      setSizeForPages();
      $(window).resize(setSizeForPages);
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

    /* change the str to a function name. every function can only run once */
    function strTofunc(str){
      if(document.getElementById(str)){
        return false;
      }
      var script=$("<script text='text/javascript' id="+str+"></script>");
      script.html(str+"()");
      script.appendTo($("body"));
    }

    /* function to run when the pages first onloaded */
    function pagesOnload(){
      var start_hash=location.hash;
      if(!start_hash){ /* the url has no hash . run the callback function of the first page */
        var callback = $(".fullPage").eq(0).attr("inView");
        strTofunc(callback);
      }
      /* if the url has hash , locate to the page */
      var selector="[page-id='"+start_hash.substr(1,start_hash.length)+"']";
      var slide_to=$(selector);
      var index_to=slide_to.index();
      var page_height=slide_to.height();
      $(".fullPage-Container").animate({top:(_index-index_to)*page_height+"px"},"normal","swing",function(){
        _index=index_to;
        location.hash=$(".fullPage").eq(_index).attr("page-id");
        var callback = $(".fullPage").eq(_index).attr("inView");
        strTofunc(callback);
      });
    }

    /* if reach boundary */
    function isReachBoundary(arg){
      return (_index === 0 && arg === 1) || (_index === _num-1 && arg === -1);
    }

    /*
      function to control the pages to slide
      arg: 1 | -1
      1 ---- slide up
      -1 ----slide down
    */
    function pageSlide(arg){
      if(isReachBoundary(arg)){
        return false;
      }
      var page_height=$(".fullPage").eq(0).height();
      var pre_top=parseInt($(".fullPage-Container").css("top"));
      _index-=arg;
      var callback=$(".fullPage").eq(_index).attr("inView");
      return $(".fullPage-Container").animate({top:pre_top+arg*page_height+"px"},400,"swing",function(){
        strTofunc(callback);
        location.hash=$(".fullPage").eq(_index).attr("page-id");
      });
    }

    /* main function to control the pages to slide */
    function controlFunc(ev){
      if(new Date().getTime() < _start + _duration){/* avoid the mistakes caused by scrolling too fast */
        return false;
      }
      var e = ev || window.event;
        _start=new Date().getTime();
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
    }

    /* exec function */
    function go(){
      if($(".fullPage")){
        init();
        listenScroll();
        pagesOnload();
      }
    }
    go();

})(window,document);

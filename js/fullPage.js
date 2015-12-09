(function(window,document){

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
        "width":"100%"
      });
    }

    /* listen the scroll */
    function listenScroll(){

    }

    /* function to control the page to slide */
    function pageSlide(){

    }

    /* exec function */
    function go(){
      if($(".fullPage")){
        init();
      }

    }
    go();

})(window,document);

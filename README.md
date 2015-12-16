# fullPage.js
**v 0.1**
### 简介
一个帮助实现整屏页面竖直上下切换效果的小工具。使用鼠标滚轮或者键盘方向键进行页面的切换。
###使用方法
    <div class="fullPage-Container">
      <div id="page1" class="fullPage" page-id='page-one' inView="func1">1</div>
      <div id="page2" class="fullPage" page-id='page-two' inView="func2">2</div>
      <div id="page3" class="fullPage" page-id='page-three' inView="func3">3</div>
      <div id="page4" class="fullPage" page-id='page-four' inView="func4">4</div>
    </div>

* 引用jQuery,在HTML页面的底部调用fullPage.js。
* 每一页均使用class属性为『fullPage』的div标签表示。
* inView属性为:当前页进入屏幕时执行的回调函数。(每个回调函数只会被执行一次)。
* 所有的页面需要用一个外层的class属性为『fullPage-Container』的div标签包裹。

---------
###一个例子
######index.html代码如下:
    <div class="fullPage-Container">
      <div id="page1" class="fullPage" page-id='page-one' inView="func1"></div>
      <div id="page2" class="fullPage" page-id='page-two' inView="func2"></div>
      <div id="page3" class="fullPage" page-id='page-three' inView="func3"></div>
      <div id="page4" class="fullPage" page-id='page-four' inView="func4"></div>
    </div>
    <script type="text/javascript">
      function func1(){
        alert(1);
      }
      function func2(){
        alert(2);
      }
      function func3(){
        alert(3);
      }
      function func4(){
        alert(4);
      }
    </script>
    <script src="js/fullPage.js" charset="utf-8"></script>
######css代码如下:
      #page1{
        background-color: rgba(150,217,255,1);
      }
      #page2{
        background-color: rgba(121,200,191,1);
      }
      #page3{
        background-color: rgba(218,238,191,1);
      }
      #page4{
        background-color: rgba(222, 222, 222, 1);
      }

--------
###需要改进的地方
* 没有适配移动端
* 代码太烂
* 使用Mac触摸板滑动会出现一次跳两页的情况


  
  

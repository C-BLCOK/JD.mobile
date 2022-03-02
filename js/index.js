document.addEventListener("DOMContentLoaded", function () {
  var banner = document.querySelector(".banner");
  var bannerWidth = banner.offsetWidth;
  var ul = banner.querySelector("ul");
  var ol = banner.querySelector("ol");
  var flag = false;
  var index = 0;
  ol.children[0].classList.add("current"); //先给第一个点添加背景
  /* *****  1、开启轮播 ***** */
  //用定时器实现动画
  var timer = setInterval(function () {
    //每调用一次定时器 index ++ 一次
    index++;
    //每调用一次动画 向左移动一张图
    var translate = -index * bannerWidth;
    ul.style.transition = "all .9s"; //加过度效果实现缓慢移动
    ul.style.transform = "translateX(" + translate + "px)";
    /* *******************  2、循环轮播  *************** */
    if (index >= 6) {
      index = 0;
      //取消过渡，实现秒跳第一张
      ul.style.transition = "none";
      var translate = -index * bannerWidth;
      ul.style.transform = "translateX(" + translate + "px)";
    } else if (index < 0) {
      index = 2;
      ul.style.transition = "none";
      // 利用最新的索引号乘以宽度 去滚动图片
      var translatex = -index * bannerWidth;
      ul.style.transform = "translateX(" + translatex + "px)";
    }
    /* **************  3、索引点轮播 **************** */
    //将ol中有current类的li选取出来,去掉current类
    ol.querySelector("li.current").classList.remove("current");
    //给当前li添加current类
    ol.children[index].classList.add("current");
  }, 2000);
  /* ****************  4、手指滑动图片  ************ */
  var touchPosition = 0;
  var touchMoveX = 0;
  ul.addEventListener("touchstart", function (e) {
    flag = false;
    clearInterval(timer);
    touchPosition = e.targetTouches[0].pageX;
  });
  ul.addEventListener("touchmove", function (e) {
    touchMoveX = e.targetTouches[0].pageX - touchPosition;
    var boxMoveX = -index * bannerWidth + touchMoveX;
    ul.style.transition = "none";
    ul.style.transform = "translateX(" + boxMoveX + "px)";
    flag = true;
  });

  /* ************* 回弹效果  *********************** */
  ul.addEventListener("touchend", function () {
    ul.style.transition = "all .9s";
    setInterval(timer);
    if (flag) {
      if (Math.abs(touchMoveX) > 50) {
        if (touchMoveX > 0) {
          index--;
        } else if (touchMoveX < 0) {
          index++;
        }
        ul.style.transition = "all .9s";
        ul.style.transform = "translateX(" + boxMoveX + "px)";
      }
    }
    var boxMoveX = -index * bannerWidth;
    ul.style.transition = "all .9s";
    ul.style.transform = "translateX(" + boxMoveX + "px)";
    /* *************  重启定时器  ************ */
    clearInterval(timer);
    setInterval(function () {
      //每调用一次定时器 index ++ 一次
      index++;
      //每调用一次动画 向左移动一张图
      var translate = -index * bannerWidth;
      ul.style.transition = "all .9s"; //加过度效果实现缓慢移动
      ul.style.transform = "translateX(" + translate + "px)";
      /* *******************  2、循环轮播  *************** */
      if (index >= 6) {
        index = 0;
        //取消过渡，实现秒跳第一张
        ul.style.transition = "none";
        var translate = -index * bannerWidth;
        ul.style.transform = "translateX(" + translate + "px)";
      } else if (index < 0) {
        index = 2;
        ul.style.transition = "none";
        // 利用最新的索引号乘以宽度 去滚动图片
        var translatex = -index * bannerWidth;
        ul.style.transform = "translateX(" + translatex + "px)";
      }
      /* **************  3、索引点轮播 **************** */
      //将ol中有current类的li选取出来,去掉current类
      ol.querySelector("li.current").classList.remove("current");
      //给当前li添加current类
      ol.children[index].classList.add("current");
    }, 2000);
  });
});

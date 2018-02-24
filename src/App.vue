<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>




<style>
@import "../static/css/main.css";
@import "../static/css/color-dark.css";


/*底部横细线*/
.underline {
  position: relative;
}
.underline:after {
  position: absolute;
  content: '';
  background: #dcdcdc;
  height: 1px;
  width: 100%;
  bottom: 0;
  left: 0;
  transform-origin: 0 0;
  transform: scaleY(0.5);
}
/* 设置滚动条的样式 */
/*::-webkit-scrollbar {
   width: 0px;
}*/
</style>
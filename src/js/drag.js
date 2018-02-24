 //封装设置css属性方法
   function setCss(obj, cssList) {
       for (var attr in cssList) {
           obj.style[attr] = cssList[attr];
       }
   }

   //封装类名操作
   //增加类名
   function addClass(obj, _classname) {
       var classNames = obj.className //获取当前按钮的class,返回的是字符串
       var tf = classNames.search(_classname) >= 0 ? true : false; //查找匹配的类名位置，如果返回-1说明没有这个类名， classNames.search(_classname)>=0 == false
       if (!tf) {
           classNames = classNames + ' ' + _classname;
           obj.className = classNames;
       }
   }
   //删除类名
   function removeClass(obj, _classname) {
       var classNames = obj.className.split(' ');
       var index = classNames.indexOf(_classname);
       classNames.splice(index, 1);
       classNames = classNames.toString().replace(',', ' ');
       obj.className = classNames;
   }


   //var parentBox;

  export function dragItem(a) {
       //init();
      for(let i = 0; i <= a.length; i++){
        var name = a[i];
        name = new DragDrop(a[i]);
        name.init();
      }
   }

   function DragDrop(id) {
       this.parentBox = document.getElementById(id);
       this.editSwith = this.parentBox.querySelector('.editOrder');
       console.log('1')
       this.list = this.parentBox.querySelector('.list');
       console.log('2')
       this.li = this.list.querySelectorAll('li');
       console.log(this.li)
       this.aPosXY = []; //原始位置
       this.aPosXYClone = [];
       this.moveStatus = false; //移动状态
       this.editAble = false; //编辑状态
       this.dashedBox = null;
       this.moveItem = null;
       this.moveItemH = null;
       this.mouseDownPos = [];
       this.inScope = false;
   }

   DragDrop.prototype.init = function() {
       var _this = this;
       this.list.style.height = this.li.length * (this.li[0].offsetHeight + parseInt(document.defaultView.getComputedStyle(this.li[0]).marginBottom)) + 'px';

       for (var i = 0; i < this.li.length; i++) {
           var posXY = [];
           var posX = this.li[i].offsetLeft; //获取当前元素相对父级元素的偏移量 x；
           var posY = this.li[i].offsetTop; //获取当前元素相对父级元素的偏移量 y；
           posXY.x = posX + 'px';
           posXY.y = posY + 'px';
           this.aPosXY.push(posXY);
           this.li[i].setAttribute('data-index', i)
       }

       for (var i in this.aPosXY) {
           setCss(this.li[i], {
               'position': 'absolute',
               'left': this.aPosXY[i].x,
               'top': this.aPosXY[i].y
           })
       }

       this.editSwith.onclick = function() {
           _this.edit();
       }

       for (var i = 0; i < this.li.length; i++) {
           this.li[i].onmousedown = function(event, t) {
               if (_this.editAble) {
                   _this.mouseDown(event, this);
               }
           }

           this.li[i].onmouseup = function() {
               if (_this.editAble) {
                   _this.moveStatus = false; //关闭可移动状态
                   _this.mouseUp(_this.moveItem);
               }
           }
       }

       this.list.onmousemove = function(event) {
           if (_this.moveStatus) {
               _this.mouseMove(event, _this.moveItem);
           }
       }
   }

   //鼠标移动
   DragDrop.prototype.mouseMove = function(e, obj) {

       var relativeListX = e.pageX - this.list.offsetLeft; //鼠标相对ul的位置 x
       var relativeListY = e.pageY - this.list.offsetTop; //鼠标相对ul的位置 y
       var objIndex = obj.getAttribute('data-index'); //获取当前选中元素的下标
       var objLeft = this.aPosXY[objIndex].x;
       var objTop = this.aPosXY[objIndex].y; //根据下标获取当前选中元素 固定的时候的定位 x,y;
       //      console.log('objLeft：'+objLeft+'  objTop：'+objTop); //  objLeft：10px  objTop：10px
       var relativeObjX = this.mouseDownPos.x - parseInt(objLeft); //鼠标按下时鼠标相对于选中元素的位置x
       var relativeObjY = this.mouseDownPos.y - parseInt(objTop); //鼠标按下时鼠标相对于选中元素的位置y
       var objMoveX = relativeListX - relativeObjX;
       var objMoveY = relativeListY - relativeObjY;
       //      console.log(objMoveX +'  '+objMoveY)
       //      console.log('x:'+relativeListX+' y:'+relativeListY);
       //      console.log('x:'+relativeObjX+' y:'+relativeObjY);
       setCss(obj, {
           'left': objMoveX + 'px',
           'top': objMoveY + 'px'
       });
       for (var i = 0; i < this.aPosXYClone.length; i++) {
           if (!(i == objIndex)) {
               if (objMoveY + obj.offsetHeight >= parseInt(this.aPosXYClone[i].y) + this.li[i].offsetHeight / 2 && objMoveY + obj.offsetHeight < parseInt(this.aPosXYClone[i].y) + this.li[i].offsetHeight || objMoveY >= parseInt(this.aPosXYClone[i].y) && objMoveY < parseInt(this.aPosXYClone[i].y) + this.li[i].offsetHeight / 2) {
                   //            console.log(i);
                   var ts = [];
                   ts.x = this.dashedBox.style.left;
                   ts.y = this.dashedBox.style.top;
                   this.aPosXYClone[objIndex] = this.aPosXYClone[i];
                   this.aPosXYClone[i] = ts;
                   setCss(this.dashedBox, {
                       'left': this.aPosXYClone[objIndex].x,
                       'top': this.aPosXYClone[objIndex].y
                   });
                   setCss(this.li[i], {
                       'left': ts.x,
                       'top': ts.y
                   });
                   //            console.log(this.aPosXYClone)
                   //            console.log(this.aPosXY)
                   return false;
               }
           }
       }

   }

   //鼠标弹起
   DragDrop.prototype.mouseUp = function(t) {
       if (this.moveItem) {
           this.list.removeChild(this.dashedBox)
           this.moveItem.style.zIndex = null;
           removeClass(t, 'move-item');
           this.aPosXY.splice(0, this.aPosXY.length);;
           for (var i = 0; i < this.aPosXYClone.length; i++) { //复制数组
               this.aPosXY.push(this.aPosXYClone[i]);
           }
           addClass(t, 'edit-able');
           for (var i in this.aPosXY) {
               setCss(this.li[i], {
                   'position': 'absolute',
                   'left': this.aPosXY[i].x,
                   'top': this.aPosXY[i].y
               })
           }
           this.moveItem = null;
       }
   }

   //鼠标按下
   DragDrop.prototype.mouseDown = function(e, t) {
       var thisIndex = t.getAttribute('data-index'); //获取当前序号，
       this.dashedBox = document.createElement('div'); //创建新元素
       var tWidth = t.offsetWidth + 'px'; //获取当前点击元素宽
       var tHeight = t.offsetHeight + 'px'; //设置新元素高等于当前点击元素高
       this.dashedBox.className = 'dashed-box'; //为新元素增加类名
       setCss(this.dashedBox, {
           'width': tWidth,
           'height': tHeight,
           'left': this.aPosXY[thisIndex].x,
           'top': this.aPosXY[thisIndex].y
       });
       this.list.appendChild(this.dashedBox);
       //console.log(tWidth+'  '+tHeight);
       //console.log(thisIndex);
       this.moveStatus = true; //开启可移动状态
       this.moveItem = t; //当前移动的元素
       this.mouseDownPos.x = e.pageX - this.list.offsetLeft;
       this.mouseDownPos.y = e.pageY - this.list.offsetTop;
       t.style.zIndex = 100;
       addClass(t, 'move-item');
       this.moveItemH = t.offsetHeight;
       this.aPosXYClone.splice(0, this.aPosXYClone.length);
       for (var i = 0; i < this.aPosXY.length; i++) { //复制数组
           this.aPosXYClone.push(this.aPosXY[i]);
       }
       removeClass(t, 'edit-able');
       console.log(this.mouseDownPos);
   }

   //编辑按钮
   DragDrop.prototype.edit = function() {
       var classNames = this.editSwith.className; //获取当前按钮的class,返回的是字符串
       var aClassNames = classNames.split(' '); //将获取的class字符串用用空格切割，返回类名数组
       var index = aClassNames.indexOf('on'); //获取类名 'on'的位置
       //      console.log(index); 
       var tf = index >= 0 ? true : false; //如果index>=0说明存在类名 'on'，返回true，否则返回false
       //      console.log(tf);
       if (!tf) {
           this.editSwith.className = classNames + ' on'; //如果类名'on'不存在；添加类名'on';
           this.editAble = true; //可编辑状态
       } else {
           aClassNames.splice(index, 1); //否则从类名数组中删除'on'；
           this.editSwith.className = aClassNames.toString().replace(',', ' '); //将删除后的数组转换成字符串，并共空格（' '）代替逗号（','），从新设置类名
           this.editAble = false; //不可编辑状态
       }
       this.setClass(!tf);
       console.log(this.editAble == true ? '可编辑' : '不可编辑');
   }

   //初始化元素css
   DragDrop.prototype.setClass = function(tf) {
       for (var i = 0; i < this.li.length; i++) {
           if (tf) {
               this.li[i].className = 'edit-able';
           } else {
               this.li[i].className = '';
           }
       }
   }
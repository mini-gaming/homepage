//index.js
//获取应用实例
const app = getApp()
const wxDraw = require("../../utils/wxdraw.min.js").wxDraw;
const Shape = require("../../utils/wxdraw.min.js").Shape;
const Num = require("../../utils/util.js").Num;

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    wxCanvas: null,
    numX: null,
    numY: null
  },
  //事件处理函数
  bindtouchstart: function (e) {
    // 检测手指点击开始事件
    this.wxCanvas.touchstartDetect(e);
  },
  //bindtouchmove: function (e) {
    // 检测手指点击 之后的移动事件
    //this.wxCanvas.touchmoveDetect(e);
  //},
  bindtouchend: function (e) {
    //检测手指点击 移出事件
    this.wxCanvas.touchendDetect(e);
    let pageX = e.changedTouches[0].x;
    let pageY = e.changedTouches[0].y;
    if(this.numberGame.Shape.detected(pageX,pageY)){
      wx.navigateTo({
        url: '/pages/number/index/index'
      })
    } else if (this.fontMaze.Shape.detected(pageX, pageY)) {
      wx.navigateTo({
        url: '/pages/maze/index/index'
      })
    }
  },
  bindtap: function (e) {
    // 检测tap事件
    this.wxCanvas.tapDetect(e);
  },
  bindlongpress: function (e) {
    // 检测longpress事件
    this.wxCanvas.longpressDetect(e);
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function() {
    let context = wx.createCanvasContext('first');
    let screen = wx.getSystemInfoSync();
    let num = Num.of(screen.windowWidth / 750, screen.windowHeight / 1352);
    console.log('screen:' + screen.windowHeight);
    console.log('screen:' + screen.windowWidth);
    console.log('num 170:' + num.get(170));
    this.setData({
      num: num
    });
    this.wxCanvas = new wxDraw(context, 0, 0, screen.windowWidth, screen.windowHeight);
    this.createLeftRect(this.wxCanvas);
    let p1X = num.getX(280);
    let length = num.getX(150);
    let p1Y = num.getY(430);
    this.numberGame = this.createGameRect(this.wxCanvas, { x: p1X, y: num.getY(430), text: '数字华容道', url: '../../resources/images/numbers.png'});
    this.fontMaze = this.createGameRect(this.wxCanvas, { x: p1X + length, y: p1Y + length, text: '字体迷宫', url: '../../resources/images/font-fuzzy.png'});
    this.createGameRect(this.wxCanvas, { x: p1X, y: p1Y + length * 2, text: '一眼识人', url: '../../resources/images/identity.png', backColor: '#bfcfa0' });
    this.createGameRect(this.wxCanvas, { x: p1X + length, y: p1Y + length * 3, text: '敬请期待', back1color: '#b5d1d4',backColor: '#b5d1d4', textColor: '#fff' });
    this.createPersonalRect(this.wxCanvas, { x: p1X, y: p1Y + length * 4, text: '个人信息', backColor: '#b5c6d6', textCenter: true,textColor:'#fff' });
    this.createOrderRect(this.wxCanvas, { x: p1X + length, y: p1Y + length * 5, text: '排名',order:'233'});
    this.createGameRect(this.wxCanvas, { x: p1X, y: p1Y + length * 6, text: '排名', order: '233' });
    this.createRightRect(this.wxCanvas);
    console.log('p1Y + length*3 = ' + (p1Y + length * 3));
    this.createMidlleRect(this.wxCanvas, { x: 0, y: p1Y + length * 3, width: screen.windowWidth});
    this.createMidlleRect(this.wxCanvas, { x: p1X + length, y: p1Y + length * 2, width: screen.windowWidth});
    this.createSharePart(this.wxCanvas, { y: p1Y + length * 4, width: screen.windowWidth})
  },
  createOrderRect: function(ctx,position){
    let num = this.data.num;
    let x = position.x;
    let y = position.y;
    let h = num.get(212);
    let h1 = num.get(190);
    let h2 = num.get(150);
    let h3 = num.get(130);
    let h4 = num.get(55);
    let textDesc = position.text;
    let t1x = 0;
    if (textDesc.length == 5) {
      t1x = num.getX(50);
    } else if (textDesc.length == 4) {
      t1x = num.getX(40);
    } else if (textDesc.length == 3) {
      t1x = num.getX(30);
    } else {
      t1x = num.getX(20);
    }
    let t1y = num.getY(50);
    if (position.textCenter) {
      t1y = num.getY(10);
    }
    let imgy = num.getY(15);
    let backColor = position.backColor;
    let rect = new Shape('rect', { x: x, y: y, w: h, h: h, fillStyle: "#fff", strokeStyle: '#898e99', rotate: Math.PI / 4 }, 'mix', true);
    ctx.add(rect);

    let rect1 = new Shape('rect', { x: x, y: y, w: h1, h: h1, fillStyle: "#fff", strokeStyle: position.back1color||'#f1f1fc', rotate: Math.PI / 4, lineWidth: 1 }, 'mix', true);
    ctx.add(rect1);

    let rect2 = new Shape('rect', { x: x, y: y, w: h2, h: h2, fillStyle: "#fff", strokeStyle: '#f0f0f7', rotate: Math.PI / 4, lineWidth: 10}, 'mix', true);
    ctx.add(rect2);

    let text = new Shape('text', {
      x: x - num.getX(40), y: y + num.getY(25), text: position.order,
      fillStyle: position.textColor || "#afb3d0",
      fontSize: num.getX(50)
    }, 'fill', true);
    ctx.add(text);
    
    let text1 = new Shape('text', {
      x: x - t1x, y: y - num.getY(20*2), text: textDesc,
      fillStyle: position.textColor || "#afb3d0",
      fontSize: num.getX(20)
    }, 'fill', true);
    ctx.add(text1);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  createLeftRect: function(ctx) {
    let num = this.data.num;
    let cy = num.getY(212);
    let w = num.get(300);
    let w1 = num.get(220);
    let w2 = num.get(200);
    let w3 = num.get(100);
    let offset20 = num.getX(30);
    let rect = new Shape('rect', { x: 0, y: cy, w: w, h: w, fillStyle: "#fff", strokeStyle: '#dddddd', rotate: Math.PI / 4,id:'leftRect' }, 'mix', true);
    let rect1 = new Shape('rect', { x: offset20, y: cy, w: w1, h: w1, fillStyle: "#fef7e7", strokeStyle: '#fef7e7', rotate: Math.PI / 4 }, 'mix', true);
    let rect2 = new Shape('rect', { x: 0, y: cy, w: w2, h: w2, fillStyle: "#fee5ba", strokeStyle: '#fee5ba', rotate: Math.PI / 4 }, 'mix', true);
    let rect3 = new Shape('rect', { x: 0, y: cy, w: w3, h: w3, fillStyle: "#fad483", strokeStyle: '#fad483', rotate: Math.PI / 4 }, 'mix', true);
    ctx.add(rect);
    ctx.add(rect1);
    ctx.add(rect2);
    ctx.add(rect3);
  },
  createLastGameRect: function(ctx,position){
    let num = this.data.num;
    let x = num.getX(position.x);
    let y = num.getY(position.Y);
  },
  createGameRect: function(ctx,position) {
    let num = this.data.num;
    let x = position.x;
    let y = position.y;
    let h = num.get(212);
    let h1 = num.get(170);
    let h2 = num.get(148);
    let h3 = num.get(55);
    let textDesc = position.text;
    let t1x = 0;
    if (textDesc.length == 5){
      t1x = num.getX(50);
    } else if (textDesc.length == 4){
      t1x = num.getX(40);
    } else if (textDesc.length == 3){
      t1x = num.getX(30);
    }else{
      t1x = num.getX(20);
    }
    let t1y = num.getY(50);
    if (position.textCenter){
      t1y = num.getY(10);
    }
    let imgy = num.getY(15);
    let imgURL = position.url;
    let backColor = position.backColor;
    let rect = new Shape('rect', { x: x, y: y, w: h, h: h, fillStyle: "#fff", strokeStyle: '#abaa52', rotate: Math.PI / 4}, 'mix', true);
    ctx.add(rect);

    let rect1 = new Shape('rect', { x: x, y: y, w: h1, h: h1, fillStyle: "#fff", strokeStyle: '#e5e2bf', rotate: Math.PI / 4 }, 'mix', true);
    ctx.add(rect1);

    let rect2 = new Shape('rect', { x: x, y: y, w: h2, h: h2, fillStyle: backColor || '#d9d083', strokeStyle: '#d9d083', rotate: Math.PI / 4 }, 'mix', true);
    ctx.add(rect2);

    imgURL ? ctx.add(new Shape('image', { x: x, y: y - imgy, w: h3, h: h3, file: imgURL }, 'fill', true)) : '';

    let text = new Shape('text', {
      x: x - t1x, y: y + t1y, text: textDesc,
      fillStyle: position.textColor || "#E6781E",
      fontSize:num.getX(20)
    },'fill', true);
    ctx.add(text);
    return rect;
  },
  createPersonalRect: function (ctx, position) {
    let num = this.data.num;
    let x = position.x;
    let y = position.y;
    let h = num.get(212);
    let h1 = num.get(170);
    let h2 = num.get(165);
    let h3 = num.get(55);
    let textDesc = position.text;
    let t1x = 0;
    if (textDesc.length == 5) {
      t1x = num.getX(50);
    } else if (textDesc.length == 4) {
      t1x = num.getX(40);
    } else if (textDesc.length == 3) {
      t1x = num.getX(30);
    } else {
      t1x = num.getX(20);
    }
    let t1y = num.getY(50);
    if (position.textCenter) {
      t1y = num.getY(10);
    }
    let imgy = num.getY(15);
    let imgURL = position.url;
    let backColor = position.backColor;
    let rect = new Shape('rect', { x: x, y: y, w: h, h: h, fillStyle: backColor || "#fff", strokeStyle: backColor||'#abaa52', rotate: Math.PI / 4 }, 'mix', true);
    ctx.add(rect);

    let rect1 = new Shape('rect', { x: x, y: y, w: h1, h: h1, fillStyle: "#fff", strokeStyle: '#e5e2bf', rotate: Math.PI / 4 }, 'mix', true);
    ctx.add(rect1);

    let rect2 = new Shape('rect', { x: x, y: y, w: h2, h: h2, fillStyle: backColor || '#d9d083', strokeStyle: '#d9d083', rotate: Math.PI / 4 }, 'mix', true);
    ctx.add(rect2);

    imgURL ? ctx.add(new Shape('image', { x: x, y: y - imgy, w: h3, h: h3, file: imgURL }, 'fill', true)) : '';

    let text = new Shape('text', {
      x: x - t1x, y: y + t1y, text: textDesc,
      fillStyle: position.textColor || "#E6781E",
      fontSize: num.getX(20)
    }, 'fill', true);
    ctx.add(text);
  },
  createRightRect:function(ctx){
    let num = this.data.num;
    let positionX = num.getX(550);
    let positionY = num.getY(170);
    let position1Y = num.getY(170)*1.5;
    let position2Y = num.getY(170) * 2.5;
    let h = num.getX(212);
    let h1 = num.getX(106);
    let h2 = num.getX(80);
    let h3 = num.getX(70);
    let rect1 = new Shape('rect', { x: positionX, y: positionY, w: h, h: h, fillStyle: "#fff", strokeStyle: '#f5e9e7', rotate: Math.PI / 4, lineWidth: 2}, 'mix', true);
    ctx.add(rect1);

    let rect2 = new Shape('rect', { x: positionX, y: 2 * positionY, w: h, h: h, fillStyle: "#fff", strokeStyle: '#f9f8f6', rotate: Math.PI / 4, lineWidth: 2}, 'mix', true);
    ctx.add(rect2);

    let rect3 = new Shape('rect', { x: positionX, y: position1Y, w: h1, h: h1, fillStyle: "#ce7414", strokeStyle: '#ce7414', rotate: Math.PI / 4 }, 'mix', true);
    ctx.add(rect3);

    let rect31 = new Shape('rect', { x: positionX, y: position1Y, w: h2, h: h2, fillStyle: "#ce7414", strokeStyle: '#fff', lineWidth:2,rotate: Math.PI / 4 }, 'mix', true);
    ctx.add(rect31);

    let text3 = new Shape('text', {
      x: positionX - num.getX(20), y: position1Y+num.getY(10), text: '游戏',
      fillStyle: "#fff",
      fontSize: num.getX(20)
    }, 'fill', true);
    ctx.add(text3);

    let rect4 = new Shape('rect', { x: positionX, y: position2Y, w: h1, h: h1, fillStyle: "#fff", strokeStyle: '#dfd5c0', lineWidth: 2, rotate: Math.PI / 4 }, 'mix', true);
    ctx.add(rect4);

    let rect41 = new Shape('rect', { x: positionX, y: position2Y, w: h3, h: h3, fillStyle: "#fff9ec", strokeStyle: '#dff5c0', lineWidth: 2, rotate: Math.PI / 4 }, 'mix', true);
    ctx.add(rect41);

    let text4 = new Shape('text', {
      x: positionX - num.getX(20), y: position2Y + num.getY(10), text: '个人',
      fillStyle: "#ce7414",
      fontSize: num.getX(20)
    }, 'fill', true);
    ctx.add(text4);
  },
  createMidlleRect: function(ctx,position){
    let num = this.data.num;
    let y = position.y;//(position.y);//(880);
    let x = num.getX(35);
    let s = position.x;
    let h = num.getX(50);
    let c1,c2,c3,c4,c5;
    c1 = '#e7eef4';
    c2 = '#f0f7f9';
    c3 = '#f9fafe';
    c4 = '#fbfcfe';
    if(s){
      c1 = '#fbfcfe';
      c2 = '#f9fafe';
      c3 = '#f0f7f9';
      c4 = '#e7eef4';
    }
    let rect = new Shape('rect', { x: s+x+2, y: y, w: h, h: h, fillStyle: c1, strokeStyle: c1, rotate: Math.PI / 4 }, 'mix', true);
    ctx.add(rect);

    let rect1 = new Shape('rect', { x: s+3*x, y: y, w: h, h: h, fillStyle: c2, strokeStyle: c2, rotate: Math.PI / 4 }, 'mix', true);
    ctx.add(rect1);

    let rect2 = new Shape('rect', { x: s+5*x, y: y, w: h, h: h, fillStyle: c3, strokeStyle: c3,rotate: Math.PI / 4 }, 'mix', true);
    ctx.add(rect2);

    let rect3 = null;
    let width = null;
    let h1 = null;
    let rect4 = null;
    let h2 = null;
    if(!s) {
      rect3 = new Shape('rect', { x: s + 7 * x, y: y, w: h, h: h, fillStyle: c4, strokeStyle: c4, rotate: Math.PI / 4 }, 'mix', true);
      ctx.add(rect3);
    }else{
      width = position.width - s - 6*x;
      h1 = Math.floor(width*Math.sqrt(2));
      rect3 = new Shape('rect', { x: position.width, y: y, w: h1, h: h1, fillStyle: c4, strokeStyle: c4, rotate: Math.PI / 4 }, 'mix', true);
      ctx.add(rect3);
      
      h2 = h1 - num.getX(80);
      rect4 = new Shape('rect', { x: position.width, y: y, w: h2, h: h2, fillStyle: "#b4d1d5", strokeStyle: '#b4d1d5', rotate: Math.PI / 4 }, 'mix', true);
      ctx.add(rect4);
    }
  },
  createSharePart:function(ctx,position){
    let y = position.y;

    let num = this.data.num;
    let h = num.getX(160);
    let xStart = num.getX(114);
    let x = position.width - xStart;
    let x1 = position.width - Math.floor(xStart * 1.3);
    let h1 = Math.floor(h*0.7);
    let x2 = position.width - Math.floor(xStart*(2-0.49));
    let h2 = Math.floor(h * 0.49);

    let rect = new Shape('rect', { x: x, y: y, w: h, h: h, fillStyle: '#fff', strokeStyle: '#ddd', rotate: Math.PI / 4 }, 'mix', true);
    ctx.add(rect);

    let rect1 = new Shape('rect', { x: x1, y: y, w: h1, h: h1, fillStyle: '#86a7d0', strokeStyle: '#86a7d0', rotate: Math.PI / 4}, 'mix', true);
    ctx.add(rect1);

    let rect2 = new Shape('rect', { x: x1, y: y, w: h2, h: h2, fillStyle: '#86a7d0', strokeStyle: '#fff', linewidth:2, rotate: Math.PI / 4 }, 'mix', true);
    ctx.add(rect2);

    let text3 = new Shape('text', {
      x: x1 - num.getX(20), y: y + num.getY(10), text: '分享',
      fillStyle: "#fff",
      fontSize: num.getX(20)
    }, 'fill', true);
    ctx.add(text3);
  }
})

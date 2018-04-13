const wxDraw = require("./wxdraw.min.js").wxDraw;
const Shape = require("./utils/wxdraw.min.js").Shape;
const Num = require("./utils/util.js").Num;

let ShapeContext = (ctx) =>{
  this.ctx = ctx;
}

ShapeContext.prototype.add = shape => {
  this.ctx.add(shape);
  return this;
}

ShapeContext.prototype.remove = () => {
  let index = 0
  let shapeItem = null
  if(!this.ctx.store || !this.ctx.store.store) {
    return this;
  }
  this.ctx.store.store.forEach(function(item){
    i++
    if(item._isChoosed){
      shapeItem = item;
      return;
    }
  })
  this.ctx.destory(i);
  return shapeItem;
}

ShapeContext.prototype.getShape = () =>{
  let shapeItem = null
  this.ctx.store.store.forEach(function(item){
    if(item._isChoosed){
      shapeItem = item;
      return;
    }
  })
  return shapeItem;
}
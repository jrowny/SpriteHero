var Sprite = function(x, y, w, h, id){
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.id = id;
  //defaults
  this.name = id;
  this.isClass = true;
  this.psuedo = "";
};

Sprite.prototype.getType = function(){
  return (this.isClass) ? "Class" : "ID";
};

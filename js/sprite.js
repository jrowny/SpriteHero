var Sprite = function(x, y, w, h, id){
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.id = id;
  //defaults
  this.name = "element" + id;
  this.isClass = true;
  this.psuedo = "";
};

Sprite.prototype.getType = function(){
  return (this.isClass) ? "Class" : "ID";
};

Sprite.prototype.getPsuedoOutput = function(){
  if(this.psuedo.length) return ":" + this.psuedo;
  return "";
};
Sprite.prototype.getTypeOutput = function(){
  return (this.isClass) ? "." : "#";
};

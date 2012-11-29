var Sprite = function(x, y, w, h, id){
  this.x = x;
  this.y = y;
  this.width = w;
  this.height = h;
  this.id = id;
  //defaults
  this.name = "element" + id;
  this.isClass = true;
  this.pseudo = "";
};

Sprite.prototype.getType = function(){
  return (this.isClass) ? "Class" : "ID";
};

Sprite.prototype.getPseudoOutput = function(){
  if(this.pseudo.length) return ":" + this.pseudo;
  return "";
};
Sprite.prototype.getTypeOutput = function(){
  return (this.isClass) ? "." : "#";
};

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

Sprite.prototype.getCSS = function(scale){
    return {"width" : (this.width * scale) + "px",
           "height" : (this.height * scale) + "px",
           "left" : (this.x * scale) + "px",
           "top" :  (this.y * scale) + "px"};
};

Sprite.prototype.getCSSCode = function(){
  var output = (this.isClass ? "." : "#") + this.name + (this.psuedo.length ? ":" + this.psuedo : "") + "{";
      output += "width:" + this.width + "px;";
      output += "height:" + this.height + "px;";
      output += "background-position: -" + this.x + "px -" + this.y + "px;";
      return output + "}";
};

Sprite.prototype.getBox = function(scale){
  return '<div id="sprite_box_' + this.id * scale + '" class="sprite_box" style="' +
          "width:" +  (this.width * scale) + "px;" +
          "height:" + (this.height * scale) + "px;" +
          "left:" + (this.x * scale) + "px;" +
          "top:" + (this.y * scale) + "px;" +
          '"></div>';
};
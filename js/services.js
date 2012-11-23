
app.factory('settings', function(){
  var settingsInstance = {
    image       : 'images/welcome.png',
    imageName   : 'welcome.png',
    grid        : 10,
    width       : 0,
    height      : 0,
    scale       : 1,
    gridEnabled : false,
    gridOpacity : 0.2
  };
  return settingsInstance;
});

//just an array
app.service('sprites', function(){
  this.data = [];
  var self = this;
  //compiles css code
  var needsDimensions = function(sprite){
    //if we don't havea psuedo class, we need dimensions
    if(sprite.psuedo.length === 0) return true;
    var len = self.data.length;
    for (var i = 0; i < len; i++){
      //the sprite we're looking for has these conditions (everything identical except psuedo)
      if(self.data[i].name === sprite.name && self.data[i].isClass === sprite.isClass &&
         self.data[i].psuedo.length === 0 && self.data[i].width === sprite.width &&
         self.data[i].height === sprite.height){
        return false;
      }
    }
    
    //nothing found?
    return true;
  };
  this.compileCSS = function(){
    var output = "";
    self.data.forEach(function(sprite, index){
      output += sprite.getTypeOutput() + sprite.name + sprite.getPsuedoOutput() + "{\n";
      //only output the dimensions if we need to
      if(needsDimensions(sprite)){
        output += "  width: " + sprite.width + "px;\n" +
                  "  height: " + sprite.height + "px;\n";
      }
      output += "  background-position: " + (sprite.x * -1) + "px " + (sprite.y * -1) + "px;\n}\n";

    });

    return output;
  };
});

app.factory('settings', function(){
  var settingsInstance = {
    image       : 'http://media.smashingmagazine.com/images/css-sprites/dragon.jpg',
    imageName   : 'dragon.jpg',
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
  //compiles css code
  var needsDimensions = function(sprite){
    //if we don't havea psuedo class, we need dimensions
    if(sprite.psuedo.length === 0) return true;
    
    this.data.forEach(function(findSprite, index){
      //the sprite we're looking for has these conditions (everything identical except psuedo)
      if(findSprite.name === sprite.name && findSprite.isClass === sprite.isClass &&
         findSprite.psuedo.length === 0 && findSprite.width === sprite.width &&
         findSprite.height === sprite.height){
        return false;
      }
    });
    
    //nothing found?
    return true;
  };
  this.compileCSS = function(){
    var output = "";
    this.data.forEach(function(sprite, index){
      output += sprite.getTypeOutput() + sprite.name + sprite.getPsuedoOutput() + "{\n";
      //only output the dimensions if we need to
      if(needsDimensions(sprite)){
        output += "  width: " + sprite.width + "px;\n" +
                  "  height: " + sprite.height + "px;\n";
      }
      output += "  background-position: " + (sprite.x * -1) + "px " + (sprite.y * -1) + "px;\n}";

    });

    return output;
  };
});
app.factory('settingsStorage', function() {
  var STORAGE_ID = 'sh2-settings';

  return {
    get: function() {
      var settings = JSON.parse(localStorage.getItem(STORAGE_ID));
      if(!settings){
        settings = {image: 'images/welcome.png',
                    imageName : 'welcome.png',
                    grid : 16,
                    width : 0,
                    height : 0,
                    scale : 1,
                    gridEnabled : false,
                    gridOpacity : 0.2,
                    baseElement : ".sprite",
                    includeBase : true,
                    legacy : false
                  };
      }
      return settings;
    },

    put: function( settings ) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(settings));
    }
  };
});

app.factory('spritesStorage', function() {
  var STORAGE_ID = 'sh2-sprites', i = 0;
  return {
    index: function(){
      return i;
    },
    get: function() {
      var parsedData = [];
      data = JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
      
      //TODO: find a way to fix this
      //translate the saved data back into JS objects, there must be a better way to serialize
      data.forEach(function(item, index){
        parsedData.push(new Sprite(item.x, item.y, item.width, item.height, item.id));
        if(item.id > i) i = item.id;
      });
      i++;
      return parsedData;
    },
    put: function( sprites ) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(sprites));
    }
  };
});

app.factory('settings', function(settingsStorage){
  var settingsInstance = settingsStorage.get();
  return settingsInstance;
});

//just an array
app.service('sprites', function(spritesStorage, settings){
  this.data = spritesStorage.get();
  this.index = spritesStorage.index();
  var self = this;
  //compiles css code
  var needsDimensions = function(sprite){
    //if we don't havea pseudo class, we need dimensions
    if(sprite.pseudo.length === 0) return true;
    var len = self.data.length;
    for (var i = 0; i < len; i++){
      //the sprite we're looking for has these conditions (everything identical except pseudo)
      if(self.data[i].name === sprite.name && self.data[i].isClass === sprite.isClass &&
         self.data[i].pseudo.length === 0 && self.data[i].width === sprite.width &&
         self.data[i].height === sprite.height){
        return false;
      }
    }
    
    //nothing found?
    return true;
  };
  
  this.compileCSS = function(includeBase){
    var output = "";
    var image = (settings.image.substring(0,14) === 'data:image/png') ? settings.imageName : settings.image;
      if(includeBase !== undefined && includeBase){
      output += settings.baseElement + "{\n" +
                "  background: url('" + image + "') no-repeat;\n" +
                "  color: transparent;\n";
      if(settings.legacy){
        output += "  text-indent: -900em;\n" +
                  "  overflow: hidden;\n";
      }
      output += "}\n\n";
    }
    self.data.forEach(function(sprite, index){
      output += sprite.getTypeOutput() + sprite.name + sprite.getPseudoOutput() + "{\n";
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
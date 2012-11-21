
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
  this.compileCSS = function(){
    this.data.forEach(function(sprite, index){

    });
  };
});
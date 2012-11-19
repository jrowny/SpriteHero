
app.factory('settings', function(){
  var settingsInstance = {
    image       : 'http://media.smashingmagazine.com/images/css-sprites/dragon.jpg',
    grid        : 10,
    width       : 0,
    height      : 0,
    scale       : 1,
    gridEnabled : true,
    gridOpacity : 0.2
  };
  return settingsInstance;
});

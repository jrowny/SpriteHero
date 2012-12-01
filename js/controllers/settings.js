function SettingsCtrl($scope, settings, settingsStorage, sprites) {
  "use strict";
  $scope.settings = settings;
  $scope.sprites = sprites;
  //grid opacity
  $scope.gridOpacity = function(opacity){
    settings.gridOpacity = opacity;
  };

  $scope.quickViewStyle = function(){
    if(sprites.current){
      return {width: sprites.current.width + "px",
              height: sprites.current.height + "px",
              background: "url('" + settings.image + "') " + (sprites.current.x*-1) + "px " + (sprites.current.y*-1) + "px no-repeat"}
    }else{
      return {};
    }
  };

  $scope.$watch('settings', function() {
    settingsStorage.put(settings);
  }, true);
}

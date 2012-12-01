function ImageAreaCtrl($scope, settings, sprites) {
  "use strict";
  $scope.settings = settings;
  $scope.sprites = sprites;
  $scope.spriteStyle = function(sprite){
      return {width: (sprite.width * settings.scale) + "px", 
              height: (sprite.height * settings.scale) + "px",
              top: (sprite.y * settings.scale) + "px",
              left: (sprite.x * settings.scale) + "px"}
  };
}
/*global Sprite:true*/
function DataCtrl($scope, sprites, spritesStorage){
  "use strict";
  $scope.float = 'none';
  $scope.display = 'block';
  $scope.sprites = sprites;
  $scope.types = [{label:"Class", value: true},
                  {label:"ID", value:false}];
  $scope.pseudos = [{label:"None", value:""},
                    {label:"Hover", value:"hover"},
                    {label:"Active", value:"active"},
                    {label:"Visited", value:"visited"},
                    {label:"Focus", value:"focus"}];
  $scope.trash = function(sprite){
    sprites.data.splice(sprites.data.indexOf(sprite), 1);
  };
  $scope.setCurrent = function(sprite){
    sprites.current = sprite;
  };
  $scope.duplicate = function(sprite){
    sprites.data.push(new Sprite(sprite.x,
                                sprite.y,
                                sprite.width,
                                sprite.height,
                                sprites.index));
    sprites.current = sprites.data[sprites.data.length-1];
    sprites.index++;
  };

  $scope.$watch('sprites.data', function() {
    spritesStorage.put(sprites.data);
  }, true);
}
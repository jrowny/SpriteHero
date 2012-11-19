function AppCtrl($scope, settings, sprites){
  $scope.openURLModal = false;
  $scope.spriteURL = "";
  $scope.openURL = function(){
    delete sprites.current;
    sprites.data.length = 0;
    settings.image = $scope.spriteURL;
    $scope.openURLModal = false;
  };
  $scope.trash = function(){
    if(sprites.current !== undefined)
    sprites.data.splice(sprites.data.indexOf(sprites.current), 1);
    delete sprites.current;
  };
  $scope.up = function(){
    if(sprites.current !== undefined)
    sprites.current.y--;
  };
  $scope.down = function(){
    if(sprites.current !== undefined)
    sprites.current.y++;
  };
  $scope.left = function(){
    if(sprites.current !== undefined)
    sprites.current.x--;
  };
  $scope.right = function(){
    if(sprites.current !== undefined)
    sprites.current.x++;
  };
}

function ImageAreaCtrl($scope, settings, sprites) {
  $scope.settings = settings;
  $scope.sprites = sprites;
}

function DataCtrl($scope, sprites){
  $scope.sprites = sprites.data;
  $scope.trash = function(sprite){
    sprites.data.splice(sprites.data.indexOf(sprite), 1);
  };
}

function SettingsCtrl($scope, settings) {
  $scope.settings = settings;
  //grid opacity
  $scope.gridOpacity = function(opacity){
    settings.gridOpacity = opacity;
  };

  //zoom
  $scope.zoomIn = function(){
    settings.scale+=0.5;
  };
  $scope.zoomOut = function(){
    if(settings.scale > 1) settings.scale-=0.5;
  };
}


function AppCtrl($scope, settings, sprites){
  $scope.isURLModal = false;
  $scope.isHelpModal = false;
  $scope.spriteURL = "";
  $scope.settings = settings;
  //for some reason we need to set this in a controller when using ng-include
  $scope.openUrlModal = function(){
    $scope.isURLModal = true;
  };
  $scope.openHelpModal = function(){
    $scope.isHelpModal = true;
  };
  $scope.openURL = function(){
    delete sprites.current;
    sprites.data.length = 0;
    settings.image = $scope.spriteURL;
    settings.imageName = $scope.spriteURL.split("/")[$scope.spriteURL.split("/").length-1];
    $scope.openURLModal = false;
  };
  //keys
  $scope.trash = function(){
    if(sprites.current !== undefined)
    sprites.data.splice(sprites.data.indexOf(sprites.current), 1);
    delete sprites.current;
  };
  $scope.deselect = function(){
    if(sprites.current !== undefined)
      delete sprites.current;
    console.log(sprites.current);
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
   //zoom
  $scope.zoomIn = function(){
    settings.scale+=0.5;
  };
  $scope.zoomOut = function(){
    if(settings.scale > 1) settings.scale-=0.5;
  };
}

function ImageAreaCtrl($scope, settings, sprites) {
  $scope.settings = settings;
  $scope.sprites = sprites;
}

function DataCtrl($scope, sprites){
  $scope.float = 'none';
  $scope.display = 'block';
  $scope.sprites = sprites.data;
  $scope.types = [{label:"Class", value: true}, {label:"ID", value:false}];
  $scope.psuedos = [{label:"None", value:""}, {label:"Hover", value:"hover"}, {label:"Active", value:"active"}];
  $scope.trash = function(sprite){
    sprites.data.splice(sprites.data.indexOf(sprite), 1);
  };
}

function SettingsCtrl($scope, settings, sprites) {
  $scope.settings = settings;
  $scope.sprites = sprites;
  //grid opacity
  $scope.gridOpacity = function(opacity){
    settings.gridOpacity = opacity;
  };

 
}


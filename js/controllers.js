function AppCtrl($scope, settings, sprites){
  $scope.isURLModal = false;
  $scope.isHelpModal = false;
  $scope.spriteURL = "";
  $scope.settings = settings;

  $scope.exportCSS = function(){
    var dataURI = "data:text/css," + encodeURIComponent(sprites.compileCSS(settings.includeBase));
    window.open(dataURI, '_blank');
  };

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
    sprites.index = 1;
    var url = angular.element('#url-window').scope().spriteURL;
    settings.image = url;
    settings.imageName = url.split("/")[url.split("/").length-1];
    $scope.isURLModal = false;
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
    if(settings.scale < 7){
      settings.scale+=0.5;
    }
  };
  $scope.zoomOut = function(){
    if(settings.scale > 1) settings.scale-=0.5;
  };
}

function ImageAreaCtrl($scope, settings, sprites) {
  $scope.settings = settings;
  $scope.sprites = sprites;
}

function DataCtrl($scope, sprites, spritesStorage){
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

function SettingsCtrl($scope, settings, settingsStorage, sprites) {
  $scope.settings = settings;
  $scope.sprites = sprites;
  //grid opacity
  $scope.gridOpacity = function(opacity){
    settings.gridOpacity = opacity;
  };

  $scope.$watch('settings', function() {
    settingsStorage.put(settings);
  }, true);

 
}


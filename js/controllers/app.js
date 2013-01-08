/*global angular:true */
function AppCtrl($scope, settings, sprites){
  "use strict";
  $scope.isURLModal = false;
  $scope.isHelpModal = false;
  $scope.spriteURL = "";
  $scope.settings = settings;

  $scope.exportCSS = function(){
    //var dataURI = "data:text/css," + encodeURIComponent(sprites.compileCSS(settings.includeBase));
    $('body').trigger('getCSS', [sprites.compileCSS(settings.includeBase)]);
    //window.open(dataURI, '_blank');
  };
 
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
function AppCtrl($scope, settings){
  $scope.openURLModal = false;
  $scope.spriteURL = "";
  $scope.openURL = function(){
    settings.image = $scope.spriteURL;
    $scope.openURLModal = false;
  };
}

function ImageAreaCtrl($scope, settings) {
  $scope.settings = settings;
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


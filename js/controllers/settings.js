function SettingsCtrl($scope, settings, settingsStorage, sprites) {
  "use strict";
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

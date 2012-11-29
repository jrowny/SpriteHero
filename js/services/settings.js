app.factory('settingsStorage', function() {
  "use strict";
  var STORAGE_ID = 'sh2-settings';
  return {
    get: function() {
      var settings = JSON.parse(localStorage.getItem(STORAGE_ID));
      //load defaults
      if(!settings){
        settings = {image: 'images/welcome.png',
                    imageName : 'welcome.png',
                    grid : 16,
                    width : 0,
                    height : 0,
                    scale : 1,
                    gridEnabled : false,
                    gridOpacity : 0.2,
                    baseElement : ".sprite",
                    includeBase : true,
                    legacy : false
                  };
      }
      
      return settings;
    },

    put: function( settings ) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(settings));
    }
  };
});

app.factory('settings', function(settingsStorage){
  "use strict";
  var settingsInstance = settingsStorage.get();
  return settingsInstance;
});
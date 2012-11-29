app.directive('sprite', function(settings, sprites){
  "use strict";
  var link = function(scope, element, attrs, model) {
    //update model position on drag
    var onDrag = function(event, ui){
      var sprite = model.$viewValue;
      sprite.x = Math.round(ui.position.left/settings.scale);
      sprite.y = Math.round(ui.position.top/settings.scale);
      scope.$apply();
    };
    //update model position and size on resize
    var onResize = function(event, ui){
      var sprite = model.$viewValue;
      sprite.width = Math.round(ui.size.width/settings.scale);
      sprite.height = Math.round(ui.size.height/settings.scale);
      sprite.x = Math.round(ui.position.left/settings.scale);
      sprite.y = Math.round(ui.position.top/settings.scale);
      scope.$apply();
    };

    var drEnable = function(){
      if(settings.gridEnabled){
        element.draggable({ drag: onDrag,
                            grid: [settings.grid * settings.scale,
                                   settings.grid * settings.scale] })
               .resizable({ resize: onResize,
                            grid: [settings.grid * settings.scale,
                                   settings.grid * settings.scale],
                            handles: "all" });
      }else{
        element.draggable({drag: onDrag, grid: null}).resizable({resize: onResize, grid:null, handles: "all"});
      }
    };

    drEnable();
    //toggle dragging
    scope.$watch('settings.scale + settings.grid + settings.gridOpacity + settings.gridEnabled', function(newValue, oldValue) {
      drEnable();
    });
  };
  return {
    restrict : 'A',
    require: 'ngModel',
    link : link
  };
});
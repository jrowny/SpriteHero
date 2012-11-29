app.directive('imageSource', function(settings){
  "use strict";
  var link = function(scope, element, attrs) {

    //attache a load handler to this element
    element.load(function(){
        //use naturalWidth/Height because of scale
        settings.width = element.context.naturalWidth;
        settings.height = element.context.naturalHeight;
        if(!scope.$$phase){
          scope.$apply();
        }
        scale();
      }).error(function(er){
        settings.image = 'images/loadingError.png';
        settings.imageName = 'loadingError.png';
        element.attr('src', settings.image);
        settings.width = 500;
        settings.height = 160;
        scale();
      });

    //changing the source triggers the above handler
    var render = function() {
      element.attr('src', settings.image);
    };

    //scale the image. Use min-width/height to prevent scaling
    var scale = function(){
      element.width(settings.width*settings.scale);
      element.height(settings.height*settings.scale);
      //forces scrollbars
      element.css('min-width', settings.width*settings.scale);
      element.css('min-height',settings.height*settings.scale);
    };

    scope.$watch('settings.image', function(newValue, oldValue) {
      render();
    });

    scope.$watch('settings.scale', function(newValue, oldValue) {
      if(newValue!=oldValue && newValue >= 1) scale();
    });
  };
  return {
    restrict : 'A',
    link : link
  };
});
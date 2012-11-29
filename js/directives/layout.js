app.directive('layout', function(){
  "use strict";
  var link = function(scope, element, attrs) {
    element.layout({
        east: {
          size:360,
          minSize: 200
        },
        south: {
          size: 360
        }
    });
  };
  return {
    restrict : 'A',
    link : link
  };
});

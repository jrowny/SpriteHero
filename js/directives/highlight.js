/*global hljs:true jQuery:true */
app.directive('highlight', function(){
  "use strict";
  var link = function(scope, element, attrs, model) {
    var render = function() {
      element.text(model.$viewValue);
      hljs.highlightBlock(element[0], null, false);
    };
    scope.$watch(attrs['ngModel'], render);
    render();
  };
  return {
    restrict : 'A',
    require: 'ngModel',
    link : link
  };
});
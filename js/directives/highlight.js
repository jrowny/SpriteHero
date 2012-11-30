/*global hljs:true jQuery:true */
//TODO make this an element directive which can have type specififed
app.directive('highlight', function(){
  "use strict";
  var link = function(scope, element, attrs, model) {
    var render = function() {
      element.text(model);
      hljs.highlightBlock(element[0], null, false);
    };
    scope.$watch(attrs.ngModel, render);
    render();
  };
  return {
    restrict : 'A',
    require: 'ngModel',
    link : link
  };
});
/*global hljs:true jQuery:true angular:true */
//TODO make this an element directive which can have type specififed
app.directive('highlight', function(){
  "use strict";
  var link = function(scope, element, attrs) {
    var render = function() {
      angular.element(element.children()[0]).text(scope.source);
      hljs.highlightBlock(element.children()[0], null, false);
    };
    scope.$watch('source', render);
    render();
  };
  return {
    restrict : 'E',
    replace: true,
    scope: {type:'@',
            source:'='},
    template: '<pre class="code"><code class="{{type}}"></code></pre>',
    link: link
  };
});
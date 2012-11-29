/*global hljs:true jQuery:true */
app.directive('spriteCss', function(sprites, settings){
  "use strict";
  var link = function(scope, element, attrs) {
    var render = function() {
      element.text(sprites.compileCSS(settings.includeBase));
      hljs.highlightBlock(element[0], null, false);
    };

    scope.$watch('$parent.sprites', render, true);
    scope.$watch('$parent.settings.includeBase + settings.image + $parent.settings.legacy + $parent.settings.baseElement', render);
    render();
  };
  return {
    restrict : 'A',
    link : link
  };
});
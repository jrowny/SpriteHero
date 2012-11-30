/*global $:true alert:true*/
//TODO: get rid of tight coupling to service by using attributes/&exp
app.directive('fileWindow', function(settings, sprites){
  "use strict";
  var link = function(scope, element, attrs) {
    //check browser support
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      //create HTML5 filefield element
      var fileField = $('<input type="file" id="files" name="files" style="display:none;"/>');
      fileField.on('change',function(event){
        if(event.target.files[0] !== undefined){
          var file = event.target.files[0];
          // Only process image files.
          if (!file.type.match('image.*')) {
            //TODO: make some sort of modal window error handlers instead of using alert;
            alert("Woops! You can only use image files such as JPG or PNG.");
          }else{
            var reader = new FileReader();
            reader.onload = (function(theFile) {
              return function(event) {
                delete sprites.current;
                sprites.data.length = 0;
                sprites.index = 1;
                scope.settings.image = event.target.result;
                scope.settings.imageName = theFile.name;
                if(!scope.$$phase){
                  scope.$apply();
                }
              };
            })(file);
            // Read in the image file as a data URL.
            reader.readAsDataURL(file);
          }
        }
      });
      $('body').append(fileField);
      //when this element is clicked, trigger the filefield's browse. Doesn't seem to work in Safari
      element.click(function(){fileField.click();});
    } else {
      //TODO: probably need to centralize a place for detection of unsupported browsers... or maybe just redirect users to AOL.com
      alert('The File APIs are not fully supported in this browser so you won\'t be able to load local files.');
      element.attr('disabled', 'disabled');
    }
  };
  return {
    restrict : 'A',
    link : link
  };
});
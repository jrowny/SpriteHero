app.directive('sprite', function(settings, sprites){
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
        element.draggable({ drag: onDrag, grid: [settings.grid * settings.scale, settings.grid * settings.scale] })
               .resizable({ resize: onResize, grid: [settings.grid * settings.scale, settings.grid * settings.scale], handles: "all" });
      }else{
        element.draggable({drag: onDrag}).resizable({resize: onResize,  handles: "all"});
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

app.directive('generator', function(settings, sprites){
  var y_end, x_end, x_start, y_start;
  var snap = function(value, grid){
    if(value % grid < (grid/2)){ //if the modulo is less than half the grid distance
      value -= (value % grid);
    }else{
      value += (grid - (value % grid));
    }
    return value;
  };
  var link = function(scope, element, attrs) {
    //TODO: can we switch this to draggable?
    element.selectable({
      start: function(event) {
              var offset = $(this).offset();
              //get the mouse position on start
              x_start = event.pageX - offset.left,
              y_start = event.pageY - offset.top;
            },
      stop: function(event) {
              //get the mouse position on stop
              var offset = $(this).offset(),
                  width, height, x, y, sprite;

              x_end = event.pageX - offset.left,
              y_end = event.pageY - offset.top;

              //adjust box to fit grid
              if(settings.gridEnabled){
                x_start = snap(x_start, settings.grid * settings.scale);
                y_start = snap(y_start, settings.grid * settings.scale);
                x_end = snap(x_end, settings.grid * settings.scale);
                y_end = snap(y_end, settings.grid * settings.scale);
              }
             
              //account for diffferent direction drags by getting the absolute
              width  = Math.abs(x_end - x_start);
              height = Math.abs(y_end - y_start);
              
              //account for different direction drags but finding which x/y to use
              x = (x_end < x_start) ? x_end : x_start;
              y = (y_end < y_start) ? y_end : y_start;

              //create the sprite model
              sprite = new Sprite(Math.round(x/settings.scale),
                                  Math.round(y/settings.scale),
                                  Math.round(width/settings.scale),
                                  Math.round(height/settings.scale),
                                  sprites.index);

              //only do anything if this thing has some size (i.e. not an accidental click)
              if(width > 0 && height >0){
                sprites.data.push(sprite);
                sprites.index++;
                scope.$apply();
              }
            }
      });
  };
  return {
    restrict : 'A',
    link : link
  };
});

//
app.directive('fileWindow', function(settings, sprites){
  var link = function(scope, element, attrs) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
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
        element.click(function(){
          fileField.click();
        });
    } else {
      //TODO: probably need to centralize a place for detection of unsupported browsers... or maybe just redirect users to AOL.com
      alert('The File APIs are not fully supported in this browser so you won\'t be able to load local files.');
      $('.openFromImage').attr('disabled', 'disabled');
    }
  };
  return {
    restrict : 'A',
    link : link
  };
});

app.directive('imageSource', function(settings){
  var link = function(scope, element, attrs) {
    element.load(function(){
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
    var render = function() {
      element.attr('src', settings.image);
    };

    var scale = function(){
      element.width(settings.width*settings.scale);
      element.height(settings.height*settings.scale);
      //forces scrollbars
      element.css('min-width', settings.width*settings.scale);
      element.css('min-height',settings.height*settings.scale);
    };

    scope.$watch('settings.imageName', function(newValue, oldValue) {
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

app.directive('spriteCss', function(sprites, settings){
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

app.directive('grid', function(settings){
  var link = function(scope, element, attrs) {
    var render = function(clear) {
      if(typeof clear === 'undefined') clear = true;
      var context = element.get(0).getContext("2d");
      var width = settings.width * settings.scale,
          height = settings.height * settings.scale,
          grid = settings.scale * settings.grid;
      element.attr({width: width, height: height});
      context.globalAlpha = settings.gridOpacity;
      context.clearRect(0, 0, width, height);
      if(clear){
        context.beginPath();

        for (var x = 0; x <= width; x += grid) {
            context.moveTo(x , 0);
            context.lineTo(x, height);
        }
        for (var y = 0; y <= height; y += grid) {
            context.moveTo(0, y);
            context.lineTo(width, y);
        }
        context.strokeStyle = "#000";
        context.lineWidth = 0.5;
        context.stroke();
      }
    };
    scope.$watch('settings.grid + settings.width + settings.height + settings.scale + settings.gridOpacity + settings.gridEnabled', function(newValue, oldValue) {
      if(settings.grid < 1 || !settings.gridEnabled){
        render(false);
      }else{
        render();
      }
    });
    

    render();
  };
  return {
    restrict : 'A',
    link : link
  };
});

app.directive('layout', function(){
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

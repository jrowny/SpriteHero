/*global $:true Sprite:true*/
app.directive('generator', function(settings, sprites){
  "use strict";
  var y_end, x_end, x_start, y_start;

  //this function returns the closest grid line for a given value
  var snap = function(value, grid){
    //if the modulo is less than half the grid distance
    if(value % grid < (grid/2)){
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
              
              //account for different direction drags by finding which x/y to use
              x = (x_end < x_start) ? x_end : x_start;
              y = (y_end < y_start) ? y_end : y_start;

              //only do anything if this thing has some size (i.e. not an accidental click)
              if(width > 0 && height >0){
                //create the sprite model, this could be converted to a service method
                sprite = new Sprite(Math.round(x/settings.scale),
                                    Math.round(y/settings.scale),
                                    Math.round(width/settings.scale),
                                    Math.round(height/settings.scale),
                                    sprites.index);

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
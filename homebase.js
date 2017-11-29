function homeBase(mainCanvas, mainCtx){
    var baseHeight = 10;
    var baseWidth = 100;
    var mainWidth = parseInt(mainCanvas.getAttribute('width'));
    var mainHeight = parseInt(mainCanvas.getAttribute('height'));
    var locationSection = baseWidth/5;
    var x = 0;
    var homeBaseCanvas = document.createElement('canvas');
    homeBaseCanvas.setAttribute('width', baseWidth);
    homeBaseCanvas.setAttribute('height', baseHeight);
    var homeBaseCtx = homeBaseCanvas.getContext('2d');
    homeBaseCtx.fillStyle = '#FF0000';
    homeBaseCtx.fillRect(0,0, locationSection, baseHeight);
    homeBaseCtx.fillStyle = '#00FF00';
    homeBaseCtx.fillRect(locationSection,   0, locationSection, baseHeight);
    homeBaseCtx.fillStyle = '#FFFFFF';
    homeBaseCtx.fillRect(2*locationSection, 0, locationSection, baseHeight);
    homeBaseCtx.fillStyle = '#00FF00';
    homeBaseCtx.fillRect(3*locationSection, 0, locationSection, baseHeight);
    homeBaseCtx.fillStyle = '#FF0000';
    homeBaseCtx.fillRect(4*locationSection, 0, locationSection, baseHeight);


    return {
        getLocation: function (){
            return {
                x: x,
                y: mainHeight,
                width: baseWidth,
                height: baseHeight
            }
        },
        setLocation: function (newX, newY){
            x = newX;
            y = newY
        },
        moveX: function (dx){
            var newX = x + dx;

            if(newX + baseWidth > mainWidth ){
                newX = mainWidth - baseWidth;
            }
            else if( newX < 0 ) {
                newX = 0;
            }
            x= newX;
        },
        check: function (ball){
            var status = 'ok';
            var location = ball.getLocation();
            var velocity = ball.getVelocity();

          if(   (location.x >=  x) && (location.x <= x +  baseWidth) && (location.y + 2*location.radius >= mainHeight-baseHeight) ){
              var locationOnBase = location.x - x;

              if(locationOnBase > locationSection* 4 ){
                  velocity.vx = (velocity.vx > 0)? 0.5: 0.5;
              } else if(locationOnBase > locationSection* 3 ){
                  velocity.vx = (velocity.vx > 0)? 0.75: 0.75;
              } else if(locationOnBase > locationSection* 2 ){
                  velocity.vx = (velocity.vx > 0)? 1: -1;
              } else if(locationOnBase > locationSection* 1 ){
                  velocity.vx = (velocity.vx > 0)? -0.75: -0.75;
              } else {
                  velocity.vx = (velocity.vx > 0)? -0.5 : -0.5;
              }
              velocity.vy = -velocity.vy;
          }

            ball.setVelocity(velocity.vx, velocity.vy);


            return status;

        },

        paint: function (){
            mainCtx.drawImage(homeBaseCanvas, x, mainHeight-baseHeight);
        }
    }
}

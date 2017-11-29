function ball(mainCanvas, mainCtx){
    var radius = 5;
    var mainWidth = parseInt(mainCanvas.getAttribute('width'));
    var mainHeight = parseInt(mainCanvas.getAttribute('height'));
    var x = 0;
    var y = 30;
    var vx = +1;
    var vy = +1;


    var ballCanvas = document.createElement('canvas');
    ballCanvas .setAttribute('width', 2*radius);
    ballCanvas .setAttribute('height', 2*radius);
    var ballCtx = ballCanvas.getContext('2d');

    ballCtx.fillStyle = 'pink';
    ballCtx.beginPath();
    ballCtx.arc(radius, radius, radius, 0, 2 * Math.PI);
    ballCtx.fill();
    return {
        getLocation: function (){
          return {
              x:x,
              y:y,
              radius: radius
          }
        },
        setLocation: function (newX, newY){
            x = newX;
            y = newY
        },
        move: function () {
            x +=vx;
            y +=vy;
        },
        getVelocity:  function(){
           return {
               vx: vx,
               vy: vy
           }
        },
        setVelocity: function(newVx, newVy){
          vx = newVx;
          vy = newVy;
        },

        paint: function (){
            mainCtx.drawImage(ballCanvas, x, y);
        }
    }
}

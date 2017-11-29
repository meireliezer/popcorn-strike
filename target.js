function target(mainCanvas, mainCtx){
    var targetHeight = 30;
    var targetWidth = 30;
    var mainWidth = parseInt(mainCanvas.getAttribute('width'));
    var mainHeight = parseInt(mainCanvas.getAttribute('height'));

    var x;
    var y;
    placeTarget();

    var targetCanvas = document.createElement('canvas');
    targetCanvas.setAttribute('width', targetWidth);
    targetCanvas.setAttribute('height', targetHeight);
    var targetCtx = targetCanvas.getContext('2d');
    targetCtx.fillStyle = 'red';
    targetCtx.fillRect(0,0, targetWidth, targetHeight);

    function placeTarget() {
        x = Math.min(Math.ceil(Math.random()*mainWidth), mainWidth-targetWidth);
        y = Math.ceil(Math.random()*mainHeight/2);
    }


    return {
        placeTarget: placeTarget,

        // return:
        //      'bingo' - when ball in target
        //      'ok' - else
        check: function (ball){
            var location = ball.getLocation();


            // check if ball in side the target
            if(     (location.x > x) &&
                    ( (location.x + location.radius*2) <  (x + targetWidth) ) &&
                    (location.y > y) &&
                    ( (location.y + location.radius*2) < (y + targetHeight) )  ){
                ball.setVelocity(0, 0);
                return 'bingo';
            }

            return 'ok';
        },

        paint: function (){
            mainCtx.drawImage(targetCanvas, x, y);
        }
    }
}

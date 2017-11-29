function board(mainCanvas, mainCtx){
    var boardWidth = parseInt(mainCanvas.getAttribute('width'));
    var boardHeight = parseInt(mainCanvas.getAttribute('height'));
    var boardFillStyle = "#AAAAAA"; // mainCtx.fillStyle;
    return {
        check: function (ball){
            var status = 'ok';
            var location = ball.getLocation();
            var velocity = ball.getVelocity();
            var shiftY = 1;

            // Hit wall: change X velocity
            if((location.x <= 0 ) || (location.x + location.radius >= boardWidth) ){
                velocity.vx = -velocity.vx;
            }
            // Hit ceiling : change y velocity
            if(location.y <= 0){
                velocity.vy = -velocity.vy;
            }
            if(location.y + location.radius >= boardHeight){
                status = 'out';
            }
            ball.setVelocity(velocity.vx, velocity.vy);
            return status;

        },
        paint: function (){
            mainCtx.fillStyle = boardFillStyle;
            mainCtx.fillRect(0 ,0, boardWidth, boardHeight);
        }
    }
}

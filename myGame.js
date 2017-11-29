

function onload() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var speed = 3;
    var frame = 0;
    var hits = 0;
    var state = 'ready';
    var boardObj = new board(canvas, ctx);
    var homeBaseObj = new homeBase(canvas, ctx);
    var ballObj = new ball(canvas, ctx);
    var targetObj = new target(canvas, ctx);




    document
        .getElementsByTagName("body")[0]
        .addEventListener('keydown', function (event){
        //console.log(event);
        if(event.code === "ArrowRight"){
            homeBaseObj.moveX(10);
        } else if(event.code === "ArrowLeft"){
            homeBaseObj.moveX(-10);
        } else if(event.code === "Space"){
            if(state === 'ready'){
                state = 'ok';
            }

        }
    });





    function paint(){


        switch (state) {
            case 'ready':
                boardObj.paint();
                ctx.font = "30px Arial";
                ctx.fillStyle = 'black';
                ctx.fillText("Press Space to start",10,50);
                var baseLocation = homeBaseObj.getLocation()
                ballObj.setLocation(150,280);
                ballObj.paint();
                homeBaseObj.setLocation(105, 290);
                homeBaseObj.paint();
                break;

            case 'ok':
                boardObj.paint();
                homeBaseObj.paint();
                targetObj.paint();


                // Check all objects in board
                boardObj.check(ballObj);
                homeBaseObj.check(ballObj);
                state = targetObj.check(ballObj);
                ballObj.move();
                ballObj.paint();
                printHits();

                break;

            case 'bingo':
                ++hits;
                targetObj.placeTarget();
                ballObj.setVelocity(1,1);
                state = 'ok';
                printHits();
        }




        window.requestAnimationFrame(paint);
    }


    function printHits (){
        ctx.font = "15px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText("hits: "+hits,0,15);
    }

    paint();

}
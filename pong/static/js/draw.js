var canvas = {width:500, height:300}

var c = document.getElementById("pong")
var ctx = c.getContext("2d")
var x =0;
var y =0;
var wid = 20;
var hei=20;


function drawPaddle(x,y,wid,hei){
    ctx.fillStyle='black'
    ctx.fillRect(x,y,wid,hei)

}

drawPaddle(x,y,wid,height)

function move(){
    if(UP && y>0){
        y=y-5
    }
    if(down && y<canvas.height){
        y=y+5
    }
}
var up = false;
var down = false;

document.onkeydown = function(e) {
    if (e.keycode == 38){ //upkey
        up=true;
    }
    if (e.keycode == 40) {//downkey
        down=true;
    }
}
document.onkeyup = function(e) {
    if (e.keycode == 38) //upkey
        up=false;
    if (e.keycode == 40) //downkey
        down=false;
}

function clearcanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}


setInterval(update,10)

function update(){
    clearcanvas();
    drawPaddle();
    move();
    
}
// look here https://stackoverflow.com/questions/39806858/how-to-use-arrow-keys-to-move-object-smoothly-in-canvas
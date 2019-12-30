var canvas = {width:500, height:300};
var c = document.getElementById("pong");
var ctx = c.getContext("2d");
var x =40;
var y =40;
var wid = 20;
var hei=20;


function drawPaddle(x,y,wid,hei){
    ctx.fillStyle='black'
    ctx.fillRect(x,y,wid,hei)

}

drawPaddle(x,y,wid,hei)

function move(){
    
    if(up && y>0){
        y=y-5
    }
    if(down && y<canvas.height){
        y=y+5
    }
}
var up = false;
var down = false;

window.onkeydown = function(e) {
    var keyPr = e.code;
    console.log(keyPr)
    if (e.code == "ArrowUp"){ //upkey
        up=true;
    }
    if (e.code == "ArrowDown") {//downkey
        down=true;
    }
}
window.onkeyup = function(e) {
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
    drawPaddle(x,y,wid,hei);
    move();
    
}
// look here https://stackoverflow.com/questions/39806858/how-to-use-arrow-keys-to-move-object-smoothly-in-canvas
//https://codepen.io/svsdesigns/pen/pvmjPG
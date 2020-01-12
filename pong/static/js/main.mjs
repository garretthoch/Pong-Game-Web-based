const h = document.getElementById("pong").clientHeight;
const w = document.getElementById("pong").clientWidth;
var canvas = {width:w, height:h};
var c = document.getElementById("pong");
var ctx = c.getContext("2d");
var y =0;

var start = true;

import Paddle from './paddle.mjs'
import Ball from './ball.mjs'





const p1 =new Paddle()
const p2 = new Paddle()
const ball =new Ball()

function move(){
    
    if(up && y>0){
        y=y-5;
    }
    if(down && y<canvas.height-p1.length){
        y=y+5;
    }
    p1.draw(y);
    p2.draw(y);
    
    
}

var up = false;
var down = false;

window.onkeydown = function(e) {
    var keyPr = e.code;
    if (e.code == "ArrowUp"){ //upkey
        up=true;
    }
    if (e.code == "ArrowDown") {//downkey
        down=true;
    }
}
window.onkeyup = function(e) {
    var keyPr = e.code;
    if (e.code == "ArrowUp") //upkey
        up=false;
    if (e.code == "ArrowDown") //downkey
        down=false;
}




var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
socket.on('connect', () =>{
    socket.emit('setup',{'height':canvas.height,'width':canvas.width});
});

socket. on('parameters',message =>{
    var p= message['paddle']
    p1.initialize(p['width'],p['length'],p['x'],p['y'],ctx)
    p2.initialize(p['width'],p['length'],canvas.width-p['x']-p['width'],p['y'],ctx)
    var b = message['ball']
    ball.initialize(b['length'],b['x'],b['y'],ctx)
});

socket.on('response', message =>{
    document.querySelector('.test').innerHTML= message;
});

socket.on('moveball',message =>{
    ball.x=message['x'];
    ball.y=message['y'];

})

console.log("its running")
ctx.fillStyle='black'
ctx.fillRect=(0,0,15,75)
p1.draw(ctx,10);
p2.draw(ctx,10);
ball.draw(ctx);

console.log("it reached the end")
/*document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('start').onclick=function(){
        socket.emit('startgame',{'height':canvas.height,'width':canvas.width});
        requestAnimationFrame(update);
    };
    
});
*/


function clearcanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}
function update(){
    clearcanvas();
    socket.emit('updateball');
    socket.emit('playerMove', y);
    p1.draw(y)
    p2.draw(y)
    move();
    ball.draw()
    requestAnimationFrame(update);
    
}

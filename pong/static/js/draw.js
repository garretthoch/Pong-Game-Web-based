const h = document.getElementById("pong").clientHeight;
const w = document.getElementById("pong").clientWidth;
var canvas = {width:w, height:h};
var c = document.getElementById("pong");
var ctx = c.getContext("2d");
var x =0;
var y =0;
var wid = 15;
var hei=75;
var xball = canvas.width/2;
var yball = canvas.height/2;
var lball = 10;

var start = true;


function drawPaddle(x,y,wid,hei){
    ctx.fillStyle='black';
    ctx.fillRect(x,y,wid,hei);

}

function drawball(x,y,len){
    ctx.fillStyle='black';
    ctx.fillRect(x,y,len,len);

}

drawPaddle(x,y,wid,hei)

function move(){
    
    if(up && y>0){
        y=y-5;
    }
    if(down && y<canvas.height-hei){
        y=y+5;
    }
    
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

function clearcanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}


var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
socket.on('connect', () =>{
    socket.emit('test', {'test':"helloworld"});
});

socket.on('response', message =>{
    document.querySelector('.test').innerHTML= message;
});

socket.on('moveball',message =>{
    xball=message['x'];
    yball=message['y'];
})




document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('start').onclick=function(){
        socket.emit('startgame',{'height':canvas.height,'width':canvas.width});
        requestAnimationFrame(update);
    };
    
});






function update(){
    clearcanvas();
    socket.emit('updateball');
    socket.emit('playerMove', y);
    drawPaddle(x,y,wid,hei);
    move();
    drawball(xball,yball,lball);
    requestAnimationFrame(update);
    
}

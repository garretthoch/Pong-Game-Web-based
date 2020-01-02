const h = document.getElementById("pong").clientHeight;
const w = document.getElementById("pong").clientWidth;
var canvas = {width:w, height:h};
var c = document.getElementById("pong");
var ctx = c.getContext("2d");
var x =0;
var y =0;
var wid = 15;
var hei=75;


function drawPaddle(x,y,wid,hei){
    ctx.fillStyle='black'
    ctx.fillRect(x,y,wid,hei)

}

drawPaddle(x,y,wid,hei)

function move(){
    
    if(up && y>0){
        y=y-5
    }
    if(down && y<canvas.height-hei){
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
    var keyPr = e.code;
    console.log(keyPr)
    if (e.code == "ArrowUp") //upkey
        up=false;
    if (e.code == "ArrowDown") //downkey
        down=false;
}

function clearcanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}


document.addEventListener('DOMContentLoaded', ()=>{
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    socket.on('connect', () =>{
        socket.emit('test', {'test':"helloworld"});
    });

    socket.on('response', message =>{
        document.querySelector('.test').innerHTML= message;
    })

    requestAnimationFrame(update);
});

//setInterval(update,10)


function update(){
    clearcanvas();
    drawPaddle(x,y,wid,hei);
    move();
    requestAnimationFrame(update);
    
}
// look here https://stackoverflow.com/questions/39806858/how-to-use-arrow-keys-to-move-object-smoothly-in-canvas
//https://codepen.io/svsdesigns/pen/pvmjPG
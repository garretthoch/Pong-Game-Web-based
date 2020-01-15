const h = document.getElementById("pong").clientHeight;
const w = document.getElementById("pong").clientWidth;
var canvas = {width:w, height:h};
var c = document.getElementById("pong");
var ctx = c.getContext("2d");

// Define player 1 object 
const p1 = {
    x: 0,
    y: 0,
    height: 75,
    width: 15,
    draw: function(ctx){
        ctx.fillStyle='black';
        ctx.fillRect(this.x,this.y,this.width,this.height);
    },
    initialize: function(param){
        this.width=param['width'];
        this.length=param['length'];
        this.x =param['x'];
        this.y =param['y'];
        
    }

};


// Define player 2 object 
const p2 = {
    x: 0,
    y: 0,
    height: 75,
    width: 15,
    draw: function(ctx){
        ctx.fillStyle='black';
        ctx.fillRect(this.x,this.y,this.width,this.height);

    },
    initialize: function(param){
        this.width=param['width'];
        this.length=param['length'];
        this.x =param['x'];
        this.y =param['y'];
        
    }

};

// Define ball object 
const ball = {
    x: 0,
    y: 0,
    length: 0,
    draw: function(ctx){
        ctx.fillStyle='black';
        ctx.fillRect(this.x,this.y,this.length,this.length);   

    },
    initialize: function(param){
        this.length=param['length'];
        this.x =param['x'];
        this.y =param['y'];
        
    }

};


function move(){
    var y = p1.y
    if(up && y>0){
        y=y-5;
    }
    if(down && y<canvas.height-p1.height){
        y=y+5;
    }
    p1.y=y
    p1.draw(ctx)
    p2.y = p1.y;
    p2.draw(ctx)
    
    
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


socket.on('parameters',message =>{
    var p= message['paddle1'];
    p1.initialize(p);
    p= message['paddle2'];
    p2.initialize(p);
    p= message['ball'];
    ball.initialize(p);
});

socket.on('response', message =>{
    document.querySelector('.test').innerHTML= message;
});

socket.on('moveball',message =>{
    ball.x=message['x'];
    ball.y=message['y'];

})





document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('start').onclick=function(){
        socket.emit('startgame',{'height':canvas.height,'width':canvas.width});
        requestAnimationFrame(update);
    };
});



function clearcanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function update(){
    clearcanvas();
    socket.emit('updateball');
    socket.emit('playerMove', p1.y);
    move();
    ball.draw(ctx)
    requestAnimationFrame(update);
    
}

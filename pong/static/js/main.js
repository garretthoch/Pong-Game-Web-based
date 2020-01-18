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
    if ( p1.y>0 && p1up){
        p1.y=p1.y-5;
    }  
    if (p2.y>0 && p2up){
        p2.y=p2.y-5;
    }

    if (p1.y<canvas.height-p1.height && p1down){
        p1.y=p1.y+5;
    }  
    if (p2.y<canvas.height-p2.height && p2down){
        p2.y=p2.y+5;
    }

    p1.draw(ctx)
    p2.draw(ctx)
    socket.emit('playerMove', {'p1':p1.y, 'p2':p2.y});
    
    
}

var p1up,p2up = false;
var p1down,p2down = false;


window.onkeydown = function(e) {
    console.log(e.code)
    if (e.code == "ArrowUp"){ //upkey
        p2up=true;
    }
    if (e.code == "ArrowDown") {//downkey
        p2down=true;
    }

    if (e.code == "KeyW"){ //upkey
        p1up=true;
    }
    if (e.code == "KeyS") {//downkey
        p1down=true;
    }
}
window.onkeyup = function(e) {
    var keyPr = e.code;
    if (e.code == "ArrowUp") //upkey
        p2up=false;
    if (e.code == "ArrowDown") //downkey
        p2down=false;

    if (e.code == "KeyW") //upkey
        p1up=false;
    if (e.code == "KeyS") //downkey
        p1down=false;
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
    move();
    ball.draw(ctx)
    requestAnimationFrame(update);
    
}

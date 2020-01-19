const h = document.getElementById("pong").clientHeight;
const w = document.getElementById("pong").clientWidth;
var canvas = {width:w, height:h};
var c = document.getElementById("pong");
var ctx = c.getContext("2d");

const gamepeicecolor= 'white'

// Define player 1 object 
const p1 = {
    x: 0,
    y: 0,
    height: 75,
    width: 15,
    draw: function(ctx){
        ctx.fillStyle=gamepeicecolor;
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
        ctx.fillStyle=gamepeicecolor;
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
        ctx.fillStyle=gamepeicecolor;
        ctx.fillRect(this.x,this.y,this.length,this.length);   

    },
    initialize: function(param){
        this.length=param['length'];
        this.x =param['x'];
        this.y =param['y'];
        
    }

};

var gameStatus = false;
var score = {'p1':0,'p2':0}

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

});

socket.on('endGame', message =>{
    score['p1'] = message['p1']
    score['p2'] = message['p2']

    gameStatus=false
});





document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('start').onclick=function(){
        gameStatus=true;
        socket.emit('startgame',{'height':canvas.height,'width':canvas.width});

        requestAnimationFrame(update);
    };
});



function clearcanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function drawBackgroundObjects(ctx){
    
    //score boards
    const x = (canvas.width / 4);
    const y = (canvas.height / 4);
    const s = 40;
    
    //ctx.clearRect(3*x,y,s, s)
    ctx.fillStyle = gamepeicecolor;
    ctx.font = "40px Bungee Inline";
    const offset=ctx.measureText("0").width
    ctx.fillText(score['p1'], x-offset, y );
    ctx.fillText(score['p2'], (3*x)-offset, y );

    //dividing line
    ctx.lineWidth = 8;
    ctx.strokeStyle = gamepeicecolor;
    ctx.setLineDash([20,20])
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
}

function update(){

    if (gameStatus){
        clearcanvas();
        socket.emit('updateball');
        drawBackgroundObjects(ctx)
        move();
        ball.draw(ctx)
        requestAnimationFrame(update);
    }
    else{
        clearcanvas();
        drawBackgroundObjects(ctx)
    }
    
}

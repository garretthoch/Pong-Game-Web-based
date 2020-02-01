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
        
        
        document.getElementById('start').style.visibility='hidden'
        requestAnimationFrame(update);
        drawBackgroundObjects()
        countdown()
        //gameStatus=true;
        //socket.emit('startgame',{'height':canvas.height,'width':canvas.width});
        
    };
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


async function countdown(){
    //score boards
    var c2 = document.getElementById("countdown");
    var countctx = c2.getContext("2d");
    countctx.fillStyle = gamepeicecolor;
    countctx.font = "40px Bungee Inline";
    const x = (canvas.width / 2);
    const y = (canvas.height / 2);
    
    
   
    for (var i = 3; i >0; i--){
        countctx.clearRect(0,0,canvas.width,canvas.height);
        const xoffset=(ctx.measureText(i).width)/2
        countctx.fillText(i, x-xoffset, y );
        await sleep(1000);

    }
    if (i == 0){
        countctx.clearRect(0,0,canvas.width,canvas.height);
        gameStatus=true;
        socket.emit('startgame',{'height':canvas.height,'width':canvas.width});
        requestAnimationFrame(update);
    }


    

}

function clearcanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function drawBackgroundObjects(ctx){
    var c3 = document.getElementById("background");
    var backgroundctx = c3.getContext("2d");
    
    //score boards
    const x = (canvas.width / 4);
    const y = (canvas.height / 4);
    const s = 40;
    
    //ctx.clearRect(3*x,y,s, s)
    backgroundctx.fillStyle = gamepeicecolor;
    backgroundctx.font = "40px Bungee Inline";
    const offset=backgroundctx.measureText("0").width
    backgroundctx.fillText(score['p1'], x-offset, y );
    backgroundctx.fillText(score['p2'], (3*x)-offset, y );

    //dividing line
    backgroundctx.lineWidth = 8;
    backgroundctx.strokeStyle = gamepeicecolor;
    backgroundctx.setLineDash([20,20])
    backgroundctx.moveTo(canvas.width/2, 0);
    backgroundctx.lineTo(canvas.width/2, canvas.height);
    backgroundctx.stroke();
}

function update(){
    console.log(gameStatus)
    clearcanvas();
    
    move();
    //ball.draw(ctx)
    if (gameStatus){
        socket.emit('updateball');
        ball.draw(ctx)
        requestAnimationFrame(update);
        
    }

}

var canvas = {width:500, height:300}

function draw(){
    var c = document.getElementById("pong")
    var ctx = c.getContext("2d")
    ctx.fillRect(0,0,20,60)
}

function move(){
    if(UP){
        //Logic here
    }
    if(down){
        //logic here
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

function paddle(x,y){
    //redraw rectangle here

}

setInterval(update,10)

function update(){
    //logic here that calls clear canvas and paddle
}
// look here https://stackoverflow.com/questions/39806858/how-to-use-arrow-keys-to-move-object-smoothly-in-canvas
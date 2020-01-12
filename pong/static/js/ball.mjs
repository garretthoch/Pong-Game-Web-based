export default class Ball {
    constructor(){

    }

    initialize(length, x,y,ctx){
        this.length = length;
        this.x=x;
        this.y=y;
        this.ctx=ctx
    }

    draw(ctx){
        ctx.fillStyle='black'
        ctx.fillRect=(this.x,this.y,this.length,this.length)
    }
}
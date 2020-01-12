export default class Paddle {
    constructor(){
        
    }
    initialize(width, height, x,y){
        this.height = height;
        this.width = width;
        this.x=x;
        this.y=y;
    }

    draw(ctx,y){
        ctx.fillRect=(this.x,this.y,this.width,this.height);
        ctx.fillStyle='black'
    }


}
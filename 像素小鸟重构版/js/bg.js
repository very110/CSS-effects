class Bg{
    canvas;
    constructor(canvas) {
        this.canvas = canvas;
        this.img=getImg('./image/stage_sky.png')
        this.ctx=canvas.getContext('2d');
        this.speed=10;

        this.img.onload=()=>{
            this.ctx.drawImage(this.img,0,0);
            this.draw(10);
        }
    }
    draw(speed){
        let {ctx,img,canvas}=this;
        clearCanvas(canvas);
        ctx.save();
        ctx.translate(-this.speed,0);
        ctx.drawImage(img,0,0);
        ctx.drawImage(img,this.canvas.width,0);
        this.speed+=speed;
        if (this.speed>=this.canvas.width){
            this.speed=0;
        }

        ctx.restore();
        requestAnimationFrame(this.draw.bind(this,5));
    }
}

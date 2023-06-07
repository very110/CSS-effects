class Dib{
    w;
    h;
    x;
    y;
    canvas;
    constructor(w,h,x,y,canvas) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.img2=new Image();
        this.ctx=canvas.getContext('2d');
        this.img2.src='../img/stage_ground.png';
        this.img2.onload=()=>{
            this.draw()
        }
        this.speed=10;
    }
    draw(){
        this.ctx.clearRect(0,0,1000,1000)
        let len=Math.ceil(this.canvas.width/this.w);
        let x=this.x+this.w;
        this.ctx.save();
        this.ctx.translate(this.speed,0);
        this.ctx.drawImage(this.img2,this.x,this.y,this.w,this.h);
        for (let i = 1; i < len; i++) {
            this.ctx.drawImage(this.img2,x*i,this.y,this.w,this.h);
        }
        for (let i = 1; i < len; i++) {
            this.ctx.drawImage(this.img2,-x*i,this.y,this.w,this.h);
        }
        this.speed+=5;
        if (this.speed>this.canvas.width){
            this.speed=0;
        }
        this.ctx.restore();
        requestAnimationFrame(this.draw.bind(this));
    }


}

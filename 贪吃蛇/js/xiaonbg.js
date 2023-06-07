class Bg{
    constructor(canvas) {
        this.canvas=canvas;
        this.ctx=canvas.getContext('2d');
        this.img=new Image();
       this.img.src='../img/stage_sky.png';
       this.img.onload=()=>{
            this.draw();
       }
     
      this.speed=10;
    }
    draw(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.speed,0);
        this.speed+=10;
        this.ctx.drawImage(this.img,0,0,this.canvas.width,this.canvas.height);
        this.ctx.drawImage(this.img,0,0,-this.canvas.width,this.canvas.height);
        if (this.speed>this.canvas.width){
            this.speed=0;
        }
        this.ctx.restore();
        requestAnimationFrame(this.draw.bind(this));
    }
}

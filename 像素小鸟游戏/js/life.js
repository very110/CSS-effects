class Life{
    constructor(x,y,w,h,canvas,cb){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.roleLife=cb;
        this.canvas=canvas;
        this.ctx=canvas.getContext('2d');
        this.img=new Image();
        this.img.src='./image/bird.png';
        this.img.onload=function (){
            this.draw();
        }.bind(this)
    }

    draw(){
        let {x,y,w,h,canvas}=this
        this.ctx.clearRect(0,0,canvas.width,canvas.height);
        this.ctx.drawImage(this.img,0,0,86,66,x,y,w,h);
        this.ctx.font = "bold 50px sans-serif";
        let cv='X'+this.roleLife();
        this.ctx.fillText(cv, x+50,y+40, 100);
    }
}

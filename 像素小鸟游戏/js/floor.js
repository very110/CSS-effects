class Floor{
    constructor(w,h,canvas,x,y) {
            this.canvas=canvas;
            this.ctx=canvas.getContext('2d')
            this.x=x;
            this.y=y;
            this.spend=5;
            this.width=w;
            this.hight=h;
            this.image=new Image();
            this.image.src='./image/stage_ground.png';
            this.image.onload=function (){
                let {x,y,width,hight}=this;
                for (let i = 0; i < 40; i++) {
                  this.ctx.drawImage(this.image,x+i*30,y,this.width,this.hight)
                }
            }.bind(this);
            this.image2=new Image();
            this.image2.src='./image/get_ready.png';
            this.image2.onload=function (){
                 this.ctx.drawImage(this.image2,0,0,300,300)
            }.bind(this)
    }
    draw(){
        let {x,y,width,hight}=this;
        for (let i = 0; i < 40; i++) {
            this.ctx.drawImage(this.image,x+i*30,y,this.width,this.hight)
        }
    }
    move(){
        let {x,y,width,hight,ctx,}=this;

        setInterval(function (){

            ctx.save();
            ctx.clearRect(0,0,1000,700);
            ctx.translate(-this.spend,0);
            this.spend+=10;
            if (this.spend>this.canvas.width/4-50){
                this.spend=0;
            }
            this.draw();
            ctx.restore();
        }.bind(this),100);
    }
}

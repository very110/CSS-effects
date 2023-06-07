class Role{
    constructor(w,h,x,y,canvas,spend) {
            this.width=w;
            this.height=h;
            this.cx=0;
            this.cy=0;
            this.x=x;
            this.y=y;
            this.life=3;
            this.spend=spend
            this.canvas=canvas;
            this.ctx=canvas.getContext('2d');
            this.image=new Image();
            this.image.src='./image/bird.png';
            this.image.onload=function (){
                let {x,y,width,height}=this;
                this.ctx.drawImage(this.image,this.cx,this.cy,width,height,x,y,width-20,height-10);
            }.bind(this)


    }
    draw(){
        let {width,height,x,y}=this;
        this.ctx.clearRect(0,0,1000,700)
        this.ctx.drawImage(this.image,this.cx,this.cy,width,height,x,y,width-20,height-10);
    }
    start(){
        let i=1;
       let time=setInterval(function (){
            if (this.y+5<this.canvas.height-100){
                this.y+=5;
                this.cy=(i++%3)*this.height;
            }
            this.draw();
        }.bind(this),this.spend);
       window.times.push(time);

        window.onkeyup=function (e){
            switch (e.keyCode){
                case 37:{
                    if (this.x-20<=0){
                        break;
                    }
                    this.x-=20;
                    break;
                }
                case 38:{
                    if (this.y-20<=0){
                        break;
                    }
                    this.y-=30;
                    break;
                }
                case 39:{
                    if (this.x+20>=this.canvas.width-this.width){
                        break;
                    }
                    this.x+=20;
                    break;
                }
            }
            this.draw();
        }.bind(this)
    }
}

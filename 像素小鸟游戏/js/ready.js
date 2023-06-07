class Ready{
    constructor(x,y,w,h,canvas) {
        this.x=x;
        this.y=y;
        this.width=w;
        this.height=h;
        this.canvas=canvas;
        this.ctx=this.canvas.getContext('2d');
        this.isShow=false;
        this.readeyImg=new Image();
        this.share=new Image();
        this.okOrnew=new Image();
        this.gameReady();
    }
    gameReady(){
        let {x,y,width,height,ctx,readeyImg}=this;
        this.ctx.clearRect(0,0,this.width,this.height);
        this.readeyImg.src=this.isShow?'./image/game_over.png':'./image/get_ready.png';
        this.readeyImg.onload=function (){
            ctx.drawImage(readeyImg,x,y,width,height);
        }.bind(this);
        this.share.src='./image/share.png';
        this.share.onload=function (){
            ctx.drawImage(this.share,this.canvas.width/2+60,this.canvas.width/2/2,104,38);
        }.bind(this)
        this.okOrnew.src=this.isShow?'./image/new_record.png':'./image/ok.png';
        this.okOrnew.onload=function (){
            ctx.drawImage(this.okOrnew,30,this.canvas.width/2/2,104,38);
        }.bind(this)
    }
}

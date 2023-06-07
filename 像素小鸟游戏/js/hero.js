class Hero{
    constructor(canvas) {
        this.canvas=canvas;
        this.ctx=canvas.getContext('2d');

    }
    draw(){
        this.ctx.clearRect(0,0,1000,1000);
        this.ctx.save();
        this.ctx.font = "bold 45px sans-serif";
        this.ctx.fillText("英雄榜",this.canvas.width/2-50,50,100);
        this.ctx.restore();
        this.forLocal();
    }
    forLocal(){
        let local=JSON.parse(localStorage.getItem('hero'))||[];
        let nameX=this.canvas.width/12;
        let fractionX=this.canvas.width-90;
        let y=100

        this.ctx.save()
       local.sort((a,b)=>{return b.fraction-a.fraction});
       this.ctx.font='bold 25px sans-serif';
        this.ctx.fillStyle='#FFFFFF'
       local.forEach((item,index)=>{
           index=index+1;
           this.ctx.fillText(index+'    '+item.name,nameX,y);
           this.ctx.fillText(item.fraction+'',fractionX,y);
           y+=50;
       })


        this.ctx.restore();
    }
}


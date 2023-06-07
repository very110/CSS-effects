class Pole{
    constructor() {
        this.height=this.getRandomWidth();
        this.width=98;
    }
    getRandomWidth(){
        return Math.round(Math.random()*(500-200)+200);
    }
    move(){
        this.x-=20;
    }
}

class poleTop extends Pole{
        constructor(canvas) {
        super();
        this.img=new Image();
        this.img.src='./image/pipe_head_1.png';
            this.x=canvas.width;
            this.y=0;
            // this.img.onload=function (){
            //     let ctx=canvas.getContext('2d');
            //     ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
            // }.bind(this)
    }
}

class poleBottom extends Pole{
    constructor(canvas) {
		
        super();
        this.x=canvas.width;
        this.y=canvas.height-this.height-50;
        this.img=new Image()
        this.img.src='./image/pipe_head_2.png';
        // this.img.onload=function (){
        //     let ctx=canvas.getContext('2d');
        //     ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        // }.bind(this)
    }
}

class Poles{
    constructor(canvas,roleSeatCall,life,bgrole,bgready,clearimg,frac) {
        this.frac=frac;
        this.cb=roleSeatCall;
        this.bgready=bgready
        this.poleTops=[];
        this.poleBottoms=[];
        this.canvas=canvas;
        this.life=life;
        this.isUnmatched=false;
        this.bgrole=bgrole;
        this.ctx=canvas.getContext('2d');
        this.addPole();
        this.clearimg=clearimg;
    }

    draw(){
        let times=setInterval(function (){
            this.ctx.clearRect(0,0,this.canvas.width+1,this.canvas.height+1);
            for (let i = 0; i <this.poleTops.length; i++) {
                this.poleTops[i].move();
                let {img,width,height,x,y}=this.poleTops[i];
                this.ctx.drawImage(img,x,y,width,height);
                if (this.isTouch(this.poleTops[i],this.isUnmatched)){
                    this.unmatched();
                    if (this.life.roleLife()<1){
                        this.fail();
                    }
                }
                if (x<0-width){
                    this.poleTops.splice(i,1);
                }
            }
            for (let i = 0; i <this.poleBottoms.length; i++) {
                this.poleBottoms[i].move();
                let {img,width,height,x,y}=this.poleBottoms[i];
				
					this.ctx.drawImage(img,x,y,width,height);
				
                if (this.isTouch(this.poleBottoms[i],this.isUnmatched)){
                    this.unmatched();
                    if (this.life.roleLife()<1){
                        this.fail();
                    }
                }
                if (x<0-width){
                    this.poleBottoms.splice(i,1);
                }
            }
        }.bind(this),200);
        window.times.push(times);
    }
    addPole(){
        let that=this;
       let time=setInterval(()=>{
            while (true){
                let potop=new poleTop(this.canvas);
                let pobom=new poleBottom(this.canvas);
                if (potop.height+pobom.height<=600){
                    that.poleTops.push(potop);
                    that.poleBottoms.push(pobom);
                    break;
                }
            }
        },2000)
        this.draw();
       window.times.push(time);
    }
    unmatched(){
        this.isUnmatched=true;
        this.bgrole.classList.add('aniw');
        this.frac.isStop(this.isUnmatched);
        setTimeout(function (){
            this.isUnmatched=false;
            this.bgrole.classList.remove('aniw');
            this.frac.isStop(this.isUnmatched);
        }.bind(this),3000)
    }
    isTouch(pole,isTo){
        if (isTo){
            return ;
        }
        let role=this.cb();
       let{x:roleX,y:roleY,width:roleW,height:roleH}=role;
        let {x:poleX,y:poleY,width:poleW,height:poleH}=pole;
        let maxPx=poleX+poleW;
        let maxPy=poleY+poleH;
        let maxRx=roleX+roleW;
        let maxRy=roleY+roleH;

        let maxX=Math.max(roleX,poleX);
        let minX=Math.min(maxRx,maxPx);
        let maxY=Math.max(roleY,poleY);
        let minY=Math.min(maxPy,maxRy);
        if (maxX<=minX-10&&maxY<=minY-20){
            role.life-=1;
           this.life.draw();
            return true;
        }else{
            return false;
        }
    }

    fail(){
        alert("游戏失败");
        let name=prompt("请输入您的昵称");
        let fraction=this.frac.frac;
        if (name&&name.trim()){
            let loc=JSON.parse(localStorage.getItem('hero'))||[];
            loc.push({name,fraction});
            localStorage.setItem('hero',JSON.stringify(loc));
        }
        window.times.forEach(item=>{
            clearInterval(item);
        });
        this.clearimg(this.frac);
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.bgready.isShow=true;
        this.bgready.gameReady();
    }
}

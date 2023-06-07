class Pole{
    constructor() {
        this.randomH=Math.round((Math.random()*200)+200);
        this.w=80;
    }
    move(){
        this.x-=20;
    }
}

class PoleTop extends Pole{
        constructor(canvas) {
            super();
            this.canvas = canvas;
            this.ctx=canvas.getContext('2d')
            this.img=getImg('./image/pipe_head_1.png');
            this.x=canvas.width-50;
            this.y=0;
        }

        move() {
            super.move();
        }
}

class PoleBottom extends Pole{
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.ctx=canvas.getContext('2d')
        this.img=getImg('./image/pipe_head_2.png');
        this.y=canvas.height-this.randomH-100;
        this.x=canvas.width-50;
    }
    move() {
        super.move();
    }
}

class ManagePoles{
    canvas;
    constructor(canvas,role,life,fraction) {
        this.canvas = canvas;
        this.role=role;
        this.life = life;
        this.fraction = fraction;
        this.ctx=canvas.getContext('2d')
        this.plTops=[];
        this.plBms=[];
        this.t= this.shaking();
        this.timerAndEvent()
    }
    addPole(){
        let {canvas}=this;
        while (true){
            let top=new PoleTop(canvas);
            let bm=new PoleBottom(canvas);
            if (top.randomH+bm.randomH<800&&top.randomH+bm.randomH>600){
                this.plTops.push(top);
                this.plBms.push(bm);
                break;
            }
        }
    }
    timerAndEvent(){
        window.timers.push( setInterval(()=>{
            this.addPole();
        },2000))
        window.timers.push(setInterval(()=>{
            clearCanvas(this.canvas);
            this.draw(this.plTops)
            this.draw(this.plBms);
        },300))
        window.timers.push(setInterval(()=>{
            this.life.leftDraw();
        },500))

    }

    draw(arrPole){
        const role=this.role;
        for (let i=0;i<arrPole.length;i++){
            let {canvas,ctx,img,w,randomH,x,y}=arrPole[i];
            if (arrPole[i].img.complete){
                ctx.drawImage(img,x,y,w,randomH);
                arrPole[i].move();
                if (this.isTouch(arrPole[i])){
                    if (!this.fraction.isUnmatched){
                        this.life.life-=1;
                    }
                    this.fraction.isUnmatched=true;

                    if (this.life.life<1){
                        this.file();
                    }
                    this.role.canvas.classList.add('anim');
                   this.t();
                }
            }
        }
    }
    shaking(){
        let flag=true;
        return ()=>{
            if (flag){
                flag=false;
                setTimeout(()=>{
                    flag=true
                    this.fraction.isUnmatched=false;
                    this.role.canvas.classList.remove('anim');
                },3000)
            }
        }
    }
    isTouch(pole){
        let {x:Px,y:Py,randomH:Ph,w:Pw}=pole;
        let {x:Rx,y:Ry,w:Rw,h:Rh}=this.role;
        let maxRw=Rx+Rw;
        let maxRy=Ry+Rh;
        let maxPW=Px+Pw;
        let maxPy=Py+Ph;

        let maxX=Math.max(Px,Rx);
        let minW=Math.min(maxRw,maxPW);

        let maxY=Math.max(Py,Ry);
        let minH=Math.min(maxPy,maxRy);

        if (maxX<minW-50&&maxY<minH-10){
            role.life-=1;
            return true;
        }
        return false;

    }
    file(){
        alert("游戏失败");
        let name=prompt("请输入您的昵称");
        let fraction=this.fraction.fraction;
        if (name&&name.trim()){
            let loc=JSON.parse(localStorage.getItem('hero'))||[];
            loc.push({name,fraction});
            localStorage.setItem('hero',JSON.stringify(loc));
        }

        window.removeEventListener('keydown',ke);
        window.timers.forEach(item=>{
            clearInterval(item);
        });
        setTimeout(()=>{
            this.ctx.clearRect(0,0,1000,1000);
            clearCanvas(this.role.canvas)
            clearCanvas(this.life.canvas)
            clearCanvas(this.fraction.canvas)
            let img=getImg('../image/game_over.png');
            img.onload=()=>{
                this.ctx.drawImage(img,80,this.canvas.height/2);
                this.canvas.style.zIndex='999';
                let canvas=this.canvas
                this.canvas.onclick=function (){
                    canvas.style.zIndex='0';
                    clearCanvas(canvas);
                    getE('.ready').style.display='block';
                    console.log(getE('.ready'))
                    getE('.ready').style.zIndex='0';
                }
            }
            over()
        })

    }
}

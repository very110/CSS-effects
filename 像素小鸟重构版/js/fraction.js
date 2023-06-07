class Fraction{
    constructor(canvas) {
        this.canvas=canvas;
        this.fraction=0;
        this.isUnmatched=false;
        this.ctx=canvas.getContext('2d')
        this.draw();

        window.timers.push(setInterval(()=>{
            clearCanvas(this.canvas);
            if (!this.isUnmatched){
                this.fraction+=100;
            }
            this.draw();
        },1000))
    }
    draw(){
        clearCanvas(this.canvas);
        this.ctx.font="30px Arial";
        this.ctx.fontStyle="black";
        let fraction=this.fraction+'';
        this.ctx.fillText(fraction,this.canvas.width/2,180);
    }


}

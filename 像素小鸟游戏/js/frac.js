class Frac{
    constructor(canvas) {
        this.frac=0;
        this.canvas=canvas;
        this.isUnmatched=false;
        this.cxt=canvas.getContext('2d');
        this.draw();
    }
    draw(f=0){
        this.cxt.clearRect(0,0,1000,1000);
        this.cxt.font='bold 50px sans-serif';
        let cv=`${f}`;
        this.cxt.fillText(cv,this.canvas.width/2-25,50,100);
    }
    start(){
        let time=setInterval(function (){
            if (!this.isUnmatched){
                this.frac+=100;
                this.draw(this.frac);
            }
        }.bind(this),1000);
        window.times.push(time);
    }
    isStop(isUnmatched){
        this.isUnmatched=isUnmatched;
    }

}

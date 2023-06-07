class Bg{
    canvas;
    box;
    constructor(canvas,box) {
        this.canvas = canvas;
        this.ctx=canvas.getContext('2d');
        this.box = box;
        this.row=Math.floor(canvas.height/this.box);
        this.col=Math.floor(canvas.width/this.box);
        this.draw();
    }
    draw(){
        for (let i=0;i<this.row;i++){
            this.ctx.beginPath();
            this.ctx.moveTo(0,i*this.box);
            this.ctx.lineTo(this.canvas.width,i*this.box);
            this.ctx.strokeStyle='black';
            this.ctx.stroke()
        }
        for (let i = 0; i < this.col; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i*this.box,0);
            this.ctx.lineTo(i * this.box,this.canvas.height);
            this.ctx.strokeStyle = 'black';
            this.ctx.stroke()
        }
    }
}

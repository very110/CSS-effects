class Life{
    canvas;
    role;
    constructor(canvas,role) {
        this.canvas = canvas;
        this.role = role;
        this.ctx=canvas.getContext('2d');
        this.life=3;
    }
    leftDraw(){
        if (this.role.img.complete){
            clearCanvas(this.canvas);
            let life='X'+this.life;
            this.ctx.drawImage(this.role.img,0,0,86,66,80,150,36,36);
            this.ctx.font="30px Arial";
            this.ctx.fontStyle="black";
            this.ctx.fillText(life,120,180);
        }
    }

}

class bgound {
	constructor(canvas, speed) {

		this.canvas = canvas;
		this.speed = speed;
		this.bgwitdh=1000;
		this.bghight=650;
		this.img="./image/stage_sky.png";
		this.ctx=this.canvas.getContext("2d");
		this.image=new Image();
		this.image.src=this.img;
		this.image.onload=function (){
				this.draw();	
		}.bind(this);

	}
	draw(x=0,y=0) {
		this.ctx.drawImage(this.image,0,0,this.bgwitdh,this.bghight);
		this.ctx.drawImage(this.image,this.bgwitdh,0,this.bgwitdh,this.bghight);
	}
	move(){
		let ctx=this.ctx;
		setInterval(function (){
			ctx.save();
			ctx.clearRect(0,0,this.bgwitdh,this.bghight);
			ctx.translate(-this.speed,0);
			this.speed+=10;
			if (this.speed>this.canvas.width){
				this.speed=0;
			}
			this.draw();
			ctx.restore();
		}.bind(this),50);
	}
}

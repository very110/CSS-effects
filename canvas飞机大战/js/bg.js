class Bg {

	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.img = getImg('./img/background.png');
		this.speed = 0;
		this.audio = new Audio('./audio/game_music.mp3');

		this.img.onload = () => {
			this.ctx.drawImage(this.img, 0, 0);
			this.ctx.drawImage(this.img, 0, -this.canvas.height);
			this.draw(10);
			this.audioPlay()
		}
	}

	audioPlay() {

		this.audio.loop = true;
		this.audio.volume = 1;

		document.addEventListener('click', () => {
			this.audio.play();
		}, {
			once: true
		});


	}

	draw(speed) {
		this.ctx.clearRect(0, 0, ...getCanvasWH(this.canvas));
		this.ctx.save();
		this.ctx.translate(0, this.speed);
		this.ctx.drawImage(this.img, 0, 0);
		this.ctx.drawImage(this.img, 0, -this.canvas.height);
		this.speed += speed;
		this.ctx.stroke();
		if (this.speed >= this.canvas.height) {
			this.speed = 0;
		}
		this.ctx.restore();
		requestAnimationFrame(this.draw.bind(this, 5));
	}



}
class Bullets {
	canvas;
	bw;
	bh;
	constructor(canvas, bw, bh, role) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.bw = bw;
		this.bh = bh;
		this.role = role;
		this.img = getImg('./img/bullet2.png');
		this.arrayBlt = [];
		this.img.onload = () => {
			this.audioStart();
			this.timerAndEvent(canvas, bw, bh, role, this.img)
		}
	}

	audioStart() {
		const audio = new Audio('./audio/bullet.mp3');
		document.addEventListener('click', () => {
			audio.loop = true;
			audio.play();
		}, {
			once: true
		});
	}

	timerAndEvent(canvas, bw, bh, role, img) {
		setInterval(() => {
			this.arrayBlt.push(new Bullet(canvas, bw, bh, role, img));
		}, 300)
		setInterval(() => {
			this.ctx.clearRect(0, 0, ...getCanvasWH(this.canvas))
			const enemys = getEnemy();
			let arrEnemy = enemys.ArrEnemy;
			const toDelete = [];
			for (let i = 0; i < this.arrayBlt.length; i++) {
				this.arrayBlt[i].move();
				this.arrayBlt[i].draw();
				if (this.arrayBlt[i].y < 0) {
					toDelete.push(i);
				}
				for (let j = 0; j < arrEnemy.length; j++) {
					if (this.isObjInsect(arrEnemy[j], this.arrayBlt[i])) {
						arrEnemy.splice(j, 1);
					}
				}
			}
			for (let i = toDelete.length - 1; i >= 0; i--) {
				this.arrayBlt.splice(toDelete[i], 1);
			}
		}, 40)
	}

	isObjInsect(obj1, obj2) {
		let minX1 = obj1.x;
		let maxX1 = obj1.x + obj1.w;

		let minY1 = obj1.y;
		let maxY1 = obj1.y + obj1.h;

		let minX2 = obj2.x;
		let maxX2 = obj2.x + obj2.bw;

		let minY2 = obj2.y;
		let maxY2 = obj2.y + obj2.bh;

		//相交矩形的最值
		let minX = Math.max(minX1, minX2);
		let maxX = Math.min(maxX1, maxX2);
		let minY = Math.max(minY1, minY2);
		let maxY = Math.min(maxY1, maxY2);

		if (minX < maxX && minY < maxY) {
			return true;
		} else {
			return false;
		}
	}
}

class Bullet {
	canvas;
	bw;
	bh;
	role;
	img;

	constructor(canvas, bw, bh, role, img) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d')
		this.bw = bw;
		this.bh = bh;
		this.role = role;
		this.img = img;
		this.x = role.cx + (role.rW / 2) - (bw / 2);
		this.y = role.by + (bh / 2);

	}
	draw() {
		let {
			bw,
			bh,
			img,
			ctx
		} = this;
		ctx.drawImage(img, this.x, this.y, bw, bh);
	}
	move() {

		this.y -= 10;
	}

}
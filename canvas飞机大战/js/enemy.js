class EnemyManage {
	canvas;

	constructor(canvas, role) {
		this.canvas = canvas;
		this.role = role;
		this.ctx = canvas.getContext('2d')
		this.ArrEnemy = [];

		this.timerAndEvent();
	}

	timerAndEvent() {
		setInterval(() => {
			let random = Math.round(((Math.random() * (3 - 1)) + 1));
			let enemy;
			switch (random) {
				case 1: {
					enemy = new Enemy1(this.canvas);
					break;
				}
				case 2: {
					enemy = new Enemy2(this.canvas);
					break;
				}
				case 3: {
					enemy = new Enemy3(this.canvas);
					break;
				}
			}

			this.ArrEnemy.push(enemy);
		}, 1000)

		setInterval(() => {
			let {
				ArrEnemy
			} = this
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			const deleteArr = []
			for (let i = 0; i < ArrEnemy.length; i++) {
				ArrEnemy[i].move();
				ArrEnemy[i].draw();
				if (this.isOutScreen(ArrEnemy[i].y)) {
					deleteArr.push(i);
				}
				if (this.isObjInsect(ArrEnemy[i], this.role)) {
					// alert('失败');
					console.log('失败');
				}
			}
			for (let i = deleteArr.length - 1; i >= 0; i--) {
				this.ArrEnemy.splice(deleteArr[i], 1);
			}
		}, 100)
	}

	isOutScreen(ae) {

		return ae >= this.canvas.height;
	}

	isObjInsect(obj1, obj2) {
		//分别获取2个矩形的最值
		let minX1 = obj1.x;
		let maxX1 = obj1.x + obj1.w;

		let minY1 = obj1.y;
		let maxY1 = obj1.y + obj1.h;

		let minX2 = obj2.cx;
		let maxX2 = obj2.cx + obj2.rW;

		let minY2 = obj2.by;
		let maxY2 = obj2.by + obj2.rH;

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

class Enemy {
	canvas;
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d')

		this.img = null;
		this.x = this.getRandom(canvas.width, 0) - 100;
		this.y = -canvas.height + 100;
		this.w = 0;
		this.h = 0;
	}

	getRandom(max, min) {
		let random = Math.round((Math.random() * max - min) + min);
		return random;
	}
	move() {
		this.y += 8;
	}
	draw() {
		if (this.img.complete) {
			this.ctx.drawImage(this.img, 0, 0, this.w, this.h, this.x, this.y, this.w, this.h);
		}
	}
}

class Enemy1 extends Enemy {
	constructor(canvas) {
		super(canvas);
		this.w = 38;
		this.h = 34;
		this.img = getImg('./img/enemy1.png');
	}

}

class Enemy2 extends Enemy {
	constructor(canvas) {
		super(canvas);
		this.w = 110;
		this.h = 164;
		this.img = getImg('./img/enemy2.png');
	}

}

class Enemy3 extends Enemy {
	constructor(canvas) {
		super(canvas);
		this.w = 46;
		this.h = 64;
		this.img = getImg('./img/enemy3.png');
	}

}
class Role {
	constructor(canvas, roleW, roleH) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.rW = roleW;
		this.rH = roleH;
		this.cx = 0;
		this.by = 0;
		this.img = getImg('./img/herofly.png');
		this.img.onload = () => {
			this.createRole();
			this.startTimer();
		}
		this.bool = false;
	}
	createRole() {
		let {
			canvas,
			rW,
			rH,
			ctx
		} = this;
		let centerX = canvas.width / 2 - rW / 2;
		let bottomY = canvas.height - rH - 20;
		this.cx = centerX;
		this.by = bottomY;
	}

	draw() {
		let {
			canvas,
			ctx,
			cx,
			by,
			rW,
			rH,
			bool
		} = this;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		let x = rW * bool;
		console.log(x);
		ctx.drawImage(this.img, x, 0, rW, rH, cx, by, rW, rH);
		this.bool = !bool;
	}

	startTimer() {
		setInterval(() => {
			this.draw()
		}, 30)

		document.addEventListener('keydown', (e) => {
			switch (e.keyCode) {
				case 37: {
					this.left = true;
					break;
				}
				case 38: {
					this.up = true;
					break;
				}
				case 39: {
					this.right = true;
					break;
				}
				case 40: {
					this.down = true;
					break;
				}
			}
		})
		document.addEventListener('keyup', (e) => {
			switch (e.keyCode) {
				case 37: {
					this.left = false;
					break;
				}
				case 38: {
					this.up = false;
					break;
				}
				case 39: {
					this.right = false;
					break;
				}
				case 40: {
					this.down = false;
					break;
				}
			}
		})
		setInterval(() => {
			let {
				left,
				right,
				up,
				down
			} = this;
			if (left) {
				this.cx -= 2
			} else if (right) {
				this.cx += 2;
			} else if (up) {
				this.by -= 2;
			} else if (down) {
				this.by += 2;
			}
		}, 10)
	}
}
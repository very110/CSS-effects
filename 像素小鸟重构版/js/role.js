class Role {
    canvas;
    w;
    h;

    constructor(canvas, w, h) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.w = w;
        this.h = h;
        this.sp = 0;
        this.x = 200;
        this.y = canvas.height / 2 - w / 2;
        this.img = getImg('./image/bird.png');
        this.img.onload = () => {
            this.draw();
            this.timerAndEvent();
        }
    }

    draw() {
        let {w, h, canvas, img, ctx, sp, x, y} = this;
        clearCanvas(canvas);
        let dc = this.sp * h;
        ctx.drawImage(img, 0, dc, w, h, x, y, w - 30, h - 10);
        this.sp++;
        this.sp %= 3;
    }

    timerAndEvent() {

        let {canvas} = this;
        window.ke=(e) => {
            e.preventDefault();
            let code = e.keyCode;
            let speed = 28;
            switch (code) {
                case 37: {
                    if (this.x < 0) {
                        break;
                    }
                    this.x -= speed;
                    break;

                }
                case 38: {
                    if (this.y < 100) {
                        console.log(1)

                        break;
                    }
                    this.y -= speed;
                    break;

                }
                case 39: {

                    if (this.x > canvas.width-100) {
                        break;

                    }
                    this.x += speed;
                    break;

                }
                case 40: {
                    if (this.y > canvas.height-200) {
                        console.log('b')
                        break;
                    }
                    this.y += speed;
                    break;
                }
            }
        }
        window.addEventListener('keydown',ke);
        window.timers.push(setInterval(() => {
            if (this.y < canvas.height-200) {
                this.y+=8;
            }
            this.draw();
        }, 100));


    }
}

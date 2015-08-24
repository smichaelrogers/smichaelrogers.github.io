(function (window) {
	function Ball(size) {
		this.Container_constructor();
		this.size = size;
		this.ball = new createjs.Shape();
		this.addChild(this.ball);
		this.ballGfx = this.ball.graphics;
		this.ballGfx.clear();
		this.ballGfx.setStrokeStyle(2)
			.beginRadialGradientFill(["rgb(255, 255, 255)", "rgba(255, 0, 84, 1)"], [0, 1], this.size / 2, this.size * 1.33, 0, this.size / 3, this.size * 1.33, this.size / 2)
			.drawCircle(this.size / 2, this.size, this.size);
		this.jumpReleased = true;
		this.jumps = 5;
		this.a = -0.7;
		this.dY = 0.0;
		this.t = 0.0;
		this.v0 = 16.0;
		this.y0 = 500.0;
		this.diving = false;
		this.dYN = [1, 1, 1];
		this.idx = 0;
		this.squish = 1.0;
		this.yN = 0;
		this.jumpTimer = 0.0;
	}

	var p = createjs.extend(Ball, createjs.Container);
	p.ball;
	p.a;
	p.t;
	p.v0;
	p.y0;
	p.dY;
	p.jumps;
	p.jumpReleased;
	var sum;

	p.recognizeAltitude = function (worldY) {
		this.a = -0.7 + (Math.abs(this.y) / (worldY * 3));
	}

	p.tick = function (event) {
		this.assertSquishiness();
		this.t += 1.0;
		this.jumpTimer += 1.0;
		if (this.jumpTimer >= 24 + ((this.a + 1) * 100) && this.jumps < 5) {
			this.jumps++;
			console.log(((this.a + 1) * 40));
			this.jumpTimer = 0;
		}
		var n = (0.5 * this.a * Math.pow(this.t, 2)) + (this.v0 * this.t) + this.y0;
		this.dY = n - this.y;
		this.y = n;
	}


	p.assertSquishiness = function () {
		if (this.scaleY < 0.95 && this.scaleY > 0.8) {
			this.scaleY += (Math.abs(1.0 - this.scaleY) / 16);
		}
		if (this.scaleY > 1.05 && this.scaleY < 1.3) {
			this.scaleY -= (Math.abs(1.0 - this.scaleY) / 4);
		}
		if (this.scaleX < 0.95 && this.scaleX > 0.8) {
			this.scaleX += (Math.abs(1.0 - this.scaleX) / 16);
		}
		if (this.scaleX > 1.05 && this.scaleX < 1.3) {
			this.scaleX -= (Math.abs(1.0 - this.scaleX) / 16);
		}
		this.idx = (this.idx + 1) % 3;
		this.dYN[this.idx] = this.dY / 40;
		sum = 0;
		for (var i = 0; i < 3; i++) {
			sum += this.dYN[i];
		}
		this.squish = sum / 3;
		this.scaleX = 1.0 + (this.squish / 2);
		this.scaleY = 1.0 - (this.squish / 2);
	}


	p.hit = function (platform) {
		this.diving = false;
		if (this.dY < 0) {
			this.y0 = platform.y + platform.sizeY;
			this.v0 = Math.sqrt(Math.pow(this.a * this.dY, 2));
			this.t = 0.0;
		} else if (this.dY > 2) {
			this.y0 = platform.y - ball.size;
			this.v0 = 0.8 * this.a * this.v0;
			this.t = 0.0;
		}
	}

	p.jump = function () {
		if (this.jumpReleased && this.jumps > 0 && !this.diving && (this.t > 0.15 || Math.abs(this.squish) < 0.01)) {
			this.v0 = 16.0;
			this.t = 0.0;
			this.jumpTimer = 0;
			this.y0 = this.y;
			this.jumps--;
			this.jumpReleased = false;
		}
	}

	p.dive = function () {
		if (!this.diving && this.jumpReleased & this.t > 1) {
			this.t = 0.5;
			this.v0 = -36.0;
			this.y0 = this.y + 60;
			this.jumpReleased = false;
			this.diving = true;
		}
	}

	p.releaseJump = function () {
		this.jumpReleased = true;
	}
	window.Ball = createjs.promote(Ball, "Container");

}(window));

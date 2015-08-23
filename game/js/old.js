(function (window) {

	function Ball(size) {
		this.Container_constructor();
		this.size = size;
		this.ball = new createjs.Shape();
		this.ripple = new createjs.Shape();
		this.addChild(this.ball, this.ripple);
		this.ballGfx = this.ball.graphics;
		this.rippleGfx = this.ripple.graphics;
		this.ballGfx.clear();
		this.rippleGfx.clear();
		//this.ballGfx.beginRadialGradientFill(["#ffeca8", "rgb(233, 100, 50)"], [0, 1], 16, 16, 0, 16, 16, 8).drawCircle(8, 0, this.size);
		this.ballGfx.beginFill("rgb(255, 0, 0)").drawCircle(this.size / 2, 0, this.size);
		this.currentPlatform = null;
		this.jumping = true;
		this.falling = true;
		this.yMax = 240;
		this.jumpOrigin = 300;
		this.dY = 0;
		this.vY = 1;
		this.fallOff = true;
		this.jumpReleased = true;
		this.timeout = 0;
		this.jumps = 3;
	}
	var p = createjs.extend(Ball, createjs.Container);
	Ball.TERMINAL_VELOCITY = 30;
	p.ball;
	p.ballGfx;
	p.currentPlatform;
	p.jumping;
	p.falling;
	p.yMax;
	p.jumpOrigin;
	p.dY;
	p.vY;
	p.jumpReleased;
	p.jumps;

	p.tick = function (event) {
		this.timeout += 1;
		if (this.jumping) {
			this.dY = this.y - this.jumpOrigin;
			if (this.dY >= this.yMax - 11) {
				this.falling = true;
			}

			this.vY = 30.0 * (1.0 - (this.dY / (this.yMax)));
			if (this.vY > Ball.TERMINAL_VELOCITY) {
				this.vY = Ball.TERMINAL_VELOCITY;
			}

			if (this.falling) {
				this.y -= Math.abs(this.vY);
			} else {
				this.y += Math.abs(this.vY);
			}
		} else if (this.currentPlatform && (this.x > this.currentPlatform.x + this.currentPlatform.sizeX )) {
			this.currentPlatform = null;
			this.falling = true;
			this.jumping = true;
			this.jumpOrigin = this.y - this.yMax + 30;
			this.ballGfx.beginFill("rgb(255, 199, 0)").drawCircle(this.size / 2, 0, this.size);
		};
	}


	p.releaseJump = function () {
		this.jumpReleased = true;
	}

	p.land = function (platform) {
			this.falling = false;
			this.jumps = 3;
		if (this.vY > 0.001) {
			this.bounce();
		} else {
			this.jumping = false;
			this.jumpOrigin = this.y - this.yMax + 32;
			this.currentPlatform = platform;
			this.ballGfx.beginFill("rgb(0, 56, 255)").drawCircle(this.size / 2, 0, this.size);
			this.y = platform.y + platform.sizeY + this.size;
		}
	}

	p.bounce = function () {
		this.jumping = true;
		this.falling = false;
		this.currentPlatform = null;
		this.jumpOrigin = this.jumpOrigin - (Math.abs(this.y - this.jumpOrigin) * 1.1);
		this.ballGfx.beginFill("rgb(0, 224, 255)").drawCircle(this.size / 2, 0, this.size);
	}

	p.hit = function () {
		this.ballGfx.beginFill("rgb(0, 255, 25)").drawCircle(this.size / 2, 0, this.size);
		this.falling = true;
		this.jumping = true;
		this.jumpOrigin = this.jumpOrigin + 20;
	}

	p.jump = function () {
		if ((!this.jumping && !this.falling) || (this.jumps > 0 && this.timeout > 4 && this.jumpReleased)) {
			this.jumps--;
			this.ballGfx.beginFill("rgb(250, 0, 255)").drawCircle(this.size / 2, 0, this.size);
			this.timeout = 0;
			this.jumpOrigin = this.y + this.size;
			this.jumping = true;
			this.falling = false;
			this.currentPlatform = null;
			this.jumpReleased = false;
		}
	}
	window.Ball = createjs.promote(Ball, "Container");

}(window));





var setPlatform = false;
var rowCount;
var rn;
var platformsAdded = 0;

grid = [];

for (var x = 0; x <= COLUMNS; x++) {
		grid[x] = [];
		for (var y = 0; y <= ROWS; y++) {
				if (Math.random() > 0.2) {
						grid[x][y] = true;
				} else {
						grid[x][y] = false;
				}
		}
}
for (var x = 1; x <= COLUMNS; x++) {
		grid[x] = [];
		rn = Math.random() * 100.0;
		if (rn > 75.0) {
				grid[x][0] = true;
		} else {
				grid[x][0] = false;
		}
		if (rn < 25.0) {
				grid[x][ROWS + 1] = true;
		} else {
				grid[x][ROWS + 1] = false;
		}
		for (var y = 1; y <= ROWS; y++) {
				setPlatform = false;
				grid[x][y] = true;
				rn = Math.random() * 200.0;
				if (grid[x][y - 1]) {
						if (grid[x - 1][y - 1] && grid[x - 1][y] && grid[x - 1][y + 1]) {
								if (rn < 100) {
										grid[x][y] = false;
										setPlatform = true;
								}
						} else {
								if (grid[x - 1][y - 1] && grid[x - 1][y]) {
										if (rn < 20) {
												grid[x][y] = false;
												setPlatform = true;
										}
								} else if (grid[x - 1][y] && grid[x - 1][y + 1]) {
										if (rn < 30) {
												grid[x][y] = false;
												setPlatform = true;
										}
								} else if (grid[x - 1][y - 1] && grid[x - 1][y + 1]) {
										if (rn < 40) {
												grid[x][y] = false;
												setPlatform = true;
										}
								} else if (grid[x - 1][y]) {
										if (rn < 10) {
												grid[x][y] = false;
												setPlatform = true;
										}
								}
						}
				}
				if (setPlatform) {
						var p = new Platform(x * COLUMN_WIDTH, y * ROW_HEIGHT, difficulty, 0, Math.random() * COLUMN_WIDTH, PLATFORM_HEIGHT);
						platforms.push(p);
				}
		}
}

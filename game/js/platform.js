(function (window) {
var colors = ["rgba(0, 110, 255, 0.15)", "rgba(255, 46, 0, 0.15)", "rgba(255, 214, 0, 0.15)", "rgba(255, 138, 0, 0.15)", "rgba(0, 33, 255, 0.15)", "rgba(172, 172, 172, 0.15)", "rgba(175, 175, 175, 0.15)"];
	function Platform(startX, startY, vX, vY, sizeX, sizeY, column, row) {
		this.Container_constructor()
		var color = colors[Math.floor(Math.random() * 7)];
		this.platform = new createjs.Shape();
		this.platform2 = new createjs.Shape();
		b = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(.5*sizeX, 2));
		this.platform2.graphics.ss(2).s("rgba(147, 147, 147, 1)").f("rgba(255, 255, 255, 0.02)")
			.lt(0,0)
			.lt(-5, sizeY)
			.lt(sizeX + 5, sizeY)
			.lt(sizeX, 0)
			.lt(0,0)
			.closePath();
		this.platform.graphics.f(color)
			.lt(0, 0)
			.lt(sizeX - 5, 0)
			.lt(.5*sizeX, -b)
			.lt(5, 0)
			.lt(0,0)
			.closePath();
		this.addChild(this.platform, this.platform2);
		this.setChildIndex(this.platform, 2);
		this.setChildIndex(this.platform2, 1);
		this.startX = startX;
		this.startY = startY;
		this.x = this.startX;
		this.y = this.startY;
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		this.column = column;
		this.row = row;
		this.vX = vX;
		this.vY = vY;
	}
	var p = createjs.extend(Platform, createjs.Container);
	p.vX;
	p.vY;
	p.startX;
	p.startY;
	p.sizeX;
	p.sizeY;

	p.tick = function (event) {
		this.x -= this.vX;
		this.y += this.vY;
	}

	p.reposition = function (pos, newVX) {
		this.vX = newVX;
		this.x = pos - this.sizeX;
		this.y = this.startY;
	}

	p.increaseSpeed = function() {
		this.vX+=2;
	}

	window.Platform = createjs.promote(Platform, "Container");

}(window));

(function (window) {
var colors = ["rgba(255, 0, 123, 0.2)", "rgba(0, 87, 255, 0.2)", "rgba(204, 255, 0, 0.2)", "rgba(255, 0, 0, 0.2)", "rgba(197, 0, 255, 0.2)", "rgba(0, 148, 255, 0.2)", "rgba(0, 255, 25, 0.2)", "rgba(196, 196, 196, 0.2)", "rgba(255, 199, 0, 0.2)", "rgba(98, 98, 98, 0.2)", "rgba(181, 178, 180, 0.2)", "rgba(152, 152, 152, 0.2)"];
	function Platform(startX, startY, vX, vY, sizeX, sizeY, column, row) {
		this.Container_constructor()
		var color = colors[Math.floor(Math.random() * 12)];
		this.platform = new createjs.Shape();
		this.platform2 = new createjs.Shape();
		b = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(.5*sizeX, 2));
		this.platform2.graphics.ss(2).s("rgb(0, 0, 0)").f("rgba(0, 0, 0, 0)")
			.rc(0,0,sizeX,sizeY, 0,0,sizeY, sizeY)
			.closePath();
		this.platform.graphics.f(color)
			.lt(0, 0)
			.lt(sizeX, 0)
			.lt(.5*sizeX, -b)
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
		this.vX+=1.5;
	}

	window.Platform = createjs.promote(Platform, "Container");

}(window));

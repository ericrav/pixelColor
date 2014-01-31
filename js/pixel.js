function Pixel(canvas, x, y, width, height, startColor) {
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.x = x;
	this.y = y;
	this.width = width || 50;
	this.height = height || this.width;
	this.color = startColor || "#000000";
}

Pixel.prototype.draw = function() {
	ctx = canvas.getContext("2d");
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
};

Pixel.prototype.animate = function() {
	this.colorTimer = new ColorTimer(this.color);
	var self = this;
	this.timer = setInterval(function() {
		self.setColor(self.colorTimer.getDrawColor());
		self.draw();
	}, 100);
};

Pixel.prototype.stopAnimation = function() {
	clearInterval(this.timer);
	this.colorTimer.pauseColorTimer();
};

Pixel.prototype.setColor = function(color) {
	this.color = color;
};

Pixel.prototype.getColor = function() {
	return this.color;
};

Pixel.prototype.getContext = function() {
	return this.ctx;
};

Pixel.prototype.getX = function() {
	return this.x;
};

Pixel.prototype.getY = function() {
	return this.y;
};
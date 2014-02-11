function Pixel(canvas, x, y, width, height, colorObject) {
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.x = x;
	this.y = y;
	this.width = width || 50;
	this.height = height || this.width;
	this.color = colorObject || new Color("#000000", -1);
}

Pixel.prototype.draw = function() {
	ctx = canvas.getContext("2d");
	ctx.fillStyle = this.color.getColor();
	ctx.fillRect(this.x, this.y, this.width, this.height);
};

Pixel.prototype.setColorObject = function(color) {
	this.color = color;
};

Pixel.prototype.setColor = function(hex) {
	this.color.setHex(hex);
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
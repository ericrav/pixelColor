function PixelSystem(canvas, cols, rows, pixelSize) {
	this.canvas = canvas;
	this.cols = cols;
	this.rows = rows;
	this.pixelSize = pixelSize;
	this.drawActive = true;
	this.canvas.width = cols*pixelSize;
	this.canvas.height = rows*pixelSize;
	this.animateOn = false;

	this.pixels = [];
	for (var i = 0; i < cols; i++) {
		this.pixels[i] = [];
		for (var j = 0; j < rows; j++) {
			this.pixels[i][j] = new Pixel(canvas, i*pixelSize, j*pixelSize, pixelSize);
			this.pixels[i][j].draw();
		}
	}

	this.colorTimer = new ColorTimer();
	var canvas = this.canvas;
	var pixels = this.pixels;
	var self = this;
	this.canvas.addEventListener("mousemove", function(e) {
		var rect = canvas.getBoundingClientRect();
		var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;
		var i = Math.floor(x/pixelSize);
		var j = Math.floor(y/pixelSize);
		if (self.drawActive) {
			var originalColor = pixels[i][j].getColor();
			pixels[i][j].setColor(self.colorTimer.getDrawColor());
			pixels[i][j].draw();
			if (originalColor == "#000000" && self.animateOn) {
				pixels[i][j].animate();
			}
		}
	});
}

PixelSystem.prototype.clear = function() {
	if (this.animateOn) this.toggleAnimate();
	for (var i = 0; i < this.cols; i++) {
		for (var j = 0; j < this.rows; j++) {
			this.pixels[i][j].setColor("#000000");
			this.pixels[i][j].draw();
		}
	}
};

PixelSystem.prototype.toggleAnimate = function() {
	this.toggleColorTimer(); // toggle freeze color because of inverse functionality when animated
	if (this.animateOn) {
		this.animateOn = false;
		for (var i = 0; i < this.cols; i++) {
			for (var j = 0; j < this.rows; j++) {
				if (this.pixels[i][j].getColor() != "#000000") this.pixels[i][j].stopAnimation();
			}
		}
	} else {
		this.animateOn = true;
		for (var i = 0; i < this.cols; i++) {
			for (var j = 0; j < this.rows; j++) {
				if (this.pixels[i][j].getColor() != "#000000") this.pixels[i][j].animate();
			}
		}
	}
};

PixelSystem.prototype.toggleDrawing = function() {
	if (this.drawActive) this.drawActive = false;
	else this.drawActive = true;
};

PixelSystem.prototype.pauseColorTimer = function() {
	this.colorTimer.pauseColorTimer();
};

PixelSystem.prototype.startColorTimer = function() {
	this.colorTimer.startColorTimer();
};

PixelSystem.prototype.toggleColorTimer = function() {
	this.colorTimer.toggleColorTimer();
};
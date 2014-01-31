function PixelSystem(canvas, cols, rows, pixelSize) {
	this.canvas = canvas;
	this.cols = cols;
	this.rows = rows;
	this.pixelSize = pixelSize;

	this.canvas.width = cols*pixelSize;
	this.canvas.height = rows*pixelSize;

	this.pixels = [];
	for (var i = 0; i < cols; i++) {
		this.pixels[i] = [];
		for (var j = 0; j < rows; j++) {
			this.pixels[i][j] = new Pixel(canvas, i*pixelSize, j*pixelSize, pixelSize);
			this.pixels[i][j].draw();
		}
	}

	this.drawColor = "#FF0000";
	this.rgbSlice = "g";
	this.rgbDirection = 1;
	var self = this;
	this.colorTimer = setInterval(function() {
		self.updateDrawColor();
	}, 30);

	var canvas = this.canvas;
	var pixels = this.pixels;
	this.canvas.addEventListener("mousemove", function(e) {
		var rect = canvas.getBoundingClientRect();
		var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;
		var i = Math.floor(x/pixelSize);
		var j = Math.floor(y/pixelSize);
		pixels[i][j].setColor(self.drawColor);
		pixels[i][j].draw();
	});
}

PixelSystem.prototype.updateDrawColor = function() {
	var r = parseInt(this.drawColor.substring(1,3), 16);
	var g = parseInt(this.drawColor.substring(3,5), 16);
	var b = parseInt(this.drawColor.substring(5,7), 16);
	var change = 15 * this.rgbDirection;
	switch (this.rgbSlice) {
		case "r":
		r += change;
		if (r == 255*(1+this.rgbDirection)/2) {
			this.rgbDirection *= -1;
			this.rgbSlice = "b";
		}
		break;
		case "g":
		g += change;
		if (g == 255*(1+this.rgbDirection)/2) {
			this.rgbDirection *= -1;
			this.rgbSlice = "r";
		}
		break;
		case "b":
		b += change;
		if (b == 255*(1+this.rgbDirection)/2) {
			this.rgbDirection *= -1;
			this.rgbSlice = "g";
		}
		break;
	}
	this.drawColor = "#" + ("00" + r.toString(16)).substr(-2) + ("00" + g.toString(16)).substr(-2) + ("00" + b.toString(16)).substr(-2);
};

PixelSystem.prototype.pauseColorTimer = function() {
	clearInterval(this.colorTimer);
};

PixelSystem.prototype.startColorTimer = function() {
	var self = this;
	this.colorTimer = setInterval(function() {
		self.updateDrawColor();
	}, 30);
};

PixelSystem.prototype.toggleColorTimer = function() {
	if (this.colorTimer != null) {
		this.pauseColorTimer();
		this.colorTimer = null;
	} else {
		this.startColorTimer();
	}
};
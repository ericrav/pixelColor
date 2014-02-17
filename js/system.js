function PixelSystem(canvas, cols, rows, pixelSize) {
	this.canvas = canvas;
	this.cols = cols;
	this.rows = rows;
	this.pixelSize = pixelSize;
	this.drawActive = true;
	this.canvas.width = cols*pixelSize;
	this.canvas.height = rows*pixelSize;
	this.animateOn = false;

	this.colorIndex = 0;
	this.palette = new Palette(15);
	this.paletteSize = this.palette.getPaletteSize();

	this.pixels = [];
	this.activePixels = [];

	this.startColorTimer();

	for (var i = 0; i < cols; i++) {
		this.pixels[i] = [];
		for (var j = 0; j < rows; j++) {
			this.pixels[i][j] = new Pixel(canvas, i*pixelSize, j*pixelSize, pixelSize);
			this.pixels[i][j].draw();
		}
	}

	var self = this;

	this.canvas.addEventListener("mousemove", function(e) {
		var rect = self.canvas.getBoundingClientRect();
		var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;
		var i = Math.floor(x/pixelSize);
		var j = Math.floor(y/pixelSize);
		if (self.drawActive) {
			var pixel = self.pixels[i][j];
			pixel.setColorObject(new Color(self.palette.getPaletteColor(self.colorIndex), self.colorIndex));
			pixel.draw();
			if (self.activePixels.indexOf(pixel) == -1) self.activePixels.push(pixel);
		}
	});
}

// FOR TESTING PURPOSES ONLY //
PixelSystem.prototype.testPixels = function() {
	var self = this;
	self.test = [];
	for (var i = 0; i < self.cols; i++) {
		for (var j = ((self.rows-1)+(self.rows-1)*(Math.pow(-1,i+1)))/2; j < self.rows && j >=0; j+=Math.pow(-1,i)) {
			self.test.push(self.pixels[i][j]);	
		}
	}
	drawTimeout(0,self);
};

function drawTimeout(i, self) {
	setTimeout(function(){self.test[i].setColorObject(new Color(self.palette.getPaletteColor(self.colorIndex), self.colorIndex));
		self.test[i].draw();
		if (self.activePixels.indexOf(self.test[i]) == -1) self.activePixels.push(self.test[i]);
		if (i < self.test.length - 1) drawTimeout(i+1,self);
	}, 2);
}
///////////////////////////////


PixelSystem.prototype.startColorTimer = function() {
	var self = this;
	this.colorTimer = setInterval(function() {
		if (self.colorIndex < self.paletteSize) self.colorIndex++;
		else self.colorIndex = 0;
	}, 50);
};

PixelSystem.prototype.clear = function() {
	if (this.animateOn) this.toggleAnimate();
	for (var i = 0; i < this.activePixels.length; i++) {
			var pixel = this.activePixels[i];
			pixel.setColorObject(new Color("#000000", -1));
			pixel.draw();
	}
	this.activePixels = [];
};

PixelSystem.prototype.toggleAnimate = function() {
	if (this.animateOn) {
		this.animateOn = false;
		clearInterval(this.cycleTimer);
	} else {
		console.log(this.activePixels);
		this.animateOn = true;
		var self = this;
		this.cycleTimer = setInterval(function() {
			self.palette.incrementOffset();
			self.recolor();
		}, 50);
	}
};

PixelSystem.prototype.recolor = function() {
	for (var i = 0; i < this.activePixels.length; i++) {
		var pixel = this.activePixels[i];
		pixel.setColor(this.palette.getPaletteColor(pixel.getColor().getPalleteIndex()));
		pixel.draw();
	}
};

PixelSystem.prototype.toggleDrawing = function() {
	if (this.drawActive) this.drawActive = false;
	else this.drawActive = true;
};

PixelSystem.prototype.freezeColor = function() {
	clearInterval(this.colorTimer);
	this.colorTimer = false;
};

PixelSystem.prototype.unfreezeColor = function() {
	this.startColorTimer();
};

PixelSystem.prototype.toggleColorFreeze = function() {
	if (this.colorTimer) this.freezeColor();
	else this.unfreezeColor();
};
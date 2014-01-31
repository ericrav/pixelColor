function ColorTimer(startColor) {
	this.drawColor = startColor || "#FF0000";
	this.rgbSlice = "g";
	this.rgbDirection = 1;
	var self = this;
	this.timer = setInterval(function() {
		self.updateDrawColor();
	}, 30);

}

ColorTimer.prototype.updateDrawColor = function() {
	var r = parseInt(this.drawColor.substring(1,3), 16);
	var g = parseInt(this.drawColor.substring(3,5), 16);
	var b = parseInt(this.drawColor.substring(5,7), 16);
	var change = 15 * this.rgbDirection;
	switch (this.rgbSlice) {
		case "r":
		r += change;
		if (r*this.rgbDirection >= 255*(1+this.rgbDirection)/2) {
			r = 255*(1+this.rgbDirection)/2;
			this.rgbDirection *= -1;
			this.rgbSlice = "b";
		}
		break;
		case "g":
		g += change;
		if (g*this.rgbDirection >= 255*(1+this.rgbDirection)/2) {
			g = 255*(1+this.rgbDirection)/2;
			this.rgbDirection *= -1;
			this.rgbSlice = "r";
		}
		break;
		case "b":
		b += change;
		if (b*this.rgbDirection >= 255*(1+this.rgbDirection)/2) {
			b = 255*(1+this.rgbDirection)/2;
			this.rgbDirection *= -1;
			this.rgbSlice = "g";
		}
		break;
	}
	this.drawColor = "#" + ("00" + r.toString(16)).substr(-2) + ("00" + g.toString(16)).substr(-2) + ("00" + b.toString(16)).substr(-2);
};

ColorTimer.prototype.getDrawColor = function() {
	return this.drawColor;
};

ColorTimer.prototype.pauseColorTimer = function() {
	clearInterval(this.timer);
};

ColorTimer.prototype.startColorTimer = function() {
	var self = this;
	this.timer = setInterval(function() {
		self.updateDrawColor();
	}, 30);
};

ColorTimer.prototype.toggleColorTimer = function() {
	if (this.timer != null) {
		this.pauseColorTimer();
		this.timer = null;
	} else {
		this.startColorTimer();
	}
};
function Color(hex, paletteIndex) {
	this.color = hex;
	this.paletteIndex = paletteIndex;
}

Color.prototype.getColor = function() {
	return this.color;
};

Color.prototype.setHex = function(hex) {
	this.color = hex;
};

Color.prototype.setColor = function(color, paletteIndex) {
	this.color = color;
	this.paletteIndex = paletteIndex;
};

Color.prototype.getPalleteIndex = function() {
	return this.paletteIndex;
};

function Palette(variation) {
	this.variation = variation || 15;
	this.palette = [];
	this.offset = 0;
	var startColor  = "#ff0000";
	var color = startColor;
	this.palette.push(color);
	color = this.incrementColor(color, this.variation);
	while (color.toLowerCase() != startColor.toLowerCase()) {
		this.palette.push(color);
		console.log(color);
		color = this.incrementColor(color, this.variation);
	}

}

Palette.prototype.getPaletteColor = function(index) {
	var i = index+this.offset;
	while (i >= this.palette.length) {
		i -= this.palette.length;
	}
	return this.palette[i];
};

Palette.prototype.getPaletteSize = function() {
	return this.palette.length;
};

Palette.prototype.setOffset = function(offset) {
	this.offset = offset;
};

Palette.prototype.incrementOffset = function(i) {
	var increment = i || 1;
	if (this.offset + increment < this.palette.length) this.offset += increment;
	else this.offset -= this.palette.length + increment;
};

Palette.prototype.incrementColor = function(original, am) {
	var color = original || "#ff0000";
	var amount = am || 15;

	var r = parseInt(color.substring(1,3), 16);
	var g = parseInt(color.substring(3,5), 16);
	var b = parseInt(color.substring(5,7), 16);
	var rgbDirection;
	var rgbSlice;
	if (r != 255 && r != 0) {
		rgbSlice = "r";
		if (g == 255) rgbDirection = -1;
		else rgbDirection = 1;
	} else if (g != 255 && g != 0) {
		rgbSlice = "g";
		if (b == 255) rgbDirection = -1;
		else rgbDirection = 1;
	} else if (b != 255 && b != 0) {
		rgbSlice = "b";
		if (r == 255) rgbDirection = -1;
		else rgbDirection = 1;
	} else {
		if (r == 255) {
			if (g == 255) {
				rgbSlice = "r";
				rgbDirection = -1;
			} else if (b == 255) {
				rgbSlice = "b";
				rgbDirection = -1;
			} else {
				rgbSlice = "g";
				rgbDirection = 1;
			}
		} else {
			if (g == 255 && b == 255) {
				rgbSlice = "g";
				rgbDirection = -1;
			} else if (g == 255) {
				rgbSlice = "b";
				rgbDirection = 1;
			} else {
				rgbSlice = "r";
				rgbDirection = 1;
			}
		}
	}
	var change = amount * rgbDirection;
	switch (rgbSlice) {
		case "r":
		r += change;
		if (r*rgbDirection >= 255*(1+rgbDirection)/2) {
			r = 255*(1+rgbDirection)/2;
			rgbDirection *= -1;
			rgbSlice = "b";
		}
		break;
		case "g":
		g += change;
		if (g*rgbDirection >= 255*(1+rgbDirection)/2) {
			g = 255*(1+rgbDirection)/2;
			rgbDirection *= -1;
			rgbSlice = "r";
		}
		break;
		case "b":
		b += change;
		if (b*rgbDirection >= 255*(1+rgbDirection)/2) {
			b = 255*(1+rgbDirection)/2;
			rgbDirection *= -1;
			rgbSlice = "g";
		}
		break;
	}
	return "#" + ("00" + r.toString(16)).substr(-2) + ("00" + g.toString(16)).substr(-2) + ("00" + b.toString(16)).substr(-2);

}
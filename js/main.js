var sys = new PixelSystem(document.getElementById("canvas"), 85, 70, 10, document.getElementById("spectrum1"), document.getElementById("pointer1"));

// load saved drawing from url if it exists
var dataIndex = location.search.indexOf("?d=");
if (dataIndex > -1) {
	var hash = location.search.substring(dataIndex+3);
	sys.loadDrawing(hash);
}





var downFunction = function(key) {
	if (key == 80) { // p pause drawing
		document.getElementById("P").className = "active";
	} else if (key == 72) { // h toggle help
		document.getElementById("H").className = "active";
	} else if (key == 70) { // f freeze color
		document.getElementById("F").className = "active";
	} else if (key == 69) { // e toggle eraser
		document.getElementById("E").className = "active";
	} else if (key == 67) { // c clear drawing
		document.getElementById("C").className = "active";
	} else if (key == 65) { // a animate colors
		document.getElementById("A").className = "active";
	} else if (key == 68) { // d toggle spectrum
		document.getElementById("D").className = "active";
	} else if (key == 83) { // d toggle spectrum
		document.getElementById("S").className = "active";
	}
};
var upFunction = function(key) {
	if (document.querySelector(".active")) document.querySelector(".active").className = "";
	if (key == 80) { // p pause drawing
		sys.toggleDrawing();
	} else if (key == 84) { // t testing
		sys.testPixels();
	} else if (key == 83) { // s
		console.log(sys.exportDrawing());
	} else if (key == 72) { // h toggle help
		document.getElementById("help").className = "closed";
	} else if (key == 70) { // f freeze color
		sys.toggleColorFreeze();
	} else if (key == 69) { // e toggle eraser
		sys.toggleEraser();
	} else if (key == 67) { // c clear drawing
		sys.clear();
	} else if (key == 65) { // a animate colors
		sys.toggleAnimate();
	} else if (key == 68) { // d toggle spectrum
		sys.toggleSpectrum();
	}
};

window.onkeydown = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;
	downFunction(key);
}
window.onkeyup = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;
	upFunction(key);
}

var keys = document.getElementById("keys").getElementsByTagName("li");
for (var i = 0; i < keys.length; i++) {
	var keyElement = keys[i].getElementsByTagName("span")[0];
	keyElement.onmousedown = function(e) {
		var key = parseInt(e.toElement.dataset.keycode);
		downFunction(key);
	};
	keyElement.onmouseup = function(e) {
		var key = parseInt(e.toElement.dataset.keycode);
		upFunction(key);
	};
}
var sys = new PixelSystem(document.getElementById("canvas"), 85, 70, 10);

window.onkeyup = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;

	if (key == 80) { // p pause drawing
		sys.toggleDrawing();
	} else if (key == 84) { // t testing
		sys.testPixels();
	} else if (key == 72) { // h toggle help
		document.getElementById("help").className = "";
	} else if (key == 70) { // f freeze color
		sys.toggleColorFreeze();
	} else if (key == 69) { // e toggle eraser
		sys.toggleEraser();
	} else if (key == 67) { // c clear drawing
		sys.clear();
	}
	else if (key == 65) { // a animate colors
		sys.toggleAnimate();
	}
}
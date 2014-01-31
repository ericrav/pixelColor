var sys = new PixelSystem(document.getElementById("canvas"), 85, 70, 10);

window.onkeyup = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;

	if (key == 80) { // p pause drawing
		sys.toggleDrawing();
	} else if (key == 70) { // f freeze color
		sys.toggleColorTimer();
	} else if (key == 67) { // c clear drawing
		sys.clear();
	}
	else if (key == 65) { // a animate colors
		sys.toggleAnimate();
	}
}
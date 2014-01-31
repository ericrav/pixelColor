var sys = new PixelSystem(document.getElementById("canvas"), 85, 70, 10);

window.onkeyup = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;

	if (key == 80) {
		sys.toggleDrawing();
	} else if (key == 70) {
		sys.toggleColorTimer();
	}
	else if (key == 65) {
		sys.toggleAnimate();
	}
}
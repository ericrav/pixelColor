<<<<<<< HEAD
 var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-48127888-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

var sys = new PixelSystem(document.getElementById("canvas"), 85, 70, 10);
=======
var sys = new PixelSystem(document.getElementById("canvas"), 85, 70, 10, document.getElementById("spectrum1"), document.getElementById("pointer1"));
>>>>>>> master

window.onkeyup = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;

	if (key == 80) { // p pause drawing
		sys.toggleDrawing();
		_gaq.push(['_trackEvent', 'Control', 'Pause drawing', 'P']);
	} else if (key == 84) { // t testing
		sys.testPixels();
		_gaq.push(['_trackEvent', 'Control', 'Test', 'T']);
	} else if (key == 72) { // h toggle help
		document.getElementById("help").className = "";
		_gaq.push(['_trackEvent', 'Control', 'Hide help', 'H']);
	} else if (key == 70) { // f freeze color
		sys.toggleColorFreeze();
		_gaq.push(['_trackEvent', 'Control', 'Freeze color', 'F']);
	} else if (key == 69) { // e toggle eraser
		sys.toggleEraser();
		_gaq.push(['_trackEvent', 'Control', 'Toggle Eraser', 'E']);
	} else if (key == 67) { // c clear drawing
		sys.clear();
<<<<<<< HEAD
		_gaq.push(['_trackEvent', 'Control', 'Clear', 'C']);
	}
	else if (key == 65) { // a animate colors
		sys.toggleAnimate();
		_gaq.push(['_trackEvent', 'Control', 'Animate', 'A']);
=======
	} else if (key == 65) { // a animate colors
		sys.toggleAnimate();
	} else if (key == 32) { // SPACE toggle spectrum
		sys.toggleSpectrum();
>>>>>>> master
	}
}
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-48127888-1']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

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
		_gaq.push(['_trackEvent', 'Control', 'Pause drawing', 'P']);
	} else if (key == 84) { // t testing
		sys.testPixels();
		_gaq.push(['_trackEvent', 'Control', 'Test', 'T']);
	} else if (key == 83) { // s
		console.log(sys.exportDrawing());
		_gaq.push(['_trackEvent', 'Control', 'Share', 'S']);
	} else if (key == 72) { // h toggle help
		document.getElementById("help").className = "closed";
		_gaq.push(['_trackEvent', 'Control', 'Hide help', 'H']);
	} else if (key == 70) { // f freeze color
		sys.toggleColorFreeze();
		_gaq.push(['_trackEvent', 'Control', 'Freeze color', 'F']);
	} else if (key == 69) { // e toggle eraser
		sys.toggleEraser();
		_gaq.push(['_trackEvent', 'Control', 'Toggle Eraser', 'E']);
	} else if (key == 67) { // c clear drawing
		sys.clear();
		_gaq.push(['_trackEvent', 'Control', 'Clear', 'C']);
	}
	else if (key == 65) { // a animate colors
		sys.toggleAnimate();
		_gaq.push(['_trackEvent', 'Control', 'Animate', 'A']);
	} else if (key == 68) { // d toggle spectrum
		sys.toggleSpectrum();
		_gaq.push(['_trackEvent', 'Control', 'Change spectrum', 'D']);
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
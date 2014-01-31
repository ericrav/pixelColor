// var canvas = document.getElementById("canvas");
// var p1 = new Pixel(canvas,0,0,20);
// var p2 = new Pixel(canvas,100,100,20);

// p1.draw();
// p2.setColor("#FF00FF");
// p2.draw();

var sys = new PixelSystem(document.getElementById("canvas"), 85, 70, 10);

window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   if (key == 80) {
       sys.toggleColorTimer();
   }
}
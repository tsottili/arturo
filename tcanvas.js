console.log("tcanvas.js");

function TCanvas(canvas_id)
{
  this.canvas = document.getElementById(canvas_id);
  this.ctx =

}

function draw()
{
  console.log("drawCanvas()");

  var D = new Deck();
  D.make();
  D.log();

  console.log("done");

//  var canvas = document.getElementById("myCanvas");
//  var ctx = canvas.getContext("2d");




/*    ctx.fillStyle = "#0b6000";
  ctx.fillRect(0,0,canvas.width,canvas.height);


  hexstring = "\u2660 \u2661 \u2662 \u2663 \u2664 \u2665 \u2666 \u2667 \u2668 \u2669";

  ctx.fillStyle = "#000000"
  ctx.fillText(hexstring,10,100);*/

}

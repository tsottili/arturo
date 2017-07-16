console.log("tcanvas.js");

function TCanvas()
{
  this.canvas = 0;
  this.ctx = 0;

  this.bind = function(id)
  {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
  }

}


function draw()
{
  console.log("drawCanvas()");

  var D = new Deck();
  D.make(Card);
  D.shuffle();
  D.log();

  console.log("done");

  var TCV = new TCanvas();
  TCV.bind("myCanvas");

  var rows = D.seedsCount();
  var cols = D.cardsPerSeed();

  TCV.ctx.fillStyle = "#076324";
  TCV.ctx.fillRect(0,0,TCV.canvas.width,TCV.canvas.height);

  D.draw(TCV, 10, 10, rows, cols, 60, 100, 5, 5);

/*
  hexstring = "\u2660 \u2661 \u2662 \u2663 \u2664 \u2665 \u2666 \u2667 \u2668 \u2669";

  ctx.fillStyle = "#000000"
  ctx.fillText(hexstring,10,100);*/

}

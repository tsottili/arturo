function Scene()
{

  this.canvas = 0;
  this.ctx = 0;

  this.bind = function(id)
  {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
  }


}

function TCanvas()
{
  Scene.call(this);

  this.build = function()
  {
    var D = new Deck();
    D.make(Card);
    D.shuffle();
    D.log();

    var rows = D.seedsCount();
    var cols = D.cardsPerSeed();

    this.ctx.fillStyle = "#076324";
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

    D.draw(this, 10, 10, rows, cols, 60, 100, 5, 5);

  }
}

function draw()
{
  var TCV = new TCanvas();
  TCV.bind("myCanvas");
  TCV.build();

}

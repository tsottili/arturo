

function Table()
{
  Scene.call(this);

  this.D = new Deck();

  this.build = function()
  {
    this.D.setPos(10,10);
    this.D.setWidth(this.width-10*2);
    this.D.setHeight(this.height-10*2);
    this.D.make(Card,60,100);
    this.D.shuffle();
    this.D.log();
    this.D.calculateCardsPosition(4,10,5,5);
  }

  this.draw = function()
  {
      // disegna il tavolo
      this.ctx.fillStyle = "#076324";
      this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

      this.D.draw(this.ctx);

  }
}


function myApp()
{
  var TCV = new Table();
  TCV.bind("myCanvas");
  TCV.build();

  TCV.draw();
}

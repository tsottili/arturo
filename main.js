// Represent the gaming table, where cards are played
function Table()
{
  // The Table is a Scene
  TScene.call(this);

  // build current scene
  this.build = function()
  {
    // the deck itself is an item (represent all the cards that are in play)
    // so it has position, width and height (play area)
    var D = new Deck();
    D.setPos(10,10);
    D.setWidth(this.width()-10*2);
    D.setHeight(this.height()-10*2);

    // just a console print of the shuffled deck
    D.log();

    // (temp) calculate card position assuming a rows X columns setup
    // calculate card spots and deck spot
    D.build(8,5,5,5,60,100);

    // add item to the scene
    this.add(D);
  }

  this.cb_scroll = function(ev)
  {
    console.log("Scroll calback (Scene)");
    console.log(ev);
  }

  this.cb_resize = function(ev)
  {
    console.log("Resize calback (Scene)");
    console.log(ev);
  }

}


function myApp()
{
  var TCV = new Table();
  TCV.bind("myCanvas");
  TCV.build();

  TCV.run(100);
}

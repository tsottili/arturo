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

    // construct the cards (values, seeds, width and height)
    D.make(Card,60,100);

    // shuffle the deck
    D.shuffle();

    // just a console print of the shuffled deck
    D.log();

    // calculate card position assuming a rows X columns setup
    D.calculateCardsPosition(10,5,5,5);

    // add item to the scene
    this.add(D);
  }

}


function myApp()
{
  var TCV = new Table();
  TCV.bind("myCanvas");
  TCV.build();

  TCV.run(100);
}

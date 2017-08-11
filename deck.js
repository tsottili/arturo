var card_values = ["A","2","3","4","5","6","7","J","Q","K"];
var card_seeds =  ["\u2660","\u2663","\u2665","\u2666"];
var card_color =  ["#000000","#000000","#ff0000", "#ff0000"];

// v = card value
// s = card seed
// w = width
// h = height
function Card(v,s,w,h) {

  // Each card is an item
  //TItem.call(this);

  // save width and height
  this.w = w;
  this.h = h;

  // save card values
  this.value = card_values[v];
  this.seed = card_seeds[s];
  this.color = card_color[s];

  this.showfront = false;

  // swap current card values with the c parameter card values
  // swap only seed, value and color
  this.swap = function(c)
  {
    var tmp1 = this.value;
    this.value = c.value;
    c.value = tmp1;
    var tmp2 = this.seed;
    this.seed = c.seed;
    c.seed = tmp2;
    var tmp3 = this.color;
    this.color = c.color;
    c.color = tmp3;
  }

  // true if current card has same value of the parameter card
  this.sameValue = function(c)
  {
    return this.value == c.value;
  }

  // true if current card has same seed of the parameter card
  this.sameSeed = function(c)
  {
    return this.seed == c.seed;
  }

  // this card as a string
  this.str = function()
  {
    return "" + this.value + this.seed;
  }

  this.reveal = function()
  {
    this.showfront = true;
  }

  this.hide = function()
  {
    this.showfront = false;
  }

  // draw this card
  this.draw = function(ctx,x,y)
  {
    console.log("Draw "+  this.value + this.seed  +" card, showfront = " + this.showfront);
    console.log("Rect is "+ x + "," + y + "," + this.w + "," + this.h);

    if (this.showfront == true)
    {
      console.log("Draw " + this.value + this.seed  + " front");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x, y, this.w, this.h);

      ctx.fillStyle = this.color;
      ctx.font = "30px Arial";
      ctx.textAlign="center";
      ctx.textBaseline="middle";
      ctx.fillText(""+this.value+this.seed, x+0.5*this.w, y+0.5*this.h);

      ctx.font = "10px Arial";
      ctx.textAlign="center";
      ctx.textBaseline="middle";
      ctx.fillText(""+this.value+this.seed, x+this.w*0.15, y+this.h*0.1);
      ctx.fillText(""+this.value+this.seed, x+this.w*0.15, y+this.h*0.9);
      ctx.fillText(""+this.value+this.seed, x+this.w*0.85, y+this.h*0.1);
      ctx.fillText(""+this.value+this.seed, x+this.w*0.85, y+this.h*0.9);
    }
    else
    {
      console.log("Draw " + this.value + this.seed  + " back");
      var img=document.getElementById("back");
      var pat=ctx.createPattern(img,"repeat");
      ctx.fillStyle=pat;
      ctx.fillRect(x, y, this.w, this.h);
    }

    return true;
  }
}

function Spot()
{
  TItem.call(this);

  this.cards = [];

  // max number of cards this spot can held
  this.capacity = 0;

  // selected flag (last clicked on)
  this.selected = false;

  this.setCapacity = function(i)
  {
    this.capacity = i;
  }

  this.add = function(c)
  {
    if (this.cards.length < this.capacity)
    {
      this.cards.push(c);
    }
  }

  this.extract = function(c)
  {
    return this.cards.pop();
  }

  this.reveal = function()
  {
    if (this.cards.length > 0)
    {
      this.cards[this.cards.length-1].reveal();
    }
  }

  this.hide = function()
  {
    if (this.cards.length > 0)
    {
      this.cards[this.cards.length-1].hide();
    }
  }

  // draw this spot and its cards
  this.cb_draw = function(ctx)
  {
    if (this.selected)
    {
      ctx.strokeStyle = "yellow";
    }
    else {
      // draw the spot
      ctx.strokeStyle = '#777777';
    }
    ctx.lineWidth=1;
    ctx.strokeRect(this.x, this.y, this.w, this.h);

    // only last card of the array (the z-order top)
    // is drawn
    if (this.cards.length > 0)
      this.cards[this.cards.length-1].draw(ctx, this.x+1, this.y+1);
  }

  // shuffle the cards in this sport
  this.shuffle = function()
  {
    for (var i=this.cards.length-1; i > 1; i--)
    {
      var picked = Math.round(Math.random() * i);
      this.cards[i].swap(this.cards[picked]);
    }
  }
}

// Represent a deck of cards (as a collection of items)
function Deck() {

  // Deck is an Item
  TItem.call(this);

  // the current selected card
  this.selected = null;

  // current card size
  this.card_width = 0;
  this.card_height = 0;
  this.card_dx = 0;
  this.card_dy = 0;
  this.card_per_rows = 0;
  this.card_per_cols = 0;

  // spots card positions
  // tableau spots where cards are played
  this.card_spots = [];
  // pile from where the card are taken
  this.pile = 0;
  // pit where the card are discarded
  this.pit = 0;

  // c = card class
  // w = card width (px)
  // h = card height (px)
  this.make = function(c, w, h, spot)
  {
    for (var i = 0; i < card_values.length; i++)
    {
      for (var j = 0; j < card_seeds.length; j++)
      {
        var card = new c(i,j,w,h);
        console.log(card.str());
        spot.add(card);
      }
    }
  }

  // access to i-th card
  this.card = function(i)
  {
    if (i < card_values.length * card_seeds.length) {
      return this.items[i];
    }
    else {
      console.log("Search for "+i+"th card.");
      return null;
    }
  }

  // just a console print
  this.log = function()
  {
    console.log("Current deck: " + this.str());
  }



  // get the whole deck a string
  this.str = function()
  {
    var deck_string = "";
    for (var i = 0; i < this.items.length; i++)
    {
      deck_string = deck_string + this.items[i].str() +" ";
    }
    return deck_string;
  }

  // how many cards per seed
  this.cardsPerSeed = function()
  {
    return card_values.length;
  }

  // how many seeds
  this.seedsCount = function()
  {
    return card_seeds.length;
  }

  // deploy cards for starting set up
  this.build = function(rows, cols, dx, dy, card_width, card_height)
  {
    this.card_dx=dx;
    this.card_dy=dy;
    this.card_per_rows = rows;
    this.card_per_cols = cols;
    this.card_width = card_width;
    this.card_height = card_height;

    for (var j = 0; j < rows; j++)
    {
      for (var i = 0; i < cols; i++)
      {
        this.card_spots.push(this.calc_spot(i,j));
      }
    }

    // special spot for cards to be played
    this.pile = new Spot();
    this.pile.setWidth(this.card_width+1);
    this.pile.setHeight(this.card_height+1);
    this.pile.setPos(this.x+this.width()-this.card_width-1-this.card_dx, this.y+this.card_dy);
    this.pile.setCapacity(40);
    this.make(Card,card_width,card_height,this.pile);
    this.pile.shuffle();
    this.pile.setMouseDownListener(function(x,y) {
        console.log("PILE: mouse down listener");
        var c = this.pile.extract();
        c.reveal();
        this.pit.add(c);
        this.pit.setDirty();
        this.pile.setDirty();
    }.bind(this));

    // special sport for discarded cards
    this.pit = new Spot();
    this.pit.setWidth(this.card_width+1);
    this.pit.setHeight(this.card_height+1);
    this.pit.setPos(this.x+this.width()-this.card_width-1-this.card_dx, this.y+2*this.card_dy+this.card_height);
    this.pit.setCapacity(40);
    this.pit.setMouseDownListener(function(x,y) {
        console.log("PIT: mouse down listener");
    })

    for (var i = 0; i < this.card_spots.length; i++)
    {
      this.add(this.card_spots[i]);
    }
    this.add(this.pile);
    this.add(this.pit);
  }

  // calculate card spot (i = rows, j=cols)
  this.calc_spot = function(i,j)
  {
    var xpos = this.x +this.card_dx + (this.card_width + this.card_dx)*i;
    var ypos = this.y +this.card_dy + (this.card_height + this.card_dy)*j;

    var r = new Spot();
    r.setPos(xpos,ypos);
    r.setWidth(this.card_width+1);
    r.setHeight(this.card_height+1);
    r.setCapacity(1);
    return r;
  }

  // draw the deck (call draw on each card)
  this.cb_draw = function(ctx)
  {
    console.log("deck::draw");
    // draw table background (green)
    ctx.fillStyle = "#076324";
    ctx.fillRect(this.x, this.y, this.width(),this.height());

    return true;
  }

  // just a sample
  this.cb_mousedown = function(x,y)
  {
    console.log("Deck mousedown: " + x + "," + y);
  }

  // just a sample
  this.cb_mouseup = function(x,y)
  {
    console.log("Deck mouseup: " + x + "," + y);
  }
}

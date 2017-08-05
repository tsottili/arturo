var card_values = ["A","2","3","4","5","6","7","J","Q","K"];
var card_seeds =  ["\u2660","\u2663","\u2665","\u2666"];
var card_color =  ["#000000","#000000","#ff0000", "#ff0000"];

// v = card value
// s = card seed
// w = width
// h = height
function Card(v,s,w,h) {

  // Each card is an item
  Item.call(this);

  // save width and height
  this.w = w;
  this.h = h;

  // save card values
  this.value = card_values[v];
  this.seed = card_seeds[s];
  this.color = card_color[s];

  this.selected = false;

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

  // draw this card
  this.cb_draw = function(ctx)
  {
    console.log("Draw "+  this.value + this.seed  +" card.");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(this.x, this.y, this.w, this.h);

    ctx.fillStyle = this.color;
    ctx.font = "30px Arial";
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    ctx.fillText(""+this.value+this.seed, this.x+0.5*this.w, this.y+0.5*this.h);

    ctx.font = "10px Arial";
    ctx.textAlign="center";
    ctx.textBaseline="middle";
    ctx.fillText(""+this.value+this.seed, this.x+this.w*0.15, this.y+this.h*0.1);
    ctx.fillText(""+this.value+this.seed, this.x+this.w*0.15, this.y+this.h*0.9);
    ctx.fillText(""+this.value+this.seed, this.x+this.w*0.85, this.y+this.h*0.1);
    ctx.fillText(""+this.value+this.seed, this.x+this.w*0.85, this.y+this.h*0.9);

    return true;
  }

  this.cb_mousedown = function(x,y)
  {
    this.selected = true;
    console.log("Card "+ this.value + this.seed +" mousedown: " + x + "," + y);

    return true;
  }

  this.cb_mouseup = function(x,y)
  {
    this.selected = false;
    console.log("Card "+ this.value + this.seed +" mouseup: " + x + "," + y);
    this.setDirty();
    return true;
  }
}

// Represent a deck of cards (as a collection of items)
function Deck() {

  // Deck is an Item
  Item.call(this);

  // c = card class
  // w = card width (px)
  // h = card height (px)
  this.make = function(c, w, h)
  {
    for (var i = 0; i < card_values.length; i++)
    {
      for (var j = 0; j < card_seeds.length; j++)
      {
        var card = new c(i,j,w,h);
        console.log(card.str());
        this.add(card);
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

  // shuffle current deck
  this.shuffle = function()
  {
    for (var i=card_values.length*card_seeds.length-1; i > 1; i--)
    {
      var picked = Math.round(Math.random() * i);
      this.items[i].swap(this.items[picked]);
    }
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

  // calculate cards position assuming a rowsXcols setup, leaving dx and dy space between cards
  this.calculateCardsPosition = function(rows, cols, dx, dy)
  {
    for (var i = 0; i < cols; i++)
    {
      for (var j = 0; j < rows; j++)
      {
        var index = i*rows+j;
        var xpos = this.x + (this.items[index].width() + dx)*i;
        var ypos = this.y + (this.items[index].height() + dy)*j;
        this.items[index].setPos(xpos, ypos);
      }
    }
  }

  // draw the deck (call draw on each card)
  this.cb_draw = function(ctx)
  {
    console.log("deck::draw");
    // draw table background (green)
    ctx.fillStyle = "#076324";
    ctx.fillRect(0,0,this.width(),this.height());

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

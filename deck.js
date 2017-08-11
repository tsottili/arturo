var card_values = ["A","2","3","4","5","6","7","J","Q","K"];
var card_seeds =  ["\u2660","\u2663","\u2665","\u2666"];
var card_color =  ["#000000","#000000","#ff0000", "#ff0000"];

// v = card value
// s = card seed
// w = width
// h = height
function Card(v,s,w,h) {

  // Each card is an item
  TItem.call(this);

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
    console.log("Draw "+  this.value + this.seed  +" card, selected = " + this.selected);
    console.log("Rect is "+ this.x + "," + this.y + "," + this.w + "," + this.h);

    if (this.selected == true)
    {
      console.log("Draw " + this.value + this.seed  + " front");
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
    }
    else
    {
      console.log("Draw " + this.value + this.seed  + " back");
      var img=document.getElementById("back");
      var pat=ctx.createPattern(img,"repeat");
      ctx.fillStyle=pat;
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    if (this.selected)
    {
      console.log("Draw yellow"+ this.x + "," + this.y + "," + this.w + "," + this.h);
      ctx.strokeStyle = 'yellow';
      ctx.lineWidth=2;
      ctx.strokeRect(this.x+1, this.y+1, this.w-2, this.h-2);
    }

    return true;
  }

  this.cb_mousedown = function(x,y)
  {
    return true;
  }

  this.cb_mouseup = function(x,y)
  {
    // deselect previous card
    if (this.parent.selected_card)
    {
      this.parent.selected_card.selected = false;
      this.parent.selected_card.setDirty();
      console.log("Deselect "+this.parent.selected_card.str());
    }

    // select this one
    this.selected = true;
    console.log("Selected "+this.str());
    this.parent.selected_card = this;
    this.setDirty();

    this.setPos(this.parent.pit.x,this.parent.pit.y);

    console.log("Card "+ this.value + this.seed +" mouseup: " + x + "," + y);
    return true;
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
  this.make = function(c, w, h)
  {
    this.card_width = w;
    this.card_height = h;
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

  // deploy cards for starting set up
  this.build = function(rows, cols, dx, dy)
  {
    this.card_dx=dx;
    this.card_dy=dy;
    this.card_per_rows = rows;
    this.card_per_cols = cols;

    for (var j = 0; j < rows; j++)
    {
      for (var i = 0; i < cols; i++)
      {
        this.card_spots.push(this.calc_spot(i,j));
      }
    }

    // special spot for cards to be played
    this.pile = new TRect();
    this.pile.setWidth(this.card_width+1);
    this.pile.setHeight(this.card_height+1);
    this.pile.setPos(this.x+this.width()-this.card_width-1-this.card_dx, this.y+this.card_dy);

    // special sport for discarded cards
    this.pit = new TRect();
    this.pit.setWidth(this.card_width+1);
    this.pit.setHeight(this.card_height+1);
    this.pit.setPos(this.x+this.width()-this.card_width-1-this.card_dx, this.y+2*this.card_dy+this.card_height);

    for (var j = 0; j < rows; j++)
    {
      for (var i = 0; i < cols; i++)
      {
        var index = j*cols+i;

        //if we reached the total number of cards, we can exit.
        if (index < this.items.length)
          this.items[index].setPos(this.pile.x+1, this.pile.y+1);
      }
    }
  }

  // calculate card spot (i = rows, j=cols)
  this.calc_spot = function(i,j)
  {
    var xpos = this.x +this.card_dx + (this.card_width + this.card_dx)*i;
    var ypos = this.y +this.card_dy + (this.card_height + this.card_dy)*j;

    var r = new TRect();
    r.setPos(xpos,ypos);
    r.setWidth(this.card_width+1);
    r.setHeight(this.card_height+1);
    return r;
  }

  // draw a card spot
  this.draw_spot = function(ctx,r)
  {
    ctx.strokeStyle = '#777777';
    ctx.lineWidth=1;
    ctx.strokeRect(r.x, r.y, r.w, r.h);
  }

  // draw the deck (call draw on each card)
  this.cb_draw = function(ctx)
  {


    console.log("deck::draw");
    // draw table background (green)
    ctx.fillStyle = "#076324";
    ctx.fillRect(this.x, this.y, this.width(),this.height());

    // draw played cards spots
    for (var k = 0; k < this.card_spots.length; k++)
    {
      this.draw_spot(ctx,this.card_spots[k]);
    }

    this.draw_spot(ctx, this.pile);
    this.draw_spot(ctx, this.pit);

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

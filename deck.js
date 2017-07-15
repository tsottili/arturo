var card_values = ["A","2","3","4","5","6","7","J","Q","K"];
var card_seeds =  ["\u2660","\u2663","\u2665","\u2666"];
var card_color =  ["#000000","#000000","#ff0000", "#ff0000"];


function Card(v,s) {
  this.value = card_values[v];
  this.seed = card_seeds[s];
  this.color = card_color[s];

  this.sameValue = function(c)
  {
    return this.value == c.value;
  }

  this.sameSeed = function(c)
  {
    return this.seed == c.seed;
  }
}


function Deck() {

  this.cards = [];

  this.make = function(c)
  {
    for (i = 0; i < card_values.length; i++)
    {
      for (j = 0; j < card_seeds.length; j++)
      {
        var card = new c(i,j);
        this.cards.push(card);
      }
    }
  }

  this.log = function()
  {
    console.log("Current deck: " + this.str());
  }

  this.str = function()
  {
    var deck_string = "";
    for (i = 0; i < this.cards.length; i++)
    {
      deck_string = deck_string + this.cards[i].value + this.cards[i].seed +" ";
    }
    return deck_string;
  }

  this.cardsPerSeed = function()
  {
    return card_values.length;
  }

  this.seedsCount = function()
  {
    return card_seeds.length;
  }

  this.draw = function(TCV, x0, y0, rows, cols, w, h, dx, dy)
  {
    for (i = 0; i < cols; i++)
    {
      for (j = 0; j < rows; j++)
      {
          TCV.ctx.fillStyle = "#FFFFFF";
          TCV.ctx.fillRect(x0 + (w+dx)*i,y0+(h+dy)*j,w,h);
      }
    }
  }

}

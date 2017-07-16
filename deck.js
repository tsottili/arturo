var card_values = ["A","2","3","4","5","6","7","J","Q","K"];
var card_seeds =  ["\u2660","\u2663","\u2665","\u2666"];
var card_color =  ["#000000","#000000","#ff0000", "#ff0000"];

var card_spots = [ [0.5, 0.5], // central spot
                   [0.1, 0.1], // top left
                   [0.9, 0.1], // top right
                   [0.1, 0.9], // bottom left
                   [0.9, 0.9], // bottom right
                   [0.1, 0,5], // middle left
                   [0.9, 0.5], // middle right
                   [0.1, 0.3], // middle-top left
                   [0.9, 0.3], // middle-top right
                   [0.1, 0.5], // middle-bottom left
                   [0.9, 0.5], // middle-bottom right
                 ];

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

  this.draw = function(TCV, x, y, w, h)
  {
    console.log("Draw "+  this.value + this.seed  +" card.");
    TCV.ctx.fillStyle = this.color;
    TCV.ctx.font = "30px Arial";
    TCV.ctx.textAlign="center";
    TCV.ctx.textBaseline="middle";
    TCV.ctx.fillText(""+this.value+this.seed, x+0.5*w, y+0.5*h);

    TCV.ctx.font = "10px Arial";
    TCV.ctx.textAlign="center";
    TCV.ctx.textBaseline="middle";
    TCV.ctx.fillText(""+this.value+this.seed, x+w*0.15, y+h*0.1);
    TCV.ctx.fillText(""+this.value+this.seed, x+w*0.15, y+h*0.9);
    TCV.ctx.fillText(""+this.value+this.seed, x+w*0.85, y+h*0.1);
    TCV.ctx.fillText(""+this.value+this.seed, x+w*0.85, y+h*0.9);
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

  this.card = function(i)
  {
    if (i < card_values.length * card_seeds.length) {
      return this.cards[i];
    }
    else {
      console.log("Search for "+i+"th card.");
      return null;
    }
  }

  this.log = function()
  {
    console.log("Current deck: " + this.str());
  }

  this.shuffle = function()
  {
    for (i=card_values.length*card_seeds.length-1; i > 1; i--)
    {
      var picked = Math.round(Math.random() * i);
      var tmp = this.cards[i];
      this.cards[i] = this.cards[picked];
      this.cards[picked] = tmp;
    }
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
          var xpos = x0 + (w+dx)*i;
          var ypos = y0+(h+dy)*j;
          TCV.ctx.fillRect(xpos,ypos,w,h);
          console.log("select card ", i*rows + j)
          this.card(i*rows+j).draw(TCV, xpos, ypos, w, h);
      }
    }
  }

}

var card_values = ["A","2","3","4","5","6","7","J","Q","K"];
var card_seeds =  ["\u2660","\u2663","\u2665","\u2666"];
var card_color =  ["#000000","#000000","#ff0000", "#ff0000"];


function Card(v,s) {
  this.value = card_values[v];
  this.seed = card_seeds[s];
  this.color = card_color[s];
}


function Deck() {

  this.cards = [];

  this.make = function()
  {
    for (i = 0; i < card_values.length; i++)
    {
      for (j = 0; j < card_seeds.length; j++)
      {
        var card = new Card(i,j);
        this.cards.push(card);
      }
    }

  },

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

}

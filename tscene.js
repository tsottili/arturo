function Item()
{
  // An Item has position (x,y) and dimensions (w, h)
  this.x = 0;
  this.y = 0;
  this.w = 0;
  this.h = 0;

  // set item position
  this.setPos = function(x,y)
  {
    this.x = x;
    this.y = y;
  }

  // set item width
  this.setWidth = function(w)
  {
    this.w = w;
  }

  // set item height
  this.setHeight = function(h)
  {
    this.h = h;
  }

  // get item width
  this.width = function()
  {
    return this.w;
  }

  // get item height
  this.height = function()
  {
    return this.h;
  }
}



function Scene()
{
  //
  this.canvas = 0;
  this.ctx = 0;

  this.items = [];


  this.bind = function(id)
  {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
  //  this.width = this.canvas.width;
  }

  this.width = function()
  {
    return this.canvas.width;
  }

  this.height = function()
  {
    return this.canvas.height;
  }

  this.add = function(item)
  {
    this.items.push(item);
  }

  this.draw = function()
  {
    for (i=0; i < this.items.length; i++)
    {
      this.items[i].draw(this.ctx);
    }
  }

/*  this.addEventListener("onmousedown", function() {});
  this.addEventListener("onmouseup", function() {});
  this.addEventListener("onmouseenter", function() {});
  this.addEventListener("onmouseleave", function() {});
  this.addEventListener("onmousemove", function() {});*/

}

function Item()
{
  this.x = 0;
  this.y = 0;
  this.w = 0;
  this.h = 0;

  this.setPos = function(x,y)
  {
    this.x = x;
    this.y = y;
  }

  this.setWidth = function(w)
  {
    this.w = w;
  }

  this.setHeight = function(h)
  {
    this.h = h;
  }

  this.width = function()
  {
    return this.w;
  }

  this.height = function()
  {
    return this.h;
  }


}

function Scene()
{
  this.canvas = 0;
  this.ctx = 0;

  this.bind = function(id)
  {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
  }

  this.width = function()
  {
    return this.canvas.width;
  }

  this.height = function()
  {
    return this.canvas.height;
  }

/*  this.addEventListener("onmousedown", function() {});
  this.addEventListener("onmouseup", function() {});
  this.addEventListener("onmouseenter", function() {});
  this.addEventListener("onmouseleave", function() {});
  this.addEventListener("onmousemove", function() {});*/

}

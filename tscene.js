function Item()
{
  // An Item has position (x,y) and dimensions (w, h)
  this.x = 0;
  this.y = 0;
  this.w = 0;
  this.h = 0;

  // each item can have sub-items
  this.items = [];

  this.cb_mousedown = null;
  this.cb_mouseup = null;

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

  this.inside = function(x,y)
  {
    return (x >= this.x ) && (x < this.x+this.w) &&
           (y >= this.y ) && (y < this.y+this.h);
  }

  this.add = function(item)
  {
    this.items.push(item);
  }

  this.mousedown = function(x,y)
  {
    var run = true;
    for (var i = 0; i < this.items.length; i++)
    {
      run = this.items[i].mousedown(x,y);
      if (!run)
      {
        break;
      }
    }

    if ( (run) &&
         (this.cb_mousedown != null) &&
         (this.inside(x,y) ) )
      return this.cb_mousedown(x,y);

    // don't stop event propagation
    return true;
  }

  this.mouseup = function(x,y)
  {
    var run = true;
    for (var i = 0; i < this.items.length; i++)
    {
      run = this.items[i].mouseup(x,y);
      if (!run)
      {
        break;
      }
    }

    if ( (run) &&
         (this.cb_mousedown != null) &&
         (this.inside(x,y) ) )
      return this.cb_mouseup(x,y);

    // don't stop event propagation
    return true;
  }

}



function Scene()
{
  //
  this.canvas = 0;
  this.ctx = 0;

  this.items = [];
  this.rect = 0;

  this.bind = function(id)
  {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");

    // default events listeners
    document.addEventListener("mousedown", this.mousedown);
    document.addEventListener("mouseup", this.mouseup);

    // get canvas rect (in client units)
    this.rect = this.canvas.getBoundingClientRect();
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

  // translate coordinate in canvas units.
  // call te callback on first-level item
  this.mousedown = function(event)
  {
    console.log("mousedown:"+event.clientX+","+event.clientY);
    var run = true;
    var x = event.clientX - this.rect.left
    var y = event.clientY - this.rect.top;

    for (var i = 0; i < this.items.length; i++)
    {
      run = this.items[i].mousedown(x,y);
      if (!run)
      {
        break;
      }
    }
  // I want to preserve this!
  }.bind(this);

  // translate coordinate in canvas units.
  // call te callback on first-level item
  this.mouseup = function(event)
  {
    console.log("mouseup:"+event.clientX+","+event.clientY);
    var run = true;
    var x = event.clientX - this.rect.left
    var y = event.clientY - this.rect.top;

    for (var i = 0; i < this.items.length; i++)
    {
      run = this.items[i].mouseup(x,y);
      if (!run)
      {
        break;
      }
    }
  // and this...
  }.bind(this)

}

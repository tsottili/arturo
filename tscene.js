function Item()
{
  // An Item has position (x,y) and dimensions (w, h)
  this.x = 0;
  this.y = 0;
  this.w = 0;
  this.h = 0;

  // flag need redraw: first time always need redraw
  this.dirty = true;
  // at least one sub-item is dirty
  this.dirtyChild = false;

  // each item can have sub-items
  this.items = [];

  // parent item
  this.parent = null;

  this.cb_draw = null;
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

  // add a sub-item to this item
  this.add = function(item)
  {
    this.items.push(item);

    // I am your father.
    item.parent = this;

    // after add operation a redraw is nice
    item.setDirty();
  }

  // ser dirty flag on item and on ancestor
  this.setDirty = function()
  {
    this.dirty = true;
    if (this.parent != null)
    {
      this.parent.notifyDirtyChild();
    }
  }

  this.notifyDirtyChild = function()
  {
    this.dirtyChild = true;
    if (this.parent != null)
    {
      this.parent.notifyDirtyChild();
    }
  }

  this.needRedraw = function()
  {
    return this.dirty || this.dirtyChild;
  }

  // generic item draw function
  this.draw = function(ctx)
  {
    if ( (this.cb_draw != null) && (this.dirty) )
    {
      if (this.cb_draw(ctx))
      {
          this.dirty = false;
      }
    }

    // call this function on sub items
    if (this.dirtyChild)
    {
      for (var i = 0; i < this.items.length; i++)
          this.items[i].draw(ctx);
    }

    this.dirtyChild = false;
    this.dirty = false;
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
  this.Xratio= 0;
  this.Yratio= 0;
  this.interval = 0;

  this.bind = function(id)
  {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");

    // default events listeners
    document.addEventListener("mousedown", this.mousedown);
    document.addEventListener("mouseup", this.mouseup);
    window.addEventListener("resize", this.resize); // temp!
    window.addEventListener("scroll", this.resize); // temp!

    // get canvas rect (in client units)
    this.rect = this.canvas.getBoundingClientRect();
    // calculate ratio for scaling unit in canvas system
    this.Xratio = this.canvas.width / this.rect.width;
    this.Yratio = this.canvas.height / this.rect.height;
  }

  this.resize = function()
  {
    console.log("Resize");

    // get canvas rect (in client units)
    this.rect = this.canvas.getBoundingClientRect();
    // calculate ratio for scaling unit in canvas system
    this.Xratio = this.canvas.width / this.rect.width;
    this.Yratio = this.canvas.height / this.rect.height;
  }.bind(this);

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
    var t0 = performance.now();
    for (var i=0; i < this.items.length; i++)
    {
      if (this.items[i].needRedraw())
      {
        this.items[i].draw(this.ctx);
      }
    }
    var t1 = performance.now() - t0;
    if (t1/this.interval >= 0.25)
    {
      console.log("Drawing time = " + t1 +" millisecs [interval = "+this.interval+"]");
    }

  }.bind(this);

  this.run = function(millisecs)
  {
    this.interval = millisecs;
    setInterval(this.draw,millisecs);
  }

  // translate coordinate in canvas units.
  // call te callback on first-level item
  this.mousedown = function(event)
  {
    console.log("mousedown:"+event.clientX+","+event.clientY);
    var run = true;
    var x = (event.clientX - this.rect.left)*this.Xratio;
    var y = (event.clientY - this.rect.top)*this.Yratio;
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
    var x = (event.clientX - this.rect.left)*this.Xratio;
    var y = (event.clientY - this.rect.top)*this.Yratio;

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

function TRect()
{
  // A Rect has position (x,y) and dimensions (w, h)
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

  this.inside = function(x,y)
  {
    return (x >= this.x ) && (x < this.x+this.w) &&
           (y >= this.y ) && (y < this.y+this.h);
  }

}

function TItem()
{
  TRect.call(this);

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
         (this.cb_mouseup != null) &&
         (this.inside(x,y) ) )
      return this.cb_mouseup(x,y);

    // don't stop event propagation
    return true;
  }

  this.setMouseDownListener = function(f)
  {
    this.cb_mousedown = f;
  }

  this.setMouseUpListener = function(f)
  {
    this.cb_mouseup = f;
  }

  this.setDrawListener = function(f)
  {
    this.cb_draw = f;
  }

}

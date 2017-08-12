function TScene()
{
  //
  this.canvas = 0;
  this.ctx = 0;

  this.items = [];
  this.rect = 0;
  this.Xratio= 0;
  this.Yratio= 0;
  this.interval = 0;

  this.cb_resize = null;
  this.cb_scroll = null;


  this.clientToCanvas = function()
  {
    // get canvas rect (in client units)
    this.rect = this.canvas.getBoundingClientRect();
    // calculate ratio for scaling unit in canvas system
    this.Xratio = this.canvas.width / this.rect.width;
    this.Yratio = this.canvas.height / this.rect.height;
  }

  this.bind = function(id)
  {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");

    // default events listeners
    document.addEventListener("mousedown", this.mousedown);
    document.addEventListener("mouseup", this.mouseup);
    window.addEventListener("resize", this.resize); // temp!
    window.addEventListener("scroll", this.scroll); // temp!

    this.clientToCanvas();
  }

  this.resize = function(ev)
  {
    console.log("Resize");
    this.clientToCanvas();

    if (this.cb_resize != null)
    {
      this.cb_resize(ev);
    }

  }.bind(this);

  this.scroll = function(ev)
  {
    console.log("Scroll");
    this.clientToCanvas();

    if (this.cb_scroll != null)
    {
      this.cb_scroll(ev);
    }
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

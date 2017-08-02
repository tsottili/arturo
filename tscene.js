function Item()
{

  
}


function Scene()
{
  this.canvas = 0;
  this.ctx = 0;

  this.bind = function(id)
  {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
  }

/*  this.addEventListener("onmousedown", function() {});
  this.addEventListener("onmouseup", function() {});
  this.addEventListener("onmouseenter", function() {});
  this.addEventListener("onmouseleave", function() {});
  this.addEventListener("onmousemove", function() {});*/

}

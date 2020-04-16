
class Cell {
    constructor(cellStatus) {
      this.status = cellStatus;
    }
    get cellStatus() {
      return this.status;
    }
    set cellStatus(newStatus) {
      this.status = newStatus;
    }
  }
  
// the render logic should be focusing on the rendering 
var drawGrid = function(ctx, w, h, step) {
  ctx.beginPath(); 
  for (var x=0;x<=w;x+=step) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
  }
  // set the color of the line
  ctx.strokeStyle = 'rgb(20,20,20)';
  ctx.lineWidth = 1;
  // the stroke will actually paint the current path 
  ctx.stroke(); 
  // for the sake of the example 2nd path
  ctx.beginPath(); 
  for (var y=0;y<=h;y+=step) {
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
  }
  // set the color of the line
  ctx.strokeStyle = 'rgb(20,20,20)';
  // just for fun
  ctx.lineWidth = 1;
  // for your original question - you need to stroke only once
  ctx.stroke(); 
};


cell = new Cell("ALIVE");
cell.cellStatus = "DEAD"
document.getElementById("demo").innerHTML = cell.cellStatus;


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

if(cell.cellStatus == "ALIVE") {
  ctx.fillRect(0,0,10,10);
  ctx.fillStyle = "#FF0000";
}


drawGrid(ctx, 800, 450, 10);






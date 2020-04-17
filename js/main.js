
class Cell {
    constructor(cellStatus, x, y) {
      this.status = cellStatus;
      this.x = x;
      this.y = y;
    }
    get cellStatus() {
      return this.status;
    }
    set cellStatus(newStatus) {
      this.status = newStatus;
    }
    get getX(){
      return this.x;
    }
    get getY(){
      return this.y;
    }
  }
 
// The Grid
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

/**
 * Check neighboring cells
 * Are the grids surrounding this cell alive?
 */
var checkNeighbors = function(cell) {

}


/**
 * Main starts here
 */

// canvas and grid
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
drawGrid(ctx, 800, 450, 10);

// create new cell and display
cell = new Cell("ALIVE",0,0);
// cell.cellStatus = "DEAD"
// document.getElementById("demo").innerHTML = cell.cellStatus;

// cell conditional
if(cell.cellStatus == "ALIVE") {
  ctx.fillRect(cell.getX,cell.getY,10,10);
  ctx.fillStyle = "#FF0000";
}

// ctx.fillRect(400,220,10,10)
// ctx.fillStyle = "#FF0000";




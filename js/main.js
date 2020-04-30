
  // canvas and grid
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// draw grid
function drawGrid(ctx, width, height, step) {
  // y axis
  ctx.beginPath(); 
  for (var x = 0; x <= width; x += step) {
  ctx.moveTo(x, 0);
  ctx.lineTo(x, height);
  };
  // set the color of the line
  ctx.strokeStyle = 'rgb(20,20,20)';
  ctx.lineWidth = 1;
  ctx.stroke(); 

  // x axis
  ctx.beginPath(); 
  for (var y = 0; y <= height; y += step) {
  ctx.moveTo(0, y);
  ctx.lineTo(width, y);
  };
  // set the color of the line
  ctx.strokeStyle = 'rgb(20,20,20)';
  ctx.lineWidth = 1;
  ctx.stroke(); 
};

function initialCellState() {
  var array = new Array();

  for (var x = 0; x < 80; x++) {
    newX = x * 10
    for(var y = 0; y  < 45; y++) {

      cell = new Cell("DEAD", newX, y * 10);
      array.push(cell);
    };
  };
  return array;
};

function addColor(arrayName) {

  const result = arrayName.filter(cell => cell.cellStatus == "ALIVE");
  result.forEach((object) => {
    ctx.fillRect(object.getX, object.getY, 10, 10);
  });
  
};


function addCell(cell, arrayName) {
    x = cell.getX;
    y = cell.getY;

    for (var i in arrayName) {
        if (x == arrayName[i].getX && y == arrayName[i].getY) {
          arrayName[i].cellStatus= cell.cellStatus;
          break;
        }
        else {
          arrayName.push(cell);
          break;
        }        
    };
};

function viewArray(arrayName) {
  var length = arrayName.length;
  for (var i = 0; i < length; i++) {
      console.log(arrayName[i]);
  };
  
};


/**
 * END OF FUNCTIONS
 */
drawGrid(ctx, 800, 450, 10);


arrayA = initialCellState();
cellNew = new Cell("ALIVE", 0, 0);
addCell(cellNew, arrayA);
viewArray(arrayA);
addColor(arrayA);

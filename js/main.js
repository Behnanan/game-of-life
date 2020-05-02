
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

function addCell(cell, array){
  x = cell.getX;
  y = cell.getY;
  status = cell.cellStatus;

  if (x >= 0 && x <= 790 && y >= 0 && y <= 440) { // checks input cell

    var arrayX = new Array(-10, 0, 10, -10, 10, -10, 0,  10);
    var arrayY = new Array(-10,-10,-10, 0,   0,  10, 10, 10);

    if(array.length == 0) { // empty array
      for(var i = 0; i < 8; i++) {
        var neighborX = x + arrayX[i];
        var neighborY = y + arrayY[i];

        if (neighborX >= 0 && neighborX <= 790 && neighborY >= 0 && neighborY <= 440) { // checks boundaries
          neighborCell = new Cell("DEAD", neighborX, neighborY);
          array.push(neighborCell);
        };
      };
      array.push(cell);
    }else { // array with at least 1 value
      for(var i in array) { // check if cell already exists
        if(array[i].getX == cell.getX && array[i].getY == cell.getY) {
          array[i].cellStatus = cell.cellStatus;
        };
    };
    // cell, nor neighbors exist
    for(var i = 0; i < 8; i++) {
      var neighborX = x + arrayX[i];
      var neighborY = y + arrayY[i];

    if (neighborX >= 0 && neighborX <= 790 && neighborY >= 0 && neighborY <= 440) { // checks boundaries
      neighborCell = new Cell("DEAD", neighborX, neighborY);
      array.push(neighborCell);
      };
      
    };
    array.push(cell);
   };
  };
};

// function makeNeighbors() {
//   var array = new Array();

//   for (var x = 0; x < 80; x++) {
//     newX = x * 10
//     for(var y = 0; y  < 45; y++) {

//       cell = new Cell("DEAD", newX, y * 10);
//       array.push(cell);
//     };
//   };
//   return array;
// };

function checkNeighbors(array1) {
  var count = 0;
  var neighborCount = 0;
  for (var i in array1) {
    var currentCell = array1[i];
    var x = currentCell.getX;
    var y = currentCell.getY;

    var resultTLX = x - 10;
    var resultTLY = y - 10;
    count++;
    console.log(currentCell, "count: ", count);
    // if (resultTLX >= 0 && resultTLX <= 790 && resultTLY >= 0 && resultTLY <= 440) {
    //   for (i in array1) {
    //     console.log("loop 2")
    //     var searchCell = array1[i];
    //     var sX = searchCell.getX;
    //     var sY = searchCell.getY;
    //     if(sX == resultTLX && sY == resultTLY) {
    //       console.log("status check")
    //       status = searchCell.cellStatus;
    //       if (status == "ALIVE") {
    //         console.log("alive", searchCell);
    //       };
    //     };
        // find cell with resultTLX and resultTLY coordinates
        // if ALIVE, add 1 to neighbor count of current cell
      // };
    // };
    // tl = [x - 10, y - 10];
    // tm = [x, y - 10];
    // tr = [x + 10, y - 10];
    // ml = [x - 10, y];
    // mr = [x + 10, y];
    // bl = [x - 10, y + 10];
    // bm = [x, y + 10];
    // br = [x + 10, y + 10];
    // newX = array1[i].getX - 10;
    // newY = array1[i].getY - 10;
    // console.log(newX, newY);
    // for (var i = 0; i < 7; i++) {
    //   if(tlX >= 0 && tlX <= 790 && tlY >= 0 && tlY <= 440) {
    //     // console.log(tlX, tlY);

    //   }
    };

    // console.log(x, y);
    // console.log(tlX, tlY);
    // for(var i in array1) {
    //   if (tlX == array1[i].getX && tlY == array1[i].getY) {
    //     // arrayName[i].cellStatus = cell.cellStatus;
    //     console.log("yes");
    //     break;
    //   }   
    // }
  // };
};

function changeCellStatus(cell, arrayName) {
  x = cell.getX;
  y = cell.getY;

  for (var i in arrayName) {
      if (x == arrayName[i].getX && y == arrayName[i].getY) {
        arrayName[i].cellStatus = cell.cellStatus;
        break;
      }       
  };
};

function viewArray(array1) {
  var length = array1.length;
  for (var i = 0; i < length; i++) {
    console.log("array a:", array1[i]); 
  };
  
};

function addColor(array1) {
  const result = array1.filter(cell => cell.cellStatus == "ALIVE");
  result.forEach((object) => {
    ctx.fillRect(object.getX, object.getY, 10, 10);
  });
  
};


/**
 * END OF FUNCTIONS
 */
drawGrid(ctx, 800, 450, 10);
arrayA = new Array();

// starter cells
cell0 = new Cell("ALIVE", 10, 10);
cell1 = new Cell("ALIVE", 10, 20);
cell2 = new Cell("ALIVE", 760, 420);

addCell(cell0, arrayA);
addCell(cell1, arrayA);
addCell(cell2, arrayA);

viewArray(arrayA);
addColor(arrayA);

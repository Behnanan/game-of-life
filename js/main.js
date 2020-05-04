// document.querySelector("body").onload = function() {console.log(_.sample([1, 2, 3, 4]))}

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
  // neighbor coordinates
  var arrayX = new Array(-10, 0, 10, -10, 10, -10, 0,  10);
  var arrayY = new Array(-10,-10,-10, 0,   0,  10, 10, 10);

  if (x >= 0 && x <= 790 && y >= 0 && y <= 440 && array.length == 0) { // checks input cell boundaries && empty array
 
    for(var i = 0; i < 8; i++) {
      var neighborX = x + arrayX[i];
      var neighborY = y + arrayY[i];

      if (neighborX >= 0 && neighborX <= 790 && neighborY >= 0 && neighborY <= 440) { // checks boundaries
        neighborCell = new Cell("DEAD", neighborX, neighborY); 
        array.push(neighborCell); // add dead neighbors 
        
      };
    };
      array.push(cell); // add cell
    
  }  
  else if (x >= 0 && x <= 790 && y >= 0 && y <= 440 && array.length > 0) { // array with at least 1 value, in boundaries
    // cell not in array
    array.pushIfNotExist(cell, function(e) { 
      return e.x === cell .x && e.y === cell .y; 
    });
    // neighbors
    for (var i = 0; i < 8; i++) {
      
      var neighborX = x + arrayX[i];
      var neighborY = y + arrayY[i];
      if (neighborX >= 0 && neighborX <= 790 && neighborY >= 0 && neighborY <= 440) {

        var neighbor = new Cell("DEAD", neighborX, neighborY); 
        array.pushIfNotExist(neighbor , function(e) { 
          return e.x === neighbor .x && e.y === neighbor .y; 
        });
      };
    };
    // cell in array
    for(eachCell in array) {
      if(array[eachCell].getX == x && array[eachCell].getY == y){
        array[eachCell].cellStatus = "ALIVE";
      };
    };
  };
};


function changeCellStatus(cell, arrayName) {
  x = cell.getX;
  y = cell.getY;

  for (var i in arrayName) {
      if (x == arrayName[i].getX && y == arrayName[i].getY) {
        arrayName[i].cellStatus = cell.cellStatus;
        break;
      };       
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
// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function(comparer) { 
  for(var i=0; i < this.length; i++) { 
      if(comparer(this[i])) return true; 
  }
  return false; 
}; 

// adds an element to the array if it does not already exist using a comparer 
// function
Array.prototype.pushIfNotExist = function(element, comparer) { 
  if (!this.inArray(comparer)) {
      this.push(element);
  }
}; 

/**
 * END OF FUNCTIONS
 */
drawGrid(ctx, 800, 450, 10);
arrayA = new Array();

// starter cells
cell0 = new Cell("ALIVE", 10, 10);
cell1 = new Cell("ALIVE", 20, 10);
cell2 = new Cell("ALIVE", 760, 420);
cell3 = new Cell("ALIVE", 0, 0);


addCell(cell0, arrayA);
addCell(cell1, arrayA);
addCell(cell2, arrayA);
addCell(cell3, arrayA);

viewArray(arrayA);
addColor(arrayA);
console.log("count: ", arrayA.length);


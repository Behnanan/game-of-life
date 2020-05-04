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
cellCount = 0; // dead and alive cells
inArrayCount = 0;
notInArrayCount = 0;
cellInArrayCount = 0;

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
    
    for (var i = 0; i < 8; i++) { 
      var neighborX = x + arrayX[i];
      var neighborY = y + arrayY[i];
      // console.log("--neighbor--: ", neighborX, neighborY)

      for(var eachCell in array) {
        // console.log(" cell: ", array[eachCell].getX, array[eachCell].getY);
        if(array[eachCell].getX == cell.getX && array[eachCell].getY == cell.getY){
          array[eachCell].cellStatus = "ALIVE";
        }

        else if(neighborX == array[eachCell].getX && neighborY == array[eachCell].getY) {
          continue;
          // console.log("match: ", array[eachCell].getX, array[eachCell].getY);
        }

        else {
          // console.log("no match: ", array[eachCell].getX, array[eachCell].getY);
          var element = new Cell("DEAD", neighborX, neighborY); 
          array.pushIfNotExist(element, function(e) { 
            return e.x === element.x && e.y === element.y; 
          });
          

        }

      };
    }
  }

  else {
    console.log("cell out of bounds.");
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
    cellCount++;
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
// cell2 = new Cell("ALIVE", 760, 420);
// cell3 = new Cell("ALIVE", 0, 0);


addCell(cell0, arrayA);
addCell(cell1, arrayA);
// addCell(cell2, arrayA);
// addCell(cell3, arrayA);

viewArray(arrayA);
addColor(arrayA);
console.log("count: ", cellCount);



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
  var arrayX = new Array(-10, 0, 10, -10, 10, -10, 0,  10);
  var arrayY = new Array(-10,-10,-10, 0,   0,  10, 10, 10);

  if (x >= 0 && x <= 790 && y >= 0 && y <= 440 && array.length == 0) { 
    for(var i = 0; i < 8; i++) {
      var neighborX = x + arrayX[i];
      var neighborY = y + arrayY[i];
      if (neighborX >= 0 && neighborX <= 790 && neighborY >= 0 && neighborY <= 440) { 
        neighborCell = new Cell("DEAD", neighborX, neighborY, 0); 
        array.push(neighborCell); 
        
      };
    };
      array.push(cell); 
  }  

  else if (x >= 0 && x <= 790 && y >= 0 && y <= 440 && array.length > 0) { 
    array.pushIfNotExist(cell, function(e) { 
      return e.x === cell.x && e.y === cell.y; 
    });

    for (var i = 0; i < 8; i++) {
      var neighborX = x + arrayX[i];
      var neighborY = y + arrayY[i];
      if (neighborX >= 0 && neighborX <= 790 && neighborY >= 0 && neighborY <= 440) {

        var neighbor = new Cell("DEAD", neighborX, neighborY, 0); 
        array.pushIfNotExist(neighbor , function(e) { 
          return e.x === neighbor.x && e.y === neighbor.y; 
        });
      };
    };

    for(eachCell in array) {
      if(array[eachCell].getX == x && array[eachCell].getY == y){
        array[eachCell].setCellStatus = "ALIVE";
      };
    };
  };
};

function updateNeighbors(array) {
  for(var i = 0; i < array.length; i++) { 
    cell = array[i];
    var x = cell.getX;
    var y = cell.getY;
    var arrayX = new Array(-10, 0, 10, -10, 10, -10, 0, 10);
    var arrayY = new Array(-10, -10, -10, 0, 0,  10, 10, 10);
    
    cell.setNeighbors = 0;

    for(var j = 0; j < 8; j++) { 
      var neighborX = x + arrayX[j];
      var neighborY = y + arrayY[j];

      if (neighborX >= 0 && neighborX <= 790 && neighborY >= 0 && neighborY <= 440 ) {
        let alive = array.filter(cell => cell.getCellStatus == "ALIVE"); 
        
        for(var k = 0; k < alive.length; k++) { 
          if(neighborX == alive[k].getX && neighborY == alive[k].getY) {
            // neighborCount++;
            // cell.neighbors = cell.neighbors + 1;
            cell.setNeighbors = cell.getNeighbors + 1;
          };
        };
      };
    };
  };
};

function nextGeneration(array1, array2) {
  for(var i = 0; i < array1.length; i++) { 
    var cell = array1[i];
    var neighborCount = cell.getNeighbors;

    if (cell.getCellStatus == "ALIVE") {
      if (neighborCount < 2) {
        cell.setCellStatus = "DEAD";
        array1.splice(i, 1);
        array2.push(cell);
        i--; 
      };
      if(neighborCount == 2 || neighborCount == 3) {
        array1.splice(i, 1);
        array2.push(cell);
        i--; 
      };   
      if (neighborCount > 3) { 
        cell.setCellStatus = "DEAD";
        array1.splice(i, 1);
        array2.push(cell);
        i--; 
      };
    }
    else if (cell.getCellStatus == "DEAD") {
      if(neighborCount == 3) {
        cell.setCellStatus = "ALIVE";
        array1.splice(i, 1);
        array2.push(cell);
        i--; 
      }
      else {
        array1.splice(i, 1);
        array2.push(cell);
        i--; 
      };
    };
  }; 
};

Array.prototype.inArray = function(comparer) { 
  for(var i=0; i < this.length; i++) { 
      if(comparer(this[i])) return true; 
  };
  return false; 
}; 

Array.prototype.pushIfNotExist = function(element, comparer) { 
  if (!this.inArray(comparer)) {
      this.push(element);
  };
};

function viewArray(array) {
  var length = array.length;
  for (var i = 0; i < length; i++) {
    if(array[i] !== undefined) {   
      console.log("view array: ", array[i]); 
    };
  };
};

function addColor(array) {
  for(var i = 0; i < array.length; i++) {
    if(array[i] !== undefined) {   
      if(array[i].getCellStatus == "ALIVE") {
        ctx.fillStyle = "black"
        ctx.fillRect(array[i].getX, array[i].getY, 10, 10);
      };
      if(array[i].getCellStatus == "DEAD") {
        // ctx.clearRect(array[i].getX, array[i].getY, 10, 10);
        ctx.fillStyle = "grey";
        ctx.fillRect(array[i].getX, array[i].getY, 10, 10);
      };
    };
  };
};

/**
 * END OF FUNCTIONS
 */
// drawGrid(ctx, 800, 450, 10);

arrayA = new Array();
arrayB = new Array();

// starter cells
cell0 = new Cell("ALIVE", 0, 0, 0);
cell1 = new Cell("ALIVE", 0, 10, 0);
cell2 = new Cell("ALIVE", 10, 0, 0);


addCell(cell0, arrayA);
addCell(cell1, arrayA);
addCell(cell2, arrayA);



updateNeighbors(arrayA);
addColor(arrayA);
nextGeneration(arrayA, arrayB);
addColor(arrayB);

updateNeighbors(arrayB);
nextGeneration(arrayB, arrayA);

addColor(arrayA);

console.log("arrayA count: ", arrayA.length);
viewArray(arrayA);
console.log("arrayB count: ", arrayB.length);
viewArray(arrayB);







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
    array.pushIfNotExist(cell, function(e) { 
      return e.x === cell.x && e.y === cell.y; 
    });

    for (var i = 0; i < 8; i++) {
      var neighborX = x + arrayX[i];
      var neighborY = y + arrayY[i];
      if (neighborX >= 0 && neighborX <= 790 && neighborY >= 0 && neighborY <= 440) {

        var neighbor = new Cell("DEAD", neighborX, neighborY); 
        array.pushIfNotExist(neighbor , function(e) { 
          return e.x === neighbor.x && e.y === neighbor.y; 
        });
      };
    };

    for(eachCell in array) {
      if(array[eachCell].getX == x && array[eachCell].getY == y){
        array[eachCell].cellStatus = "ALIVE";
      };
    };
  };
};

function nextGeneration(array1, array2) {

  for(var i = 0; i < array1.length; i++) { 

    var cell = array1[i];
    var status = cell.cellStatus;
    var x = cell.getX;
    var y = cell.getY;
    var arrayX = new Array(-10, 0, 10, -10, 10, -10, 0,  10);
    var arrayY = new Array(-10,-10,-10, 0,   0,  10, 10, 10);
    var neighborCount = 0;

    for(var j = 0; j < 8; j++) {
      var neighborX = x + arrayX[j];
      var neighborY = y + arrayY[j];

      if (neighborX >= 0 && neighborX <= 790 && neighborY >= 0 && neighborY <= 440 ) {
        const alive = array1.filter(cell => cell.cellStatus == "ALIVE");
        alive.forEach((object) => {
          if(object.getX == neighborX && object.getY == neighborY) {
            neighborCount++;
          };
        });
      };
    };

    if (status == "ALIVE") {
      if (neighborCount < 2) {
        console.log(cell);
        array1[i].cellStatus = "DEAD";
        // console.log("neighbors < 2", cell);
        array1.splice(i, 1);
        array2.push(cell);
        i--; 
      };

      if(neighborCount == 2 || neighborCount == 3) {
        // console.log("neighbors == 2", cell);
        array1.splice(i, 1);
        array2.push(cell);
        i--; 
      };
    
      if (neighborCount > 3) { 
        array1[i].cellStatus = "DEAD";
        // console.log("neighbors > 3", cell);
        array1.splice(i, 1);
        array2.push(cell);
        i--; 
      };
    }
    else if (status == "DEAD") {
      if(neighborCount == 3) {
        array1[i].cellStatus = "ALIVE";
        // console.log("neighbors == 3", cell);
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
    console.log("view array: ", array[i]); 
  };
};

function addColor(array) {
  const alive = array.filter(cell => cell.cellStatus == "ALIVE");
  alive.forEach((object) => {
    ctx.fillRect(object.getX, object.getY, 10, 10);
  });
  const dead = array.filter(cell => cell.cellStatus == "DEAD");
  dead.forEach((object) => {
    ctx.clearRect(object.getX, object.getY, 10, 10);
  });
};

/**
 * END OF FUNCTIONS
 */
drawGrid(ctx, 800, 450, 10);

arrayA = new Array();
arrayB = new Array();

// starter cells
cell0 = new Cell("ALIVE", 10, 10);
cell1 = new Cell("ALIVE", 20, 10);
cell3 = new Cell("ALIVE", 30, 10);

addCell(cell0, arrayA);
addCell(cell1, arrayA);
addCell(cell3, arrayA);

console.log("-- gen 1 --");
addColor(arrayA);
addColor(arrayB);

// nextGeneration(arrayA, arrayB);
// console.log("-- gen 2 --");
// addColor(arrayA);
// addColor(arrayB);

// nextGeneration(arrayB, arrayA);
// console.log("-- gen 3 --");
// addColor(arrayA);
// addColor(arrayB);

console.log("arrayA count: ", arrayA.length);
viewArray(arrayA);
console.log("arrayB count: ", arrayB.length);
viewArray(arrayB);






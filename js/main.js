
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
        neighborCell = new Cell("DEAD", neighborX, neighborY); 
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
    // var status = cell.cellStatus;
    var x = array1[i].getX;
    var y = array1[i].getY;
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

    if (array1[i].cellStatus == "ALIVE") {
      if (neighborCount < 2) {
        // console.log(" < 2", array1[i]);
        array1[i].cellStatus = "DEAD";
        array1.splice(i, 1);
        array2.push(array1[i]);
        i--; 
      };

      if(neighborCount == 2 || neighborCount == 3) {
        console.log("should be alive", array1[i])
        // console.log(" == 2, 3", array1[i]);
        array1.splice(i, 1);
        array2.push(array1[i]);
        i--; 
      };
    
      if (neighborCount > 3) { 
        array1[i].cellStatus = "DEAD";
        // console.log(" > 3", array1[i]);
        array1.splice(i, 1);
        array2.push(array1[i]);
        i--; 
      };
    }
    else if (array1[i].cellStatus == "DEAD") {
      if(neighborCount == 3) {
        array1[i].cellStatus = "ALIVE";
        array1.splice(i, 1);
        array2.push(array1[i]);
        i--; 
      }
      else {
        array1.splice(i, 1);
        array2.push(array1[i]);
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
  const alive = array.filter(cella => cella.cellStatus == "ALIVE");
  alive.forEach((objecta) => {
    ctx.fillRect(objecta.getX, objecta.getY, 10, 10);
  });
  const dead = array.filter(celld => celld.cellStatus == "DEAD");
  dead.forEach((objectd) => {
    ctx.clearRect(objectd.getX, objectd.getY, 10, 10);
  });
};

/**
 * END OF FUNCTIONS
 */
// drawGrid(ctx, 800, 450, 10);

arrayA = new Array();
arrayB = new Array();

// starter cells
cell0 = new Cell("ALIVE", 10, 0);
cell1 = new Cell("ALIVE", 0, 10);
cell3 = new Cell("ALIVE", 10, 10);


addCell(cell0, arrayA);
addCell(cell1, arrayA);
addCell(cell3, arrayA);


console.log("arrayA count: ", arrayA.length);
viewArray(arrayA);
console.log("arrayB count: ", arrayB.length);
viewArray(arrayB);






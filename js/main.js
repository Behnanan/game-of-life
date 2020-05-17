var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

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
        for(var l = 0; l < alive.length; l++) { 
          if(neighborX == alive[l].getX && neighborY == alive[l].getY) {
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
        // cell.setCellStatus = "ALIVE";
        array1.splice(i, 1);
        newCell = new Cell("ALIVE", cell.getX, cell.getY, 0);
        addCell(newCell, array2);
        // array2.push(cell);
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
        var style = "#"+((1<<24)*Math.random()|0).toString(16)
        ctx.fillStyle = style;
        ctx.globalAlpha = 0.4;
        ctx.fillRect(array[i].getX, array[i].getY, 10, 10);
      };
      if(array[i].getCellStatus == "DEAD") {
        ctx.clearRect(array[i].getX, array[i].getY, 10, 10);
      };
    };
  };
};



arrayA = new Array();
arrayB = new Array();

//glider
cell0 = new Cell("ALIVE", 0, 0, 0);
cell1 = new Cell("ALIVE", 0, 20, 0);
cell2 = new Cell("ALIVE", 10, 20, 0);
cell3 = new Cell("ALIVE", 10, 10, 0);
cell4 = new Cell("ALIVE", 20, 10, 0);

addCell(cell0, arrayA);
addCell(cell1, arrayA);
addCell(cell2, arrayA);
addCell(cell3, arrayA);
addCell(cell4, arrayA);

// // blinker
// cell5 = new Cell("ALIVE", 10, 0, 0);
// cell6 = new Cell("ALIVE", 10, 10, 0);
// cell7 = new Cell("ALIVE", 10, 20, 0);
// addCell(cell5, arrayA);
// addCell(cell6, arrayA);
// addCell(cell7, arrayA);


function flipFlop(array1, array2, i){
  if(i % 2 == 0){
    addColor(array1);
    updateNeighbors(array1);
    nextGeneration(array1, array2);
  }
  else{
    addColor(array2);
    updateNeighbors(array2);
    nextGeneration(array2, array1);
  }
}

var repeater;
var count = 0;
function doWork(){
  repeater = setTimeout(doWork, 2000);
  console.log("doing work...", count);
  flipFlop(arrayA, arrayB, count);
  count++;
  if(count == 21){
    stopWork();
  };
}

function stopWork(){
  clearTimeout(repeater);
}

doWork();

// console.log("arrayA count: ", arrayA.length);
// viewArray(arrayA);
// console.log("arrayB count: ", arrayB.length);
// viewArray(arrayB);












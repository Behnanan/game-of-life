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
    if(cell.getCellStatus == "ALIVE"){
      for(j in array) {
        if(array[j].getX == x && array[j].getY == y){
          array[j].setCellStatus = "ALIVE";
        };
      };
    }
    else {
      for(k in array) {
        if(array[k].getX == x && array[k].getY == y){
          array[k].setCellStatus = "DEAD";
        };
      };
    }

  };
};

function updateNeighborCount(array) {
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
            cell.setNeighbors = cell.getNeighbors + 1;
          };
        };
      };
    };
  };
};

function nextGeneration(array1, array2) {
  neighborArray = new Array();
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
        array1.splice(i, 1);
        cell.setCellStatus = "ALIVE";
        array2.push(cell);
        i--;
        var x = cell.getX;
        var y = cell.getY;
        var arrayX = new Array(-10, 0, 10, -10, 10, -10, 0, 10);
        var arrayY = new Array(-10, -10, -10, 0, 0,  10, 10, 10);
    
        for(var j = 0; j < 8; j++) { 
          var neighborX = x + arrayX[j];
          var neighborY = y + arrayY[j];
          if (neighborX >= 0 && neighborX <= 790 && neighborY >= 0 && neighborY <= 440) {
            neighbor = new Cell("DEAD", neighborX, neighborY, 0);
            neighborArray.push(neighbor);
          };
        };
      }
      else {
        array1.splice(i, 1);
        array2.push(cell);
        i--; 
      };
    };
  };
  for(var neighbors = 0; neighbors < neighborArray.length; neighbors++) {
    array2.pushIfNotExist(neighborArray[neighbors] , function(e) { 
      return e.x === neighborArray[neighbors].x && e.y === neighborArray[neighbors].y; 
    });
  };
};

Array.prototype.inArray = function(comparer) { 
  for(var i=0; i < this.length; i++) { 
      if(comparer(this[i])) return true; 
  };
  return false; 
}; 

Array.prototype.pushIfNotExist = function(element, comparer) { 
  if(!this.inArray(comparer)) {
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

function blackAndWhite(array) {
  for(var i = 0; i < array.length; i++) {
    if(array[i] !== undefined) {   
      if(array[i].getCellStatus == "ALIVE") {
        ctx.fillStyle = "black";
        ctx.fillRect(array[i].getX, array[i].getY, 10, 10);
      };
      if(array[i].getCellStatus == "DEAD") {
        ctx.fillStyle = "grey";
        ctx.fillRect(array[i].getX, array[i].getY, 10, 10);
      };
    };
  };
};

function technicolor(array) {
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
        ctx.fillRect(array[i].getX, array[i].getY, 10, 10);
      };
    };
  };
};

arrayA = new Array();
arrayB = new Array();

function gosper(){
  gosperArrayX = new Array(20, 30, 20, 30, 360, 370, 360, 370, 260, 260, 240, 230, 220, 230, 220, 230, 220, 240, 260, 260,
    150, 140, 130, 120, 120, 120, 130, 140, 150, 170, 180, 180, 190, 160, 180, 170);
  gosperArrayY = new Array(40, 40, 50, 50, 20, 20, 30, 30, 0, 10, 10, 20, 20, 30, 30, 40, 40, 50, 50, 60, 20, 20, 30, 40, 
    50, 60, 70, 80, 80, 70, 60, 50, 50, 50, 40, 30);

  for(var i = 0; i < gosperArrayX.length; i++){
    x = gosperArrayX[i];
    y = gosperArrayY[i];
    cell = new Cell("ALIVE", x, y, 0);
    addCell(cell, arrayA);
  };
};


function flipFlop(array1, array2, i){
  if(i % 2 == 0){
    blackAndWhite(array1);
    updateNeighborCount(array1);
    nextGeneration(array1, array2);
  }
  else{
    blackAndWhite(array2);
    updateNeighborCount(array2);
    nextGeneration(array2, array1);
  };
};

var repeater;
var count = 0;

function doWork() {
  repeater = setTimeout(doWork, 50);
  flipFlop(arrayA, arrayB, count);
  count++;
};

gosper();
doWork(); 





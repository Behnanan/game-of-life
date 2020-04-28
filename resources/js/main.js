
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


function cellFactory() {

  var cellDictionary = {};

  for (var x = 0; x < 40; x++) {
    for(var y = 0; y  < 80; y++) {

      // var cell_name = 'cell' + x * 10 + 'x' + y * 10 + 'y';
      var cell_name = 'cell' + x;


      cell = new Cell("DEAD", x * 10, y * 10 , 0);
      cellDictionary[cell_name] = cell;
    };
  };
  return cellDictionary;
};

function nextGeneration() {
  for (var key in cellDictionary){
    cell = cellDictionary[key];
    status = cell.cellStatus;
  
    if( status == "ALIVE") {
      ctx.fillRect(cell.getX, cell.getY, 10, 10);
    }
  
  }
}

// function isEmpty(obj) {
//   return Object.keys(obj).length === 0;
// }


/**
 * END OF FUNCTIONS
 */
drawGrid(ctx, 800, 450, 10);

cellDictionary = cellFactory();
// starter cells
cellDictionary["cell0x0y"].cellStatus = "ALIVE";
cellDictionary["cell0x10y"].cellStatus = "ALIVE";
cellDictionary["cell10x10y"].cellStatus = "ALIVE";

// while(isEmpty(cellDictionary) == false){
// for( var i = 0; i < 500; i++) {
//   for (var key in cellDictionary){
//     var cellKey = cellDictionary[key];
//     if(cellKey.cellStatus == "ALIVE" ){
//       console.log("ALIVE" + i);
//     };
//   };
// };

// x = 10;
// y = 0;
// cellDictionary["cell" + x + "x" + y + "y"].cellStatus = "ALIVE";


addColor = nextGeneration();

for (var key in cellDictionary){
  console.log(key, cellDictionary[key]);
}

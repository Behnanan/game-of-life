
class Cell {
    constructor(cellStatus) {
      this.status = cellStatus;
    }
    get cellStatus() {
      return this.status;
    }
    set cellStatus(newStatus) {
      this.status = newStatus;
    }
  }
  
cell = new Cell("ALIVE");
// cell.cellStatus = "DEAD"
  
document.getElementById("demo").innerHTML = cell.cellStatus;


// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");

// status = cell.cellStatus;
// if(status == "Alive"){
//     ctx.fillStyle = "#FF0000";
//     ctx.fillRect(0,0,150,75);
// };

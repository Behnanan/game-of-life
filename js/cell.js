
class Cell {
    constructor(cellStatus, x, y) {
      this.status = cellStatus;
      this.x = x;
      this.y = y;
    };
    get cellStatus() {
      return this.status;
    };
    set cellStatus(newStatus) {
      this.status = newStatus;
    };
    set setX(newX){
      this.x = newX;
    }
    get getX(){
      return this.x;
    };
    set setY(newY){
      this.y = newY;
    }
    get getY(){
      return this.y;
    };
    
    cellFactory() {

      for (var x = 0; x < 80; x++) {
        newX = x * 10
        for(var y = 0; y  < 45; y++) {
    
          cell = new Cell("DEAD", newX, y * 10);
          arrayName.push(cell);
        };
      };
    };
  };
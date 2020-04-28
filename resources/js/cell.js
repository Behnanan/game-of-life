
class Cell {
    constructor(cellStatus, x, y, neighbors) {
      this.status = cellStatus;
      this.x = x;
      this.y = y;
      this.neighbors = neighbors;
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
    set setNeighbors(newNeighbor) {
      this.neighbors = newNeighbor;
    };
    get getNeighbors(){
      return this.neighbors;
    };
  };
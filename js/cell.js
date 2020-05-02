
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
    get coordinates() {
      const [x, y] = this.coordinates;
      return this.coordinates;
    }
  };
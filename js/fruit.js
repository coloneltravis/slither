

function Fruit(x, y, t) {

    this.spot = new Point(x, y);
    this.fruitimg = null;
    this.type = t;


    this.init = function() {
        this.fruitimg = new Image();
        this.fruitimg.src = '../img/apple.png';

        return this;
    },


    this.clear = function(ctx, grid) {
        ctx.clearRect(this.spot.x*CELLSIZE, this.spot.y*CELLSIZE, CELLSIZE, CELLSIZE);
        grid[this.spot.y][this.spot.x] = '';
    },


    this.draw = function(ctx, grid) {
        ctx.drawImage(this.fruitimg, this.spot.x*CELLSIZE, this.spot.y*CELLSIZE, CELLSIZE-1, CELLSIZE-1);
        grid[this.spot.y][this.spot.x] = this.type;
    }
}
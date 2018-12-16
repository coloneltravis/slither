
var LEFT = 1;
var RIGHT = 2;
var UP = 3;
var DOWN = 4;


function Snake(x, y, l) {

    this.head = new Point(x, y);
    this.tail = [];
    this.dir = new Point(0, 1);
    this.startlen = l;
    this.headimg = null;
    this.tailimg = null;


    this.init = function() {
        var first = new Point(this.head.x, this.head.y);
        this.tail.push(first);


        for (var i = 0; i < this.startlen; i++) {
            var l = this.tail.length-1;
            var next = new Point(this.tail[l].x, this.tail[l].y);
            next.x += this.dir.x;
            next.y += this.dir.y;
            this.tail.push(next);
        }

        this.dir.y = -1;

        this.headimg = new Image();
        this.headimg.src = '../img/head.png';

        this.tailimg = new Image();
        this.tailimg.src = '../img/tail.png';
    
        return this;
    },


    this.growTail = function(parts) {

        if (this.tail.length > 0) {
            var next = new Point(this.tail[0].x, this.tail[0].y);
            next.x += this.dir.x;
            next.y += this.dir.y;
            this.tail.unshift(next);
        }
    },


    this.shrinkTail = function(parts) {

    },


    this.move = function(speed) {

        for (var i=this.tail.length-1; i>0; i--) {
            this.tail[i].x = this.tail[i-1].x;
            this.tail[i].y = this.tail[i-1].y;
        }

        this.tail[0].x += this.dir.x;
        this.tail[0].y += this.dir.y;

        if (this.tail[0].x >= MAXCOLS) this.tail[0].x = 0;
        if (this.tail[0].x < 0) this.tail[0].x = MAXCOLS-1;
        if (this.tail[0].y >= MAXROWS) this.tail[0].y = 0;
        if (this.tail[0].y < 0) this.tail[0].y = MAXROWS-1;

        return this;
    },


    this.turn = function(dir) {

        switch (dir) {
            case LEFT :
                this.dir.x = -1;
                this.dir.y = 0;
                break;

            case RIGHT :
                this.dir.x = 1;
                this.dir.y = 0;
                break;

            case UP :
                this.dir.x = 0;
                this.dir.y = -1;
                break;

            case DOWN :
                this.dir.x = 0;
                this.dir.y = 1;
                break;
        }

        return this;
    },


    this.check = function(grid, item) {

        if (grid[this.tail[0].y][this.tail[0].x] == item) {

            if (item == 'A') {
                this.growTail(1);
            }

            return true;
        }        

        return false;
    },


    this.clear = function(ctx, grid) {
        for (i=0; i<this.tail.length; i++) {
            ctx.clearRect(this.tail[i].x * CELLSIZE, this.tail[i].y * CELLSIZE, CELLSIZE, CELLSIZE);
            grid[this.tail[i].y][this.tail[i].x] = '0';
        }
    },


    this.draw = function(ctx, grid) {
        ctx.drawImage(this.headimg, this.tail[0].x*CELLSIZE, this.tail[0].y*CELLSIZE, CELLSIZE, CELLSIZE);
        grid[this.tail[0].y][this.tail[0].x] = 'H';

        for (i=1; i<this.tail.length; i++) {
            grid[this.tail[i].y][this.tail[i].x] = 'S';
            var x = this.tail[i].x * CELLSIZE;
            var y = this.tail[i].y * CELLSIZE;
            ctx.drawImage(this.tailimg, x, y, CELLSIZE, CELLSIZE);
        }
    }
}

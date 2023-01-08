class GridLayer {
    static width  = 48;
    static height = 48;
    constructor({position, showGrid}) {
        this.position = position;
        this.showGrid = showGrid;
        this.width    = 48;
        this.height   = 48;
    }
    draw() {
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }
}
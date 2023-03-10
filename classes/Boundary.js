class Boundary {
    static width  = 48;
    static height = 48;
    constructor({position, showBoundary}) {
        this.position = position;
        this.showBoundary = showBoundary;
        this.width    = 48;
        this.height   = 48;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
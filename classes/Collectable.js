class Collectable {
    static width  = 48;
    static height = 48;
    static items  = ['sword','shield','helmet','bow','money', 'potion','poison'];
    constructor({position, items}) {
        this.item     = items[Math.floor(Math.random() * items.length)];
        this.position = position;
        this.width    = 48;
        this.height   = 48;
        this.id       = Math.floor(Math.random() * 100)
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
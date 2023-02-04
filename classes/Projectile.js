class Projectile {
    constructor({position, velocity, trajectory}) {
        this.position = position;
        this.trajectory = this.trajectory;
        this.velocity = velocity;
        this.radius = 3;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
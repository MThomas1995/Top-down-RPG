class Sprite {
    constructor({position, image, frames = { max: 1 }, sprites = []}) {
        this.position = position;
        this.image  = image;
        this.money  = 0;    
        this.items  = [];
        this.frames = {...frames, val: 0, elapsed: 0};

        this.image.onload = () => {
            this.width  = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
        this.moving = false;
        this.sprites = sprites;
    }
    draw() {
        ctx.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,            
            this.image.width / this.frames.max,
            this.image.height
        );

        if(!this.moving) return

        if(this.frames.max > 1) {
            this.frames.elapsed++;
        }

        if(this.frames.elapsed % 10 === 0) {
            if(this.frames.val < this.frames.max - 1) this.frames.val++;
            else this.frames.val = 0;
        }
    }
}

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

class Boundary {
    static width  = 48;
    static height = 48;
    constructor({position}) {
        this.position = position;
        this.width    = 48;
        this.height   = 48;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

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
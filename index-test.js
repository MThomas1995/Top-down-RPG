const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let screenWidth  = window.innerWidth;
let screenHeight = window.innerHeight;

let xPos = screenWidth / 2;
let yPos = screenHeight / 2;

canvas.style.left = `${xPos}px`;
canvas.style.top = `${yPos}px`;

canvas.width  = screenWidth;
canvas.height = screenHeight;

const collisionsMap = [];
for(let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
}

const boundaries = [];
const offset = {
    x: -735,
    y: -650
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1025)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            );
    });
});

const image = new Image();
image.src = './media/img/map.png';

const foregroundImage = new Image();
foregroundImage.src = './media/img/map-foreground.png';

const playerUpImage = new Image();
playerUpImage.src = './media/img/playerUp.png';

const playerDownImage = new Image();
playerDownImage.src = './media/img/playerDown.png';

const playerLeftImage = new Image();
playerLeftImage.src = './media/img/playerLeft.png';

const playerRightImage = new Image();
playerRightImage.src = './media/img/playerRight.png';

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
    }
});

const projectiles = [];

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
});

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
});

const keys = {
    left: {
        pressed: false
    },
    right: {
        pressed: false
    },
    up: {
        pressed: false
    },
    down: {
        pressed: false
    },
    space: {
        pressed: false
    }
};

const movables = [background, ...boundaries, foreground];

const retangularCollision = ({rectangle1, rectangle2}) => {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    ); 
}

const animate = () => {
    window.requestAnimationFrame(animate);
    background.draw();
    // boundaries.forEach((boundary) => {
        // boundary.draw();
    // });

    player.draw();

    projectiles.forEach((projectile) => {
        projectile.update();
    });

    // foreground.draw();

    let moving = true;
    player.moving = false;

    if(keys.left.pressed) {
        player.moving = true;
        player.image = player.sprites.left;
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(
                retangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }}
                })
            ) {
                console.log('Boundary Hit!');
                moving = false;
                break;
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.x += 3;
        });
    } else if(keys.up.pressed){
        player.moving = true;
        player.image = player.sprites.up;
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(
                retangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }}
                })
            ) {
                console.log('Boundary Hit!');
                moving = false;
                break;
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.y += 3;
        });
    } else if(keys.right.pressed) {
        player.moving = true;
        player.image = player.sprites.right;
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(
                retangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }}
                })
            ) {
                console.log('Boundary Hit!');
                moving = false;
                break;
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.x -= 3;
        });
    } else if(keys.down.pressed) {
        player.moving = true;
        player.image = player.sprites.down;
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(
                retangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }}
                })
            ) {
                console.log('Boundary Hit!');
                moving = false;
                break;
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.y -= 3;
        });
    }
}
animate();


// Movement (Keyboard Action)
let lastKey = '';
window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft': 
            keys.left.pressed = true;
            lastKey = 'ArrowLeft';
            break;
        case 'ArrowRight': 
            keys.right.pressed = true;
            lastKey = 'ArrowRight';
            break;
        case 'ArrowUp': 
            keys.up.pressed = true;
            lastKey = 'ArrowUp';
            break;
        case 'ArrowDown': 
            keys.down.pressed = true;
            lastKey = 'ArrowDown';
            break;
        case ' ': 
            // keys.space.pressed = true;
            // lastKey = ' ';
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x,
                    y: player.position.y
                },
                velocity: {
                    x: 0, 
                    y: -3
                    }
                }
            ));
            break;
        }
});

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'ArrowLeft': 
            keys.left.pressed = false;
            break;
        case 'ArrowRight': 
            keys.right.pressed = false;
            break;
        case 'ArrowUp': 
            keys.up.pressed = false;
            break;
        case 'ArrowDown':
            keys.down.pressed = false;
            break;
        case ' ':
            keys.space.pressed = false;
            break;
    }
});
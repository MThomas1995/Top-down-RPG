// Game Container Setup //
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let screenWidth  = window.innerWidth;
let screenHeight = window.innerHeight;

let xPos = screenWidth / 2;
let yPos = screenHeight / 2;

let mapWidth  = 70 * 48;
let mapHeight = 40 * 48;

canvas.style.left = `${xPos}px`;
canvas.style.top  = `${yPos}px`;

canvas.width  = 1024;
canvas.height = 576;

let collectables = [];
let boundaries   = [];
let gridSquares  = [];


// End - Game Container Setup //

// Image imports //
    // Levels //
        // 1 //
        const L1Image = new Image();
        L1Image.src = './media/img/levels/level-1.png';
        const L1FGImage = new Image();
        L1FGImage.src = './media/img/levels/level-1-fg.png';
        // 2 //
        const L2Image = new Image();
        L2Image.src = './media/img/levels/level-2.png';
        const L2FGImage = new Image();
        L2FGImage.src = './media/img/levels/level-2-fg.png';
    
    // Assets //
    const coins = new Image();
    coins.src = './media/img/coins.png';

    // Player //
    const playerUpImage = new Image();
    playerUpImage.src = './media/img/playerUp.png';
    const playerDownImage = new Image();
    playerDownImage.src = './media/img/playerDown.png';
    const playerLeftImage = new Image();
    playerLeftImage.src = './media/img/playerLeft.png';
    const playerRightImage = new Image();
    playerRightImage.src = './media/img/playerRight.png';
// End - Image imports //

let setCollision;
let setCollectables;
let background;
let foreground;
let movables;
let blockLayer;
let player;
let playerPixelPos;
let playerTilePos;
let offset;
let directions = {
    left:  {x: -4, y: 0, key: 'left'},
    right: {x: 4, y: 0, key: 'right'},
    up:    {x: 0, y: -4, key: 'up'},
    down:  {x: 0, y: 4, key: 'down'}
}
let collisionsMap = [];
let showGrid     = true;
let showBoundary = true;

let levels = {
    1: {
        init: () => {
            // Set Map offset //
            offset = {
                x: -720,
                y: -640
            }
            // Set Block Layers //
            setCollision    = setCollisonMap(boundaries, L1Collisions);
            setCollectables = setCollectablesMap(collectables, L1Collectables);
            setGridLayer    = setGridLayerMap(gridSquares, gridLayer);
            // Set Background //  
            background = new Sprite({
                position: {
                    x: offset.x,
                    y: offset.y
                },
                image: L1Image
            });
            // Set Foreground //
            foreground = new Sprite({
                position: {
                    x: offset.x,
                    y: offset.y
                },
                image: L1FGImage
            });
            // Set Player //
            player = new Sprite({
                position: {
                    x: (canvas.width / 2) - ((192 / 4) / 2),
                    y: (canvas.height / 2) - (68 / 2)
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
            // Set Player - Map Coords //
            playerPixelPos = {
                x: player.position.x - offset.x,
                y: player.position.y - offset.y
            }
            playerTilePos = {
                x: Math.floor((player.position.x - offset.x) / 48),
                y: Math.floor((player.position.y - offset.y) / 48)
            }
            movables = [background, ...boundaries, foreground, ...collectables, ...gridSquares];
        }
    },
    2: {
        init: () => {
            // Set Map offset //
            offset = {
                x: -50,
                y: -700
            }
            // Set Block Layers //
            setCollision    = setCollisonMap(boundaries,L2Collisions);
            setCollectables = setCollectablesMap(collectables, L2Collectables);
            setGridLayer    = setGridLayerMap(gridSquares, gridLayer);
            // Set Background //  
            background = new Sprite({
                position: {
                    x: offset.x,
                    y: offset.y
                },
                image: L2Image
            });
            // Set Foreground //
            foreground = new Sprite({
                position: {
                    x: offset.x,
                    y: offset.y
                },
                image: L2FGImage 
            });
            // Set Player //
            player = new Sprite({
                position: {
                    x: (canvas.width / 2) - ((192 / 4) / 2),
                    y: (canvas.height / 2) - (68 / 2)
                },
                image: playerRightImage,
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
            // Set Player - Map Coords //
            playerPixelPos = {
                x: Math.floor((player.position.x - offset.x) / 48),
                y: Math.floor((player.position.y - offset.y) / 48)
            }
            movables = [background, ...boundaries, foreground, ...collectables, ...gridSquares];
        }
    }
};

const setCollisonMap = (boundaries, collisions) => {

    collisionsMap = [];

    for(let i = 0; i < collisions.length; i += 70) {
        collisionsMap.push(collisions.slice(i, 70 + i));
    }
    
    collisionsMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if(symbol === 1025)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    showBoundary: showBoundary
                })
            );
        });
    });
}

const setCollectablesMap = (collectables, collectableSquares) => {
    
    let collectableMap = [];

    for(let i = 0; i < collectableSquares.length; i += 70) {
        collectableMap.push(collectableSquares.slice(i, 70 + i));
    }

    collectableMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if(symbol === 1042)
                collectables.push(
                    new Collectable({
                        position: {
                            x: j * Collectable.width + offset.x,
                            y: i * Collectable.height + offset.y
                        },
                        items: Collectable.items,
                        id: Collectable.id,
                    })
                );
        });
    });
}

const setGridLayerMap = (gridSquares, gridLayer) => {

    let gridLayerMap = [];

    for(let i = 0; i < gridLayer.length; i += 70) {
        gridLayerMap.push(gridLayer.slice(i, 70 + i));
    }

    gridLayerMap.forEach((row, i) => {
        row.forEach((square, j) => {
            gridSquares.push(
                new GridLayer({
                    position: {
                        x: j * GridLayer.width + offset.x,
                        y: i * GridLayer.height + offset.y
                    },
                    showGrid: showGrid
                })
            )
        });
    });
}

const projectiles    = [];
const collectedItems = [];

// Check for collision on all axis
const retangularCollision = ({rectangle1, rectangle2}) => {
    return (
        rectangle1.position.x + (rectangle1.width / 6 * 5) >= rectangle2.position.x &&
        rectangle1.position.x + (rectangle1.width / 6) <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + (rectangle2.height - (rectangle1.height / 2)) &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    );
}

// Game Animation Loop
const animate = () => {
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach((boundary) => {
        if(showBoundary) {
            boundary.draw();
        }
    });

    collectables.forEach((collectable) => {
        collectable.draw();
    });

    player.draw();

    projectiles.forEach((projectile) => {
        projectile.update();
    });

    foreground.draw();

    gridSquares.forEach((gridSquare) => {
        if(showGrid) {
            gridSquare.draw();
        }
    });

    let moving      = true;
    let currentMove = false;
    player.moving   = false;

    if(keys.left.pressed) {
        currentMove = directions.left;
        player.moving = true;
    }
    if(keys.right.pressed) {
        currentMove = directions.right;
        player.moving = true;
    }
    if(keys.up.pressed) {
        currentMove = directions.up;
        player.moving = true;
    }
    if(keys.down.pressed) {
        currentMove = directions.down;
        player.moving = true;
    }
    

    if(player.moving) {
        player.image = player.sprites[currentMove.key];
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(
                retangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + currentMove.x,
                        y: boundary.position.y + currentMove.y
                    }}
                })
            ) {
                console.log('Boundary Hit!');   
                // moving = false;
                break;
            }
        }
        for(let i = 0; i < collectables.length; i++) {
            const collectable = collectables[i];
            if(
                retangularCollision({
                    rectangle1: player,
                    rectangle2: {...collectable, position: {
                        x: collectable.position.x,
                        y: collectable.position.y
                    }}
                })
            ) {
                itemCheck(collectable);
                break;
            }
        }       
        if(moving) {

            playerTilePos = {
                x: playerPixelPos.x / 48,
                y: playerPixelPos.y / 48
            }

            let newPlayerPixelPos = {...playerPixelPos};
            newPlayerPixelPos.x += currentMove.x;
            newPlayerPixelPos.y += currentMove.y;
            let newPlayerTilePos  = {
                x: newPlayerPixelPos.x / 48,
                y: newPlayerPixelPos.y / 48
            };
            let moveValid = validateMove(newPlayerTilePos, currentMove.key);
            
            if(moveValid) {
                playerTilePos = {...newPlayerTilePos};
                playerPixelPos = {...newPlayerPixelPos};

                movables.forEach((movable) => {
                    movable.position.x -= currentMove.x;
                    movable.position.y -= currentMove.y;
                });
                updateCoordinates(playerPixelPos);
            }
        }
    }
}   
levels[1].init();
animate();

// Collectables Check for duplicates / type
const itemCheck = (collectable) => {
    if(!player.items.includes(collectable.item.id)) {
        
        const index = collectables.indexOf(collectable);
        collectables.splice(index, 1);
        console.log(collectable);
        if(collectable.item === 'money') {
            player.money += collectable.id;
            document.querySelector('#money-count span').innerHTML = player.money;
        } else {
            player.items.push({collectable});
            addItems2Inventory();
        }
    } else {
        console.log('Item already collected');
    }
}

// Adding items to inventory list / checking for suplicates
const addItems2Inventory = () => {
    let inventory = document.querySelector('#inventory #collectables');
    const  items  = player.items.map((items) => items.collectable.item);
    let itemList  = '';

    itemsCount = [];
    items.forEach((item) => {
        itemsCount[item] = (itemsCount[item] || 0) + 1;
    });

    for(const item in itemsCount) {
        itemList += `<p>${item} <span>x ${itemsCount[item]}</span></p>`;
    }

    inventory.innerHTML = itemList;
}

// Inventroy Animation
const toggleInventory = () => {
    const inventory    = document.getElementById('inventory');
    const inventoryBtn = document.querySelector('#inventory button');

    inventoryBtn.classList.toggle('open');

    if(inventoryBtn.classList.contains('open')) {
        inventory.style.left = `calc(100% - ${inventory.offsetWidth}px)`;
    } else {
        inventory.style.left = '100%';
    }
}

const updateCoordinates = (playerPixelPos) => {
    let xCooContainer = document.querySelector('#coordinates-container #x-pos');
    let yCooContainer = document.querySelector('#coordinates-container #y-pos');
    xCooContainer.innerHTML = `X: ${Math.floor(playerTilePos.x)}`;
    yCooContainer.innerHTML = `Y: ${Math.floor(playerTilePos.y)}`;
}

const toggleGridLayer = () => {
    showGrid = !showGrid;
}
const toggleBoundaryLayer = () => {
    showBoundary = !showBoundary;
}

const validateMove = (position, key) => {
    // position.y += .5;
    // position.x -= .5;
    if(key === 'right') {
        position.x = Math.floor(position.x + 1);
    } else if(key === 'left') {
        position.x = Math.floor(position.x);
    }
    if(key === 'up') {
        position.y = Math.floor(position.y);
    } else if(key === 'down') {
        position.y = Math.floor(position.y + 1);
    }
    console.log(position);
    let collidedBoundary = collisionsMap[parseInt(position.y)][parseInt(position.x)];
    return collidedBoundary === 0;
}
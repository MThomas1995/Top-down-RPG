// Set keys pressed
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

// Check for key press on player movement
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
            keys.space.pressed = true;
            lastKey = ' ';
            console.log(gridSquares);
            break;
        }
});

// Check for key release on player movement
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
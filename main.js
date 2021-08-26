const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let userWin = false;
let userOutOfBounds = false;
let userInHole = false;

function checkMove(field, position) {
        if (field[0].length - 1 > position[0] >= 0 && field.length - 1 > position[1] >= 0) {
            if (field[position[0]][position[1]] == hole) {
                userInHole = true;
            }
            else if (field[position[0]][position[1]] == hat) {
                userWin = true;
            }
            else {
                field[position[0]][position[1]] = pathCharacter;
            }
        }
        else {
            userOutOfBounds = true;
        }
    }

class Field {
    constructor(fieldArray) {
        this.field = fieldArray;
        this.position = [0, 0];
        this.win = false;
        this.hole = false;
    }
    
    print() {
        for (let i=0; i < this.field.length; i++) {
            console.log(this.field[i]);
        }
    }

    moveUp() {
        if (this.position[0] === 0) {
            throw Error('You went out of bounds.');
        }
        const y = this.position[0] - 1;
        const x = this.position[1];
        this.position = [y, x];
        checkMove(this.field, this.position);
    }

    moveDown() {
        if (this.position[0] === this.field.length - 1) {
            throw Error('You went out of bounds.');
        }
        const y = this.position[0] + 1;
        const x = this.position[1];
        this.position = [y, x];
        checkMove(this.field, this.position);
    }

    moveRight() {
        if (this.position[1] === this.field[0].length - 1) {
            throw Error('You went out of bounds.');
        }
        const y = this.position[0];
        const x = this.position[1] + 1;
        this.position = [y, x];
        checkMove(this.field, this.position);
    }

    moveLeft() {
        if (this.position[1] === 0) {
            throw Error('You went out of bounds.');
        }
        const y = this.position[0];
        const x = this.position[1] - 1;
        this.position = [y, x];
        checkMove(this.field, this.position);
    }

    checkMove() {
        if (this.field[this.position[0]][this.position[1]] == hole) {
                this.hole = true;
        }
        else if (this.field[this.position[0]][this.position[1]] == hat) {
                this.win = true;
        }
        else {
                this.field[this.position[0]][this.position[1]] = pathCharacter;
        }
    }

    static generateField() {

    }
}

function main() {
    const myField = new Field([
        ['*', '░', 'O'],
        ['░', 'O', '░'],
        ['░', '^', '░']
      ]);
    while (!myField.win || !myField.hole) {
        myField.print();
        let direction = prompt('Which direction would you like to go? ');
        direction.trim().toLowerCase();

        switch (direction) {
            case 'up':
                myField.moveUp();
                break;
            case 'down':
                myField.moveDown();
                break;
            case 'left':
                myField.moveLeft();
                break;
            case 'right':
                myField.moveRight();
                break;
            default:
                console.log('Enter a valid direction.');
        }
        myField.checkMove();
    }

    if (myField.win) {
        console.log('You found your hat!');
    }
    else if (myField.hole) {
        console.log('You fell in a hole.');
    }
    else {
        console.log('Why are you here?');
    }
}

main();
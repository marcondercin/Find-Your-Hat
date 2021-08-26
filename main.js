const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let userWin = false;
let userOutOfBounds = false;
let userInHole = false;

function checkMove(field, position) {
        if (field[0].length > position[0] >= 0 && field.length > position[1] >= 0) {
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
        const y = this.position[0] + 1;
        const x = this.position[1];
        this.position = [y, x];
        checkMove(this.field, this.position);
    }

    moveRight() {
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

    static generateField() {

    }
}

function main() {
    const myField = new Field([
        ['*', '░', 'O'],
        ['░', 'O', '░'],
        ['░', '^', '░']
      ]);
    while (!userWin || !userOutOfBounds || !userInHole) {
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
    }

    if (userWin) {
        console.log('You found your hat!');
    }
    else if (userOutOfBounds) {
        console.log('You went out of bounds.');
    }
    else if (userInHole) {
        console.log('You fell in a hole.');
    }
    else {
        console.log('Why are you here?');
    }
}

main();
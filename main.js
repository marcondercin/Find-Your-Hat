const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

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
    }

    moveDown() {
        if (this.position[0] === this.field.length - 1) {
            throw Error('You went out of bounds.');
        }
        const y = this.position[0] + 1;
        const x = this.position[1];
        this.position = [y, x];
    }

    moveRight() {
        if (this.position[1] === this.field[0].length - 1) {
            throw Error('You went out of bounds.');
        }
        const y = this.position[0];
        const x = this.position[1] + 1;
        this.position = [y, x];
    }

    moveLeft() {
        if (this.position[1] === 0) {
            throw Error('You went out of bounds.');
        }
        const y = this.position[0];
        const x = this.position[1] - 1;
        this.position = [y, x];
    }

    checkMove() {
        if (this.field[this.position[0]][this.position[1]] === hole) {
                this.hole = true;
        }
        else if (this.field[this.position[0]][this.position[1]] === hat) {
                this.win = true;
        }
        else {
                this.field[this.position[0]][this.position[1]] = pathCharacter;
        }
    }

    static generateField(x, y) {
        let newField = [];
        let tempArray = [];
        let isHat = false;
        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                let num = Math.floor(Math.random() * 10);
                if (i === 0 && j === 0) {
                    tempArray.push(pathCharacter);
                }
                else {
                    if (num >= 7) {
                        tempArray.push(hole);
                    }
                    else {
                        tempArray.push(fieldCharacter);
                    }
                }
            }
            newField.push(tempArray);
            tempArray = [];
        }
        while (!isHat) {
            let index_x = Math.floor(Math.random() * x);
            let index_y = Math.floor(Math.random() * y);
            if (newField[index_y][index_x] === fieldCharacter) {
                newField[index_y][index_x] = hat;
                isHat = true;
            }
        }
        return newField;
    }
}

function main() {
    const field = Field.generateField(5, 5);
    const myField = new Field(field);
    while (!myField.win && !myField.hole) {
        myField.print();
        let direction = prompt('Which direction would you like to go? ').trim().toLowerCase();

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
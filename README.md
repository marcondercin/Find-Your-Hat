# Find Your Hat

This is a simple terminal game that takes user input in the form of a direction to find an object (hat) in a maze-like map with traps. It consists of a player character (\*), holes (O), and a hat (^). You must give directions either up, down, left or right to navigate around the holes and reach your hat.

## Running the game

To run the game you will need to have node installed.
Navigate to the repository folder in a terminal window and run `node main.js`.

## Directions

When you start the game a random 5x5 map will be displayed. It is not always solvable. The main game loop is as follows:
- Display the map
- Ask for direction input
- Update map based on input
- If you go outside the map or fall in a hole, the game closes
- Show the path the character has taken with player characters (\*)

## About
This is a program to help demonstrate knowledge of classes in JavaScript. The main character is a class instance and the directions are methods. There is also a static method for creating a map of a specified width and height. In the game, it's called at the beginning to generate the map, although the width and height are specified at (5,5).

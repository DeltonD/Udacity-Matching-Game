# Memory Game Project

## Summary

* [Project description](#description)
* [Code explained](#explaining)

## Description

The game consists on a table of shuffled cards and flipped down, each card has a pair. The player has to pick one card and then its pair.
If he got the wrong combination, the cards are flipped down again. If right, the cards stay facing up.

There is a timer, move counter and a star rating.
On each ten moves, one star is decreased from the rating.

## Explaining

The code stores a array with all the cards, including its pairs.
On the game start the array is shuffled, to provide a different experience on each game.
The shuffled array is used to create the cards on the page, assigning different icons for each pair.

When the player clicks on a card, a refference to the card is saved on a variable, and if he clicks again the code can check if there is a combination.
When there are exact 8 combinations, the player wins and a popup is showed.
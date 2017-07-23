# WDI-Gizmo Eric Chance Project 1
---
Title: Straight to Power, light version.
Author: echance
Version: Original Game, this is the mvp version.
Tested on: Chrome ver. 59.0.3071.115 (Official Build) (64-bit), Windows 7
Created using:
[Atom ver. 1.18.0](https://atom.io/)
javascript
[jquery 3.](https://code.jquery.com/)
---


##Objective
Build 3 complete straights before your opponent.
If both complete their 3 straights in the same round, winner also has highest score.

##Setup
Each player begins with their own deck of cards.
- There are no suits in this MVP version, so a player has four sets of identical cards in their deck.
One "A" card is removed from each player's deck and is placed in each player's play area, the middle section of the board.
The top of the board contains instructions to the player, as well as two buttons:
- `discard`: user clicks this before each card discarded, it will light up red
- `end turn`: turns the board over to the opposing player

##GAMEPLAY
###Round
-A round consists of 1 turn by Player 1 and 1 turn by Player 2

###TURN
####draw
The initial draw of 3 cards (automatic) at the start of each turn
- yields `+3` points.
At any time, a player may opt for a second additional draw of 3 cards in a round.
- by clicking the `DRAW` deck at the right of the screen.
- BUT they will only receive `+1` point for this second draw.
####discard
Maximum cards in the hand is 7
- a player must `discard` down to 7 before they may click `end turn`
- each completed `discard` yields `-1` points.
####shop
All discarded cards go to the `SHOP`,
- a deck appearing just above the `DRAW` deck after first discard.
- a player receives a `-5` point debt to buy a RANDOM card from the `SHOP`
- bought cards are added directly to the hand
####end turn
If a player has less than 8 cards, click `end turn`
- to turn the board over to the other player
- if this is at the end of Player 2's turn, it will begin a new round
####win or lose
If one or both players have completed 3 straights by the END of a round the winner is
- the player wins who completed all 3 (if the other did not)
- or the player wins who has the highest score (if both won)

---

#####Things to fix:
-discard cannot be toggled off if user changed their mind
-blank cards are dealt from the deck at the end.
-player should lose if no more deck, and not enough points to buy cards, and no more cards to play

#####side note:
After completion, I lost 2 lost games, figured out what I thought was a good strategy, and won
- (against myself) in 16 rounds.

Spoilers:
- greater risk to end game by taking early extra draws, but better chance of finishing first
- more points in late game when you need them, if you avoid extra draw.
- if you have to discard, discard highest cards and buy them back at the end when store is full of only high cards.

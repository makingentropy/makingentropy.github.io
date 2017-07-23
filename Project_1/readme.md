# WDI-Gizmo Eric Chance Project 1
---
Title: Straight to Power, light version.
---
Author: echance <br>
Version: Original Game, this is the mvp version. <br>
Tested on: Chrome ver. 59.0.3071.115 (Official Build) (64-bit), Windows 7 <br>
Created using: <br>
[Atom ver. 1.18.0](https://atom.io/) <br>
javascript <br>
[jquery 3.](https://code.jquery.com/) <br>

[game live link](https://makingentropy.github.io/Project_1/)

## ♣♣♣ Game Objective ♣♣♣
Build 3 complete straights (from A to K) before your opponent.
If both players complete their 3 straights in the same round, winner also has highest score.

## ♠♠♠ Setup ♠♠♠
Each player begins with their own deck of cards.
- There are no suits in this MVP version, so a player has four sets of identical cards in their deck.
One "A" card is removed from each player's deck and is placed in each player's play area, the middle section of the board.
The top of the board contains instructions to the player, as well as two buttons:
- `discard`: user clicks this before each card discarded, it will light up red
- `end turn`: turns the board over to the opposing player

## ♥♥♥ GAMEPLAY ♥♥♥
### ♦ Round ♦
-A round consists of 1 turn by Player 1 and 1 turn by Player 2

### ♦ Turn ♦
#### draw
The initial draw of 3 cards (automatic) at the start of each turn
- yields `+3` points.
At any time, a player may opt for a second additional draw of 3 cards in a round.
- by clicking the `DRAW` deck at the right of the screen.
- BUT they will only receive `+1` point for this second draw.
#### play a card
Straights must work sequentially up from Ace, eg. "A,2,3,4..."
Only the first and last cards of a straight are viewable.
To play a card, click a card in your hand
- arrows appears under cards in the play area, under valid targets
- click the arrow to move the card out of your hand, to the designated area.
#### discard
Maximum cards in the hand is 7
- a player must `discard` down to 7 before they may click `end turn`
- each completed `discard` yields `-1` points.
#### shop
All discarded cards go to the `SHOP`,
- a deck appearing just above the `DRAW` deck after first discard.
- a player receives a `-5` point debt to buy a RANDOM card from the `SHOP`
- bought cards are added directly to the hand
#### end turn
If a player has less than 8 cards, click `end turn`
- to turn the board over to the other player
- if this is at the end of Player 2's turn, it will begin a new round

### ♦ Win or Lose ♦
If one or both players have completed 3 straights by the END of a round the winner is
- the player wins who completed all 3 (if the other did not)
- or the player wins who has the highest score (if both won)

---
---
<br>
---

##### Things to fix:
-discard cannot be toggled off if user changed their mind
-blank cards are dealt from the deck at the end.
-player should lose if no more deck, and not enough points to buy cards, and no more cards to play

##### side notes:
After completion, I lost 2 lost games, figured out what I thought was a good strategy, and won
- (against myself) in 16 rounds.

##### spoilers:
- greater risk to end game by taking early extra draws, but better chance of finishing first
- more points in late game when you need them, if you avoid extra draw.
- if you have to discard, discard highest cards and buy them back at the end when store is full of only high cards.
---

## DESIGN NOTES FOR PROJECT ONE


I structured my app.js for personal readability and ease of use, though I gave up in the `FUNCTIONS` section at some point in the interest of speed (and I think it shows in that another coder coming into it might be somewhat befuddled). There are at least a couple of functions in that section that should be moved to `HELPER FUNCTIONS`, and I might could break down some of the other functions.

Ideally, I think I should want all the big drivers of the action grouped at the top and then work my way down to secondary and tertiary function groups so that I can easily navigate my script. This idealized structure broke down somewhat as I started cowboy coding against time, but I held the idea together enough to finish without too much headache. However, I would want to restructure to be a little more strict if this was a few hundred lines longer.

CODE FORMAT:
---
`ONLOAD START`<br>

`DEBUG FUNCTION`<br>
- this script is just a quick way to both console.log and turn them all off with one variable rather than hunting down all the ones I didn't erase or comment out
- I like to print to console A LOT when working. A LOT. Even when I don't strictly need to (this saves me from myself 9 times out of 10). Ideally, I think the function name should have one or two keystrokes. I will probably experiment in next big project with a series of d#() functions, where # is a number, allowing me to toggle off sections of console logs rather than using one to control them all. Using just one meant I still had to delete and comment some out by hand when the log became too verbose (time waste!).<br>

`FUNCTIONS`<br>
- the primary functions<br>

`HELPER FUNCTIONS`<br>
- functions that don't drive the game but are necessary
- I did a little digging and found that the Fisher-Yates shuffle function is supposed to be more truly randomized than many other methods, so I copied this algorithm and commented in a link to the source<br>

`Global variables`<br>
- easily accessible variables, including player objects <br>

`CSS`<br>
- all CSS used in-game is objectified here and referenced elsewhere by object name for styling everything. This seemed more sensible for workflow to me than switching between files<br>

`GAME calls`<br>
- the initiating calls and logic that keeps the game moving and repeating
- this includes a timer that functions as a loop <br>

`ONLOAD END`<br>

---
## additional design notes
I tried to structure app.js with the idea that all the action was just taking place between arrays and variables stored in player objects. The graphical elements just served to visualize this, so I tried to stay away from relying on data stored in divs to govern any part of the game.  This allowed me to put most of my div creation functionality (including all the senior-level ancestors) in a single function (initBoard). Therefore, rather than moving divs around, I could simply discard the board after every play and rebuild it instantly based on the new values in the player objects. I believe this saved me a lot of headache- the main hurdle was getting all the logic working. However, I did not overthink the initial design because I thought what needed to happen seemed straightforward and that means there are areas that could be broken down better and put into a more navigable order along the lines of my tiered layout. There is plenty of room to streamline the code for readability.

## tangential journeys
At one point I sought to construct a function that would operate with a set of different rules dependent upon how many arguments I fed it (a la how text() can either input or return depending how you use it). This led me to find the `arguments` javascript object. I was excited but then couldn't get it to work. It wasn't until the next day, when I had already shifted my approach, that I revisted the topic on a call with another student and realized that the arrow style is what's breaking it. What is functionally different under the hood between:
```const foo=()=>{
  doing stuff with arguments[n] but broken
}
```
and
```function foo(){
  arguments[n] sweet spot
}
```
??
I really liked the breakdown Thom did in class of the difference between var and let (how var bleeds out of for loop declarations).  I would like to see a similarly thorough explanation for `function` vs `=()=>`

## pointless gripes into the ether
I really, with a passion, despise implicit datatypes. It's asinine to be beholden to handling data strictly on the coder side but then have it be handled not-so-strictly on the code side. C'mon, javascript, at least give us an indexOf() that can be used with a little loose equivalence if we choose to sync with your capricious nature.

Related Q: Is there shorthand in javascript to quickly typecast (like say between float, string, int) or are there only methods, like parseInt()?

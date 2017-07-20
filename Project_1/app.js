$(()=>{
//  ///////////////////////////////
/////////////////////////////// GLOBAL DEBUG:
const dbg=(s)=>{if(true){console.log(s);}} //set to false to hide debug logs
    // dbg("test");

//  ///////////////////////////////
/////////////////////////////// GLOBAL FUNCTIONS:
const initBoard=()=>{
    let $board=$("<div>").attr("id","board").css(cssBoard).appendTo("body");
    let $handHolder=$("<div>").attr("id","handholder").css(cssHandHolder).appendTo($board);
    let $playholder=$("<div>").attr("id","playholder").css(cssPlayHolder).appendTo($board);
  }
const rCreateDeckArr=()=>{
  let arr=[];
  for(i=1;i<=13;i++){
    if(notRoyal(i)){arr.push(i);}
    else{arr.push(royals[i]);}
  }
  return arr;
}
const draw=(deck,hand,totalNumCards)=>{
  let r;
  for (let i = 1; i <=totalNumCards; i++) {
    r=randInt(deck.length-1,0);
    hand.push(deck[r]);
    deck.splice(r,1); //remove card from deck
  }
}
const divHandMaker=(hand)=>{ //
  for (var i = 0; i < hand.length; i++) {
    const card=$("<div/>").addClass(".cards").css(cssCard);
      $(card).text(hand[i]);
    card.appendTo($("#handholder"));
      card.on("click",(e)=>{
        clickedInHand(card);
    })
  }
}
const playHolderMaker=(hand)=>{ //
  for (var i = 0; i <3; )
  for (var i = 0; i < hand.length; i++) {
    const card=$("<div/>").addClass(".cards").css(cssCard);
      $(card).text(hand[i]);
    card.appendTo($("#handholder"));
      card.on("click",(e)=>{
        clickedInHand(card);
    })
  }
}
const clickedInHand=(card, hand)=>{
  dbg("clickedInHand, card: "+card.text());
  assessIfPlayable(whoseTurnIsIt,card.text());
}
const turn=(player)=>{
  draw(player.deck,player.hand,3);
  divHandMaker(player.hand);

  dbg("Player: "+player.name);
  dbg("Player: "+player.deck);
  dbg("Player: "+player.hand);
}
const assessIfPlayable=(whoseTurn,whatCard)=>{
  let playableArr=-1;
  if (whoseTurn==1){ //player1
    playableArr=assessIfPlayable_search(player1,whatCard);
    dbg("playableArr: "+playableArr);
  }
  else { //player2
    playableArr=assessIfPlayable_search(player2,whatCard);
    dbg("playableArr: "+playableArr);
  }
}
const assessIfPlayable_search=(player,whatCard)=>{ //return usable array i, else -1
  let arrLength=0;
  let lastCard="";
  for (var i = 0; i < player.inplay.length; i++) {
    arrLength=player.inplay[i].length; //only need to check first & last cards of straights
    if(arrLength==0&&whatCard=="A") //wrote if anticipating bug, arrLength-1 if arrLength==0
    {
      return i;
    }
    lastCardVal=player.inplay[i][arrLength-1]; dbg("lastCard: "+lastCard);
    if(lastCardVal+1==cardValueArr[whatCard])
    {
      return i;
    }
  }//end of for
  dbg("------------------");
  return false;
}
/////////////////////////////// HELPER FUNC:
      const notRoyal=(n)=>{ //preserving brain power when tired
        if(n>1&&n<11){return true;}
        else{return false;}
      }
      const randInt=(max, min)=>{
        return Math.floor(Math.random()*(max-min+1))+min;
      }
      const fisherYatesShuffle=(array)=>{
        //source: https://www.frankmitchell.org/2015/01/fisher-yates/
        let i = 0;
        let j = 0;
        let temp = null;

        for (i = array.length - 1; i > 0; i -= 1) {
          j = Math.floor(Math.random() * (i + 1));
          temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }

//  ///////////////////////////////
/////////////////////////////// GLOBAL VARIABLES:
  let deck1=[];
  let deck2=[];
  const royals={
    A:1,   1:"A",
    J:11, 11:"J",
    Q:12, 12:"Q",
    K:13, 13:"K"
  }
  const cardValueArr={ //simplifies search equations
    A:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10,
    J:11, Q:12, K:13
  }
  let hand1=[];
  let hand2=[];
  let player1={
    name:"Player 1",
    inplay:[["A"],[],[]],
    hand:[],
    deck:[]
  };
  let player2={
    name:"Player 2",
    inplay:[["A"],[],[]],
    hand:[],
    deck:[]
  };
  let isGameOn=true;
  let whoseTurnIsIt=1;

/////////////////////////////// CSS:
  let cssBoard={ //#board
    "display":"flex-inline",
    "background-color":"#002200",
    "height":"500px",
    "width":"550px"
  }
  let cssHandHolder={ //#handholder
    "display":"flex",
    "align-items": "center",
    "justify-content": "center",
    "background-color":"#C04000",
    "height":"25%",
    "widith":"80%",
    "border":"5px solid #A02000"
  }
  let cssPlayHolder={ //#handholder
    "display":"flex",
    "align-items": "center",
    "justify-content": "center",
    "background-color":"#501000",
    "height":"25%",
    "widith":"80%",
    "border":"5px solid #A02000"
  }
  let cssCard={ //.cards
    "background-color":"white",
    "font-size":"2.5em",
    "height":"100px",
    "width":"60px",
    "border-radius":"10%",
    "border":"3px solid #87C7A5",
    "text-align":"center",
    "line-height":"100px",
    "vertical-align":"middle",
  }

//  ///////////////////////////////
/////////////////////////////// TESTING:
// dbg(royals.Q); dbg(royals[12]);

//  ///////////////////////////////
/////////////////////////////// GAMEPLAY:
initBoard();
player1.deck=rCreateDeckArr(); //dbg(deck1);
player2.deck=rCreateDeckArr(); //dbg(deck2);

// while(isGameOn){
  whoseTurnIsIt=1;
  turn(player1);
// }




})//EOF
//  ///////////////////////////////
//  ///////////////////////////////
//  ///////////////////////////////

$(()=>{
//  ///////////////////////////////
/////////////////////////////// GLOBAL DEBUG:
const dbg=(s)=>{if(true){ //console.trace();
  console.log(" | "+s);}} //set to false to hide debug logs
    // dbg("test");

//  ///////////////////////////////
/////////////////////////////// GLOBAL FUNCTIONS:
const initBoard=()=>{
    let $board=$("<div>").attr("id","board").css(cssBoard).appendTo("body");
    let $game2user=$("<div>").attr("id","game2user").css(cssGame2User).appendTo($board);
    let $playholder=$("<div>").attr("id","playholder").css(cssPlayHolder).appendTo($board);
    let $handHolder=$("<div>").attr("id","handholder").css(cssHandHolder).appendTo($board);

    for (let i = 0; i < 3; i++) {
      let $handHolder=$("<div>").addClass(".cardSlot").attr("id","cardSlot"+i).css(cssCardSlot).appendTo($("#playholder"));
    }
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
    });
  }
}
const divInPlayMaker=(whatPlayer)=>{ //
  let arrLength=0;
  let card;
  let appendLocation="";
  for (var i = 0; i <3; i++){ //only 3 inPlay arrays
    for (var ii = 0; ii < 2; ii++) { //only display first and last (top) card
      arrLength=whatPlayer.inplay[i].length; dbg("51.arrLength: "+arrLength);
      if(arrLength!==0){
        if (ii==0){//bottom card
          card=$("<div/>").addClass(".cards").css(cssCard);
          $(card).text(whatPlayer.inplay[i][ii]); dbg("55.whatPlayer.inplay[i][ii]: "+whatPlayer.inplay[i][ii]);
          appendLocation="#cardSlot"+i;
          card.appendTo($(appendLocation)); dbg("57.appendLocation: "+appendLocation);
            card.on("click",(e)=>{
              clickedInPlay();
            });
        }
        else if(ii>0){//topcard //card displays as both top and bottom w/o check
          card=$("<div/>").addClass(".cardsTop").css(cssCardTOP);
          $(card).text(whatPlayer.inplay[i][arrLength-1]); //last card
          appendLocation="#cardSlot"+i; dbg("65.appendLocation: "+appendLocation);
          card.appendTo($(appendLocation));
            card.on("click",(e)=>{
              clickedInPlay();
            });
        }
      }
    }//end inner for
  }//end outer for
}
const clickedInHand=(card, hand)=>{
  dbg("clickedInHand, card: "+card.text());
  assessIfPlayable(whoseTurnIsIt,card.text());
}
const clickedInPlay=()=>{
  dbg("clickedInPlay");
}
const turn=(player)=>{
  draw(player.deck,player.hand,3);
  divHandMaker(player.hand);
  divInPlayMaker(player);

  dbg("Player: "+player.name);
  dbg("Player: "+player.deck);
  dbg("Player: "+player.hand);
}
const assessIfPlayable=(whoseTurn,whatCard)=>{
  let playableArr=-1;
  if (whoseTurn==1){ //player1
    playableArr=assessIfPlayable_search(player1,whatCard);
    dbg("playableArr: "+playableArr);

    // if(playableArr)
    $("#game2user").text(playableArr);
  }
  else { //player2
    playableArr=assessIfPlayable_search(player2,whatCard);
    dbg("playableArr: "+playableArr);
    $("#game2user").text(playableArr);
  }
}
const assessIfPlayable_search=(player,whatCard)=>{ //returns list of playable arrays i, else -1
  let arrLength=0;
  let valLastCardOfStack="";
  let listPlayableArrays=[];
  for (var i = 0; i < player.inplay.length; i++) {
    arrLength=player.inplay[i].length; //only need to check first & last cards of straights
    // dbg("105.player.inplay: "+player.inplay);
    // dbg("106.arrLength: "+arrLength);
    if(arrLength==0&&whatCard=="A") //wrote if anticipating bug, arrLength-1 if arrLength==0
    {
      listPlayableArrays.push(i);
    }

    valLastCardOfStack=player.inplay[i][arrLength-1];
    dbg("113.valLastCardOfStack: "+valLastCardOfStack);
    valLastCardOfStack=cardValueArr[valLastCardOfStack];
    dbg("111.valLastCardOfStack: "+valLastCardOfStack);
    if(valLastCardOfStack+1==cardValueArr[whatCard])
    {
      listPlayableArrays.push(i);
    }
  }//end of for
  dbg("------------------");
  if(listPlayableArrays.length>0) //we have playable arrays
  {
    return listPlayableArrays;
  }
  else{
    listPlayableArrays.push(-1); //nothing is playable
    return listPlayableArrays;
  }
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
    inplay:[["A","2"],[],[]], //------NOTE: this was initialized with A for testing,
    hand:[],              //we want them to actually choose the A they get to start
    deck:[]               //with once suits are implemented
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
  let cssGame2User={ //#game2user
    "display":"flex",
    "color":"#87C7A5",
    "align-items": "center",
    "justify-content": "center",
    "background-color":"#002200",
    "height":"240px",
    "widith":"400px",
    "border-radius":"5%",
    "border":"3px solid #87C7A5",
    "margin":"0px 10px 10px 10px"
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
    "vertical-align":"middle"
  }
  let cssCardTOP={ //.cardsTop
    "background-color":"white",
    "font-size":"2.5em",
    "height":"100px",
    "width":"60px",
    "margin":"-15px 0 0 -25px",
    "border-radius":"10%",
    "border":"3px solid #87C7A5",
    "text-align":"center",
    "line-height":"100px",
    "vertical-align":"middle"
  }
  let cssCardSlot={ //.cardsSlot
    // "background-color":"white",
    "display":"flex",
    "height":"110px",
    "width":"100px",
    "border-radius":"10%",
    "border":"3px solid #A02000",
    "line-height":"100px",
    "vertical-align":"middle",
    "margin":"0 70px 0 -20px"
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

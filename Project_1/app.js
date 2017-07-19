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
  dbg(hand);
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
  let hand1=[];
  let hand2=[];

/////////////////////////////// CSS:
  let cssBoard={ //#board
    "display":"flex-inline",
    "background-color":"#002200",
    "height":"500px",
    "width":"500px"
  }
  let cssHandHolder={ //#handholder
    "display":"flex",
    "align-items": "center",
    "justify-content": "center",
    "background-color":"#C04000",
    "height":"120px",
    "widith":"300px",
    "border":"5px solid #A02000"
  }
  let cssCard={ //.cards
    "background-color":"white",
    "font-size":"2.5em",
    "height":"100px",
    "width":"60px",
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
deck1=rCreateDeckArr(); //dbg(deck1);
deck2=rCreateDeckArr(); //dbg(deck2);
draw(deck1,hand1,3);
divHandMaker(hand1);



})//EOF
//  ///////////////////////////////
//  ///////////////////////////////
//  ///////////////////////////////

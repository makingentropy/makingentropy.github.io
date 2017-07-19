$(()=>{
//  ///////////////////////////////
/////////////////////////////// GLOBAL DEBUG:
const dbg=(s)=>{if(true){console.log(s);}} //set to false to hide debug logs
    // dbg("test");

//  ///////////////////////////////
/////////////////////////////// GLOBAL FUNCTIONS:
const initBoard=()=>{
    let $board=$("<div>").text("player 1").css(cssBoard).appendTo("body");
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
  let cssBoard={
    "display":"flex-inline",
    "background-color":"black",
    "height":"500px",
    "width":"500px"
  }
//  ///////////////////////////////
/////////////////////////////// TESTING:
// dbg(royals.Q); dbg(royals[12]);

//  ///////////////////////////////
/////////////////////////////// GAMEPLAY:
  initBoard();
deck1=rCreateDeckArr(); //dbg(deck1);
deck2=rCreateDeckArr(); //dbg(deck2);



})//EOF
//  ///////////////////////////////
//  ///////////////////////////////
//  ///////////////////////////////

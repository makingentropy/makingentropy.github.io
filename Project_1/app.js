$(()=>{
//  ///////////////////////////////
/////////////////////////////// GLOBAL DEBUG:
const dbg=(s)=>{if(true){ //set to false to hide debug logs
  console.log(" | "+s);}
}
    // dbg("test");

//  ///////////////////////////////
/////////////////////////////// GLOBAL FUNCTIONS:
const initBoard=(player)=>{
    let $board=$("<div>").attr("id","board").css(cssBoard).appendTo("body");
    let $game2user=$("<div>").attr("id","game2user").css(cssGame2User).appendTo($board);
    let $game2userText=$("<div>").attr("id","game2userText").css(cssGame2UserText).appendTo($game2user);
    let $playholder=$("<div>").attr("id","playholder").css(cssPlayHolder).appendTo($board);
    let $handHolder=$("<div>").attr("id","handholder").css(cssHandHolder).appendTo($board);
    let $rounds=$("<div>").attr("id","rounds").css(cssRounds).text("round: "+round).appendTo($board);
    let $points=$("<div>").attr("id","points").text("points: "+player.points).css(cssPoints).appendTo($board);
    let $discards=$("<div>").attr("id","discards").text("discard count: "+player.discarded.length).css(cssDiscardCounter).appendTo($board);
    if(player.discarded.length>0){
      const $shopPile=$("<div>").attr("id","shopPile").css(cssShopPile).appendTo($("#board"));
      $shopPile.append("S<br>H<br>O<br>P").on("click",()=>{
        dbg(" ♦ shop clicked ♦ ");
        buyCardBack(player);
      });
    }
    for (let i = 0; i < 3; i++) {
      let $handHolder=$("<div>").addClass("cardSlot").attr("id","cardSlot"+i).css(cssCardSlot).appendTo($("#playholder"));
    }
  }
const rCreateDeckArr=()=>{
  let arr=[];
  for (let ii=0;ii<4;ii++){
    for(let i=1;i<=13;i++){
      if(notRoyal(i)){arr.push(i);}
      else{arr.push(royals[i]);}
    }
  }
  arr.splice(0,1); //remove the first A since we are giving them one to start
  return arr;
}
const draw=(deck,hand,totalNumCards)=>{
  let r;
  for (let i = 1; i <=totalNumCards; i++) {
    r=randInt(deck.length-1,0);
    hand.push(deck[r]);
    deck.splice(r,1); //remove card from deck
  }
  hasDrawn++;
}
const divHandMaker=(hand)=>{ //
  for (var i = 0; i < hand.length; i++) {
    const card=$("<div/>").addClass("cards").css(cssCard);
      $(card).text(hand[i]);
    card.appendTo($("#handholder"));
      card.on("click",(e)=>{
        clickedInHand(card);
    });
  }
}
const divInPlayMaker=(whatPlayer)=>{ //
  let arrLength=0;
  let appendLocation="";
  for (var i = 0; i <3; i++){ //only 3 inPlay arrays
    for (var ii = 0; ii < 2; ii++) { //only display first and last (top) card
      arrLength=whatPlayer.inplay[i].length; //dbg("51.arrLength: "+arrLength); dbg("baroo: "+whatPlayer.inplay[i]);
      if(arrLength!==0){
        if (ii==0){//bottom card
          const card=$("<div/>").addClass("cards").css(cssCard);
          $(card).text(whatPlayer.inplay[i][ii]); //dbg("55.whatPlayer.inplay[i][ii]: "+whatPlayer.inplay[i][ii]);
          appendLocation="#cardSlot"+i;
          card.appendTo($(appendLocation)); //dbg("57.appendLocation: "+appendLocation);
            card.on("click",(e)=>{
              clickedInPlay();
            });
        }
        else if(ii>0 && arrLength>1){//topcard //card displays as both top and bottom w/o check
          const card=$("<div/>").addClass("cardsTop").css(cssCardTOP);
          $(card).text(whatPlayer.inplay[i][arrLength-1]); //last card
          appendLocation="#cardSlot"+i; //dbg("65.appendLocation: "+appendLocation);
          card.appendTo($(appendLocation));
            card.on("click",(e)=>{
              clickedInPlay(card);
            });
        }
      }
    }//end inner for
  }//end outer for
}
const clickedInHand=(card)=>{
  if(isDiscarding==true){ //remove cards clicked
    const properDataText=typecastHotfix(card.text());
    console.log("84."+properDataText+" "+typeof(properDataText));
    if(whoseTurnIsIt==1){ //player 1
      const indx=player1.hand.indexOf(properDataText);
      player1.discarded.push(player1.hand[indx]); //---------added to discard pile
      $("#discards").text("discard count: "+player1.discarded.length);
          dbg("discarded:"+player1.discarded);
      player1.hand.splice(indx,1); dbg("84."+player1.hand);//removed from hand
      player1.points--; dbg("P1 pts: "+player1.points);
      $("#points").text("points: "+player1.points); //--------update points
      refresh(player1);
    }
    else{ //player 2
      const indx=player2.hand.indexOf(properDataText);
      player2.discarded.push(player2.hand[indx]); //---------added to discard pile
      $("#discards").text("discard count: "+player2.discarded.length);
          dbg("discarded:"+player2.discarded);
      player2.hand.splice(indx,1); dbg("84."+player2.hand);//removed from hand
      player2.points--; dbg("P2 pts: "+player2.points);
      $("#points").text("points: "+player2.points); //--------update points
      refresh(player2);
    }
  }
  else{
    removeSelectors();
    assessIfPlayable(whoseTurnIsIt,card.text());
  }
}
const removeSelectors=()=>{
  $('.selector').remove(); dbg("--------in removeSelectors");
}
const clickedInPlay=()=>{
  dbg("clickedInPlay");
}
const turn=(player)=>{
  isDiscarding=false; //--we want user to click discard every time they want to discard
  if(hasDrawn==0){ //we only want autodraw at start of turn
    if(player.deck.length>=3){
      draw(player.deck,player.hand,3);
    }
    else{
      draw(player.deck,player.hand,player.deck.length);
    }
    player.points+=earnFirstDraw; dbg("Player pts: "+player.points); //get pts for drawing
    $("#points").text("points: "+player.points); //--------update points
  }
  divHandMaker(player.hand);
  divInPlayMaker(player);
  game2user_print(player);
  if (whoseTurnIsIt==2){
    $("#game2user").css(cssGame2UserPlayer2);
    $("#game2userText").css(cssGame2UserTextPlayer2);
    $("#endTurnBtn").css(cssGame2UserEndTurnP2);
    $("#discardBtn").css(cssGame2UserDiscardP2);
  }
  if(player.deck.length>0)
  {
    const $drawPile=$("<div>").attr("id","drawPile").css(cssDrawPile).appendTo($("#board"));
    $drawPile.append("D<br>R<br>A<br>W").on("click",()=>{
      if(hasDrawn<2){ dbg("101.drawPile");
      if(player.deck.length>=3){
        draw(player.deck,player.hand,3);
      }
      else{
        draw(player.deck,player.hand,player.deck.length);
      }
      player.points+=earnFirstDraw; dbg("Player pts: "+player.points); //get pts for drawing
      $("#points").text("points: "+player.points); //--------update points
        player.points+=earnSecondDraw; dbg("Player pts: "+player.points);
        $("#points").text("points: "+player.points); //--------update points
        dbg("144.player.hand:"+player.hand);
        refresh(player);
      }
    });
  }
  dbg("Player: "+player.name);
  dbg("Player: "+player.deck);
  dbg("Player: "+player.hand);
}
const refresh=(player)=>{
  $("#board").remove();
  initBoard(player);
  turn(player);
}
const assessIfPlayable=(whoseTurn,whatCard)=>{
  let playableArr=-1;
  if (whoseTurn==1){ //player1
    playableArr=assessIfPlayable_search(player1,whatCard);
    dbg("128.playableArr: "+playableArr);
    whenPlayableGiveOptions(playableArr,player1,whatCard);
  }
  else { //player2
    playableArr=assessIfPlayable_search(player2,whatCard);
    dbg("133.playableArr: "+playableArr);
    whenPlayableGiveOptions(playableArr,player2,whatCard);
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
    //dbg("113.valLastCardOfStack: "+valLastCardOfStack);
    valLastCardOfStack=cardValueArr[valLastCardOfStack];
    //dbg("111.valLastCardOfStack: "+valLastCardOfStack);
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
const whenPlayableGiveOptions=(playableArr,player,card)=>{
  //$("#game2user").text(playableArr);
  if(playableArr==-1){
    $("#game2userText").text("That card is not playable now.");
  }
  else{ //give options, make selectors
    $("#game2userText").text("Please click on the arrow that indicates where you'd"+
      " like to place your card.");
    for (var i = 0; i < playableArr.length; i++) {
      const appendLocation="#cardSlot"+playableArr[i];
      const id="selector"+playableArr[i]; //dbg("155.id: "+id);
      const $selector=$("<div>").addClass("selector").attr("id",id).text("▲");
      $selector.appendTo($(appendLocation));
      $selector.on("click",(e)=>{ //dbg("159.id: "+id);
        xferHandCard2Play(id,player,card);
      });
            //dbg("163.playableArr[i]: "+playableArr[i]);
      if(playableArr[i]==0){$selector.css(cssSelector0);}
      else if(playableArr[i]==1){$selector.css(cssSelector1);}
      else if(playableArr[i]==2){$selector.css(cssSelector2);}
    }
  }
}
const xferHandCard2Play=(selectorId,player,card)=>{ dbg("-----xferHandCard2Play--------");
  dbg("169.selector: "+selectorId+" |inplay: "+player.inplay+" |card: "+card);
  card=typecastHotfix(card);
  dbg("172.typeof(card):"+typeof(card));
  let handIndex=player.hand.indexOf(card);
  let slotIndex=selectorId.split("");
  slotIndex=slotIndex[(slotIndex.length-1)];
  slotIndex=parseInt(slotIndex); dbg("172.slotIndex: "+slotIndex);
  if(slotIndex>-1){ //ensure operation excutes once only
      dbg("177.selector: "+selectorId+" |inplay: "+player.inplay+" |card: "+card);
    dbg("178.slotIndex:"+slotIndex+" |handIndex:"+handIndex);
    player.inplay[slotIndex].push(card); //add card to player.inPlay
    player.hand.splice(handIndex,1);//remove card from player.hand
    dbg("183.inplay@slotIndex"+slotIndex+":"+player.inplay[slotIndex]); dbg("183.hand:"+player.hand);

    refresh(player);
    dbg("-----/xfer*--------");
  }
}
const typecastHotfix=(card)=>{
  if(card!="K"&&card!="Q"&&card!="J"&&card!=="A"){
    return parseInt(card);
  }
  else{ return card;}
}
const game2user_print=(player)=>{
  if(hasDrawn<2){
    $("#game2userText").text(player.name+", please make a play, draw more cards, or end turn.");
  }
  else{
    $("#game2userText").text(player.name+", please make a play or end turn.");
  }
  const $endTurnBtn=$("<div>").css(cssGame2UserEndTurn).appendTo("#game2user").text("end turn");
    $endTurnBtn.attr("id","endTurnBtn").on("click",()=>{
      dbg("218.End turn clicked |hand.length:"+player.hand.length);
      if(player.hand.length<8){
        if(whoseTurnIsIt==1){whoseTurnIsIt=2;}
        else{whoseTurnIsIt=1;}
        endTurnClicked=true;//nothing after this line in this () in case timer falls between commands
      }
      else{
        $("#game2userText").text(player.name+", Please discard until you have less than 8 cards.");
      }
    });
  const $discardBtn=$("<div>").css(cssGame2UserDiscard).appendTo("#game2user").text("discard");
  $discardBtn.attr("id","discardBtn").on("click",(e)=>{
    $("#game2userText").text("Carefully click each card you wish to discard. They are gone forever.");
    $("#discardBtn").css(cssDiscardActive);
    isDiscarding=true;
    dbg("222.discard clicked");
  });
}
const buyCardBack=(player)=>{
  if(player.discarded.length>0){
    if(player.points>=buyDiscardPrice){
      player.points-=buyDiscardPrice;
      const indexDiscardedCard=randInt((player.discarded.length-1),0); dbg("indexDiscardedCard: "+indexDiscardedCard);
      dbg("player.discarded[indexDiscardedCard]: "+player.discarded[indexDiscardedCard])
      player.hand.push(player.discarded[indexDiscardedCard]);
      player.discarded.splice(indexDiscardedCard,1);
      dbg("player.hand: "+player.hand);
      refresh(player);
    }
    else{
      dbg("Player hasn't enough points")
    }
  }
  else{
    dbg("player hasn't any discards")
  }
}
const isWinning=()=>{
  const player1won=rTrueIfWon(player1);
  const player2won=rTrueIfWon(player2);
  if(player1won&&player2won){
    const p1MinusP2=player1.points-player2.points;
    if(p1MinusP2>0){
      alert("Player 1 narrowly won with "+p1MinusP2+" points!");
    }
    else if(p1MinusP2<0){
      alert("Player 2 narrowly won with "+(p1MinusP2*(-1))+" points!");
    }
    else{
      alert("A perfect tie!");
    }
  }
  else if(player1won){
    alert("Player 1 won!");
  }
  else if(player2won){
    alert("Player 2 won!");
  }
  else{}//nothing
}
const rTrueIfWon=(player)=>{
  let numCompletions=0;
  for (let i = 0; i < player.inplay.length; i++) {
    dbg(player.name+" length of arr"+i+": "+player.inplay[i].length);
    if(player.inplay[i].length==13){
      numCompletions++;
    }
  }
  dbg("numCompletions: "+numCompletions);
  if(numCompletions==3){
    return true;
  }
  else{
    return false;
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
  // const suits=["♠","♥","♦","♣"];
  // let player1={
  //   name:"Player 1",
  //   inplay:[["A","2","3","4","5","6","7","8","9","10","J","Q","K"],["A","2","3","4","5","6","7","8","9","10","J","Q"],["A","2","3","4","5","6","7","8","9","10","J","Q","K"]],
  //   hand:[],
  //   deck:[],
  //   discarded:[],
  //   points:0
  // };
  // let player2={
  //   name:"Player 2",
  //   inplay:[["A","2","3","4","5","6","7","8","9","10","J","Q","K"],["A","2","3","4","5","6","7","8","9","10","J","Q","K"],["A","2","3","4","5","6","7","8","9","10","J","Q","K"]], //------NOTE: this, and player1, was initialized with
  //   hand:[],              //A for testing, we want them to actually choose the
  //   deck:[],               //A they start with once suits are implemented
  //   discarded:[],
  //   points:4
  // };
  let player1={
    name:"Player 1",
    inplay:[["A"],[],[]],
    hand:[],
    deck:[],
    discarded:[],
    points:0
  };
  let player2={
    name:"Player 2",
    inplay:[["A"],[],[]], //------NOTE: this, and player1, was initialized with
    hand:[],              //A for testing, we want them to actually choose the
    deck:[],               //A they start with once suits are implemented
    discarded:[],
    points:0
  };
  const buyDiscardPrice=5;
  const earnFirstDraw=3;
  const earnSecondDraw=1;
  let isGameOn=true;
  let whoseTurnIsIt=1;
  let endTurnClicked=false;
  let hasDrawn=0; //--------------remember to reset after end of turn, before next
  let isDiscarding=false;
  let round=0;

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
  let cssGame2UserPlayer2={ //#game2user
    "display":"flex",
    "color":"#FFA500",
    "align-items": "center",
    "justify-content": "center",
    "background-color":"#002200",
    "height":"240px",
    "widith":"400px",
    "border-radius":"5%",
    "border":"3px solid #FFA500",
    "margin":"0px 10px 10px 10px"
  }
  let cssGame2UserText={ //#game2user
    "display":"flex",
    "color":"#87C7A5",
    "align-items": "center",
    "justify-content": "center",
    "height":"100px",
    "widith":"400px",
    // "border-radius":"5%",
    // "border":"3px solid #87C7A5",
    "margin":"0px 10px 10px 10px"
  }
  let cssGame2UserTextPlayer2={ //#game2user
    "display":"flex",
    "color":"#FFA500",
    "align-items": "center",
    "justify-content": "center",
    "height":"100px",
    "widith":"400px",
    // "border-radius":"5%",
    // "border":"3px solid #87C7A5",
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
    "vertical-align":"middle",
    "margin":"0 1px 0 1px"
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
  let cssSelector0={
    "background-color":"#002200",
    "position":"absolute",
    "top":"384px",
    "left":"60px",
    "color":"#FFDF00",
    "font-size":"1.5em",
    "height":"20px",
    "width":"40px",
    "border-radius":"10%",
    "border":"3px solid #87C7A5",
    "text-align":"center",
    "line-height":"20px",
    "vertical-align":"middle",
    "margin":"20 0 0 0",
    "z-index":"2"
  }
  let cssSelector1={
    "background-color":"#002200",
    "position":"absolute",
    "top":"384px",
    "left":"215px",
    "color":"#FFDF00",
    "font-size":"1.5em",
    "height":"20px",
    "width":"40px",
    "border-radius":"10%",
    "border":"3px solid #87C7A5",
    "text-align":"center",
    "line-height":"20px",
    "vertical-align":"middle",
    "margin":"20 0 0 0",
    "z-index":"2"
  }
  let cssSelector2={
    "background-color":"#002200",
    "position":"absolute",
    "top":"384px",
    "left":"370px",
    "color":"#FFDF00",
    "font-size":"1.5em",
    "height":"20px",
    "width":"40px",
    "border-radius":"10%",
    "border":"3px solid #87C7A5",
    "text-align":"center",
    "line-height":"20px",
    "vertical-align":"middle",
    "margin":"20 0 0 0",
    "z-index":"2"
  }
  let cssDrawPile={  //$drawPile defined in turn
    "background-color":"#87C7A5",
    "position":"absolute",
    "color":"#FFFFFF",
    "top":"304px",
    "left":"470px",
    "font-size":"0.5em",
    "height":"100px",
    "width":"60px",
    "border-radius":"10%",
    "border":"3px solid #FFFFFF",
    "text-align":"center",
    "line-height":"25px",
    "vertical-align":"middle",
    "margin":"0 1px 0 1px"
  }
  let cssShopPile={  //$shopPile defined in turn
    "background-color":"#222222",
    "position":"absolute",
    "color":"#FFDF00",
    "top":"180px",
    "left":"470px",
    "font-size":"0.5em",
    "height":"100px",
    "width":"60px",
    "border-radius":"10%",
    "border":"3px solid #FFDF00",
    "text-align":"center",
    "line-height":"25px",
    "vertical-align":"middle",
    "margin":"0 1px 0 1px"
  }
  let cssGame2UserDiscard={
    "background-color":"#002200",
    "position":"absolute",
    "color":"#87C7A5",
    "top":"180px",
    "left":"160px",
    "font-size":"1em",
    "height":"60px",
    "width":"100px",
    "border-radius":"10%",
    "border":"3px solid #87C7A5",
    "text-align":"center",
    "line-height":"60px",
    "vertical-align":"middle",
    "margin":"0 1px 0 1px"
  }
  let cssGame2UserEndTurn={
    "background-color":"#002200",
    "position":"absolute",
    "color":"#87C7A5",
    "top":"180px",
    "left":"300px",
    "font-size":"1em",
    "height":"60px",
    "width":"100px",
    "border-radius":"10%",
    "border":"3px solid #87C7A5",
    "text-align":"center",
    "line-height":"60px",
    "vertical-align":"middle",
    "margin":"0 1px 0 1px"
  }
  let cssGame2UserDiscardP2={
    "background-color":"#002200",
    "position":"absolute",
    "color":"#FFA500",
    "top":"180px",
    "left":"160px",
    "font-size":"1em",
    "height":"60px",
    "width":"100px",
    "border-radius":"10%",
    "border":"3px solid #FFA500",
    "text-align":"center",
    "line-height":"60px",
    "vertical-align":"middle",
    "margin":"0 1px 0 1px"
  }
  let cssGame2UserEndTurnP2={
    "background-color":"#002200",
    "position":"absolute",
    "color":"#FFA500",
    "top":"180px",
    "left":"300px",
    "font-size":"1em",
    "height":"60px",
    "width":"100px",
    "border-radius":"10%",
    "border":"3px solid #FFA500",
    "text-align":"center",
    "line-height":"60px",
    "vertical-align":"middle",
    "margin":"0 1px 0 1px"
  }
  let cssDiscardActive={
    "background-color":"#220000",
    "position":"absolute",
    "color":"#FF0000",
    "top":"180px",
    "left":"160px",
    "font-size":"1em",
    "height":"60px",
    "width":"100px",
    "border-radius":"10%",
    "border":"3px solid #FF0000",
    "text-align":"center",
    "line-height":"60px",
    "vertical-align":"middle",
    "margin":"0 1px 0 1px"
  }
  let cssRounds={
    "position":"absolute",
    "color":"#999999",
    "top":"20px",
    "left":"30px",
    "font-size":"1em",
    "height":"1.2em",
    "width":"80px",
    //"border":"1px solid #87C7A5",
    "text-align":"left",
    "margin":"0 1px 0 1px"
  }
  let cssPoints={
    "position":"absolute",
    "color":"#999999",
    "top":"20px",
    "left":"110px",
    "font-size":"1em",
    "height":"1.2em",
    "width":"80px",
    //"border":"1px solid #87C7A5",
    "text-align":"left",
    "margin":"0 1px 0 1px"
  }
  let cssDiscardCounter={
    "position":"absolute",
    "color":"#999999",
    "top":"20px",
    "left":"190px",
    "font-size":"1em",
    "height":"1.2em",
    "width":"130px",
    //"border":"1px solid #87C7A5",
    "text-align":"left",
    "margin":"0 1px 0 1px"
  }

//  ///////////////////////////////
/////////////////////////////// TESTING:
// dbg(royals.Q); dbg(royals[12]);

//  ///////////////////////////////
/////////////////////////////// GAMEPLAY:
initBoard(player1);
player1.deck=rCreateDeckArr(); //dbg(deck1);
player2.deck=rCreateDeckArr(); //dbg(deck2);

// while(isGameOn){
  whoseTurnIsIt=1;
//-------------------------Game loop vvv
  dbg("////♠ ♥ ♦ ♣ ♠ ♥ ♦ ♣ ♠s t a r t♥ ♦ ♣ ♠ ♥ ♦ ♣////");
  turn(player1); //starting game with player1
  let G=setInterval(()=>{
    if(endTurnClicked==true)
    {
      dbg("♠ ♥ ♦ ♣ ♠ ♥ ♦ ♣ ♠ ♥ ♦ ♣ ♠ ♥ ♦ ♣ ♠ ♥ ♦ ♣ ♠ ♠ ♥ ♦ ♣ ♠");
      if(whoseTurnIsIt==1){ //PLAYER 1
        isWinning();//checks if someone won
        round++;
        hasDrawn=0;
        $("#discards").text("discard count: "+player1.discarded.length);
        endTurnClicked=false;
        refresh(player1);
      }
      else{ //PLAYER 2
        hasDrawn=0;
        $("#discards").text("discard count: "+player2.discarded.length);
        endTurnClicked=false;
        refresh(player2);
      }
    }
  },1000);
// }

})//EOF
//  ///////////////////////////////
//  ///////////////////////////////
//  ///////////////////////////////

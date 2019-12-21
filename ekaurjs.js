var storedName = JSON.parse(sessionStorage.getItem("arr"));
var players= sessionStorage.getItem("playercount");
var amount1 = JSON.parse(sessionStorage.getItem("bet"));
let n=players;
var amount=new Array(n);
var bet = new Array(n);

console.log(players)
console.log(storedName)

var score= new Array(n);
let i=0;
for(i=0;i<n;i++)
{score[i]=0;
bet[i]=0;
amount[i]=amount1[i];}

var done= new Array(n);
for(i=0;i<n;i++)
done[i]=0;
var target=21;
let curr=0;
for(var j=0;j<n;j++)
{
    document.getElementById(`amount${j}`).innerText=`WALLET: ${amount1[j]}`
}

bet[0]=prompt("Player 1 Enter Your Bet");
document.getElementById("bet0").innerText=`Bet:${bet[0]}`;
document.getElementById("z1").innerText=storedName[0];
document.getElementById("z2").innerText=storedName[1];
document.getElementById("z3").innerText=storedName[2];
document.getElementById("z4").innerText=storedName[3];

for(var k=0;k<n;k++)
{
    document.getElementById(`bet${k}`).innerText=`Bet: ${bet[k]}`;
}
//document.getElementById("bet0").innerText=`Bet:${bet[0]}`;
//document.getElementById("bet1").innerText=`Bet:${bet[1]}`;
//document.getElementById("bet2").innerText=`Bet:${bet[2]}`;
//document.getElementById("bet3").innerText=`Bet:${bet[3]}`;


    let decck;
    const fetchDeck= async() =>{
    const url="https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    const deck=await fetch(url);
    const deckData=await deck.json();
    decck=deckData.deck_id;
    }
    fetchDeck();
let scoredealer=0;
let zzz;




function finalcall(){
    for(zzz=0;zzz<n;zzz++)
    {
        if(score[zzz]==scoredealer && scoredealer<=21)
        {
              done[zzz]=2;//draw
              document.getElementById(`bet${zzz}`).innerText="TIED";
              document.querySelector(`.p${zzz}`).style.background="yellow";
              document.querySelector(`.p${zzz}`).style.opacity="100%";
              amount[zzz]=amount[zzz];
            document.querySelector(`#amount${zzz}`).innerText=`Amount Left:${amount[zzz]}`;
        }
        else if(score[zzz]>21 || (score[zzz]<scoredealer && scoredealer<=21))
        {
            done[zzz]=-1;//dealer jeeta
            document.getElementById(`bet${zzz}`).innerText="LOSER";
            document.querySelector(`.p${zzz}`).style.background="red";
            document.querySelector(`.p${zzz}`).style.opacity="100%";
            amount[zzz]=amount[zzz]-bet[zzz];
            document.querySelector(`#amount${zzz}`).innerText=`Amount Left:${amount[zzz]}`;
        }
        else if((score[zzz]<=21 && scoredealer>21 )|| (score[zzz]<=21 && score[zzz]>scoredealer))
        {
            done[zzz]=1;//jeet gya player
            document.getElementById(`bet${zzz}`).innerText="WINNER!!";
            document.querySelector(`.p${zzz}`).style.background="green";
            document.querySelector(`.p${zzz}`).style.opacity="100%";
            amount[zzz]=Number(amount[zzz])+Number((bet[zzz]));
            document.querySelector(`#amount${zzz}`).innerText=`Amount Left:${amount[zzz]}`;
        }
        
        
    }
    document.getElementById("reload").innerHTML=`<button onclick="window.location.reload();" type="button" class="btn btn-outline-success align-center mr-5 mt-5 drawbutton" style="margin-left: 22%;width:8%;padding:2%;font-weight: bolder;">New game</button>`
    for(var i=0;i<n;i++)
    {
        amount1[i]=amount[i]
    }
    for(var j=0;j<n;j++)
    {
        document.getElementById(`amount${j}`).innerText=`WALLET: ${amount1[j]}`
    }

    sessionStorage.setItem("nextroundamount",JSON.stringify(amount));
    sessionStorage.setItem("bet",JSON.stringify(amount1));


}






let drawbutton=document.querySelector(`.drawbutton`);
let holdbutton=document.querySelector(`.holdbutton`);
let currplayer=document.querySelector(`.p${curr}`);
currplayer.style.background="crimson";

drawbutton.addEventListener("click",()=>
{   
    document.getElementById("w").innerHTML=`<div id="ot" style="margin: 0%;">
                      
                  </div>`
    
    fetchCard();
    
})

holdbutton.addEventListener("click",()=>{
    if(curr<n){
    document.getElementById("q").innerHTML=`<div id="w" >
        <div style="margin: 20%;">

        </div>
    </div>`
    currplayer.style.background="grey";
    currplayer.style.opacity="40%";
    curr=(curr+1);
    if(curr<n){
       
    currplayer=document.querySelector(`.p${curr}`);
    currplayer.style.background="crimson";
    let next=curr+1;
    bet[curr]=prompt(`Player ${next} Enter Your Bet`);
document.getElementById(`bet${curr}`).innerText=`Bet:${bet[curr]}`;}
    else
    {
        currplayer=document.querySelector(`.dealer`);
        currplayer.style.background="crimson";
    }
}
else{
    drawbutton.style.display="none";
    holdbutton.style.display="none";
    finalcall();
}

})



const fetchCard= async() =>{
    if(curr==n){
        const url=`https://deckofcardsapi.com/api/deck/${decck}/draw/?count=1`;
        const card=await fetch(url);
        const cardData=await card.json();
        console.log(cardData);
        let value=cardData.cards[0].value;
        const image=document.querySelector(".main__title");
        //image.innerHTML=`<img src=${cardData.cards[0].image} style="align-text:center;">`
        image.innerHTML+=`<img src=${cardData.cards[0].image} style="align-text:center;">`
        if(value=="JACK" || value=="KING" || value=="QUEEN")
        scoredealer+=10;
        else if(value=="ACE")
        {
            let x=prompt("1 OR 11 ?");
            scoredealer+=Number(x);
        }
        else{
        scoredealer+=Number(value);}
        console.log("dealer"+curr);
        let scoreupdate=document.querySelector(`#score5`);
        scoreupdate.innerHTML=`<span>SCORE:${scoredealer}</span>`;
        
        if(scoredealer>=21)
        {finalcall();
            drawbutton.style.display="none";
            holdbutton.style.display="none";
        }
    
    }
    else{
    const url=`https://deckofcardsapi.com/api/deck/${decck}/draw/?count=1`;
    const card=await fetch(url);
    const cardData=await card.json();
    console.log(cardData);
    let value=cardData.cards[0].value;
    const image=document.querySelector(".main__title");
    //image.innerHTML=`<img src=${cardData.cards[0].image} style="align-text:center;">`
    image.innerHTML+=`<img src=${cardData.cards[0].image} style="align-text:center;">`
    if(value=="JACK" || value=="KING" || value=="QUEEN")
    score[curr]+=10;
    else if(value=="ACE")
    {
        let x=prompt("1 OR 11 ?");
        score[curr]+=Number(x);
    }
    else
    score[curr]+=Number(value);
    let scoreupdate=document.querySelector(`#score${curr}`);
    scoreupdate.innerHTML=`<span>SCORE:${score[curr]}</span>`;

    if(score[curr]>=21)
    {
        document.getElementById("q").innerHTML=`<div id="w" >
        <div style="margin: 20%;">

        </div>
    </div>`
        //next or dealer
        currplayer.style.background="grey";
        currplayer.style.opacity="40%";
        curr=(curr+1);
        //image.innerHTML="";
        if(curr<n){
            
            currplayer=document.querySelector(`.p${curr}`);
            currplayer.style.background="crimson";
            let next=curr+1;
            bet[curr]=prompt(`Player ${next} Enter Your Bet`);
            document.getElementById(`bet${curr}`).innerText=`Bet:${bet[curr]}`;}
        else{
            //dealer
            currplayer=document.querySelector(`.dealer`);
            currplayer.style.background="crimson";
        }
    }
    }
}









var abc=document.getElementById("x");

abc.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("add-button").click();
    }
  });




let x= document.querySelector(".Play-first");
x.addEventListener("click",()=>
{
    let body= document.querySelector(".play1");
    play1.style.display="none";
    document.querySelector(".afterplay").style.display="block";

}
)

var arr=new Array(4)
var bet=new Array(4)
for ( i=0;i<4;i++)
{
    arr[i]=`Player`;
}

var playercount=0;
function a()
{
    console.log(document.getElementById("x").value)
    arr[playercount]=document.getElementById("x").value;
   
    bet[playercount]=1000;
    playercount++;
    
}


let input=document.querySelector(".form-control");
let input1 = document.getElementById("y");
let add=document.querySelector("#add-button");
let ul=document.querySelector(".list-group");

let cc=document.querySelector(".play-btn");


const addTask=() =>
{
    console.log(1)
    if(input.value !==""){
    let li= document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML=`<button class="btn btnnn bg-dark"  onclick= "c()" style="float:right"><i class="fa fa-trash" id="remove"  aria-hidden="true" style="float:right; color:white "></i></button><span style ="color: white" >${input.value}</span>`;
    document.getElementById("y").value=``;
    ul.appendChild(li);
    input.value="";
    input.focus();
    if(ul.children.length==1){
    cc.style.display="block";}
    if(ul.children.length==4)
    {
        add.style.display="none";
        document.querySelector("#add-button-dis").style.display="block";
    }
}
};

const deletetrash = (e) => {

   if(e.target.id === "remove" )
   {
    const toBeRemoved = e.target.parentNode.parentNode;
    
    const removedFrom = toBeRemoved.parentNode;
    removedFrom.removeChild(toBeRemoved);
   }
   playercount--;
}
ul.addEventListener("click",deletetrash);

const clearrr=()=>
{
    ul.innerHTML="";
    cc.style.display="none";
}
add.addEventListener("click",addTask);

cc.addEventListener("click",clearrr);

function b()
{
    sessionStorage.setItem("arr", JSON.stringify(arr));
    sessionStorage.setItem("bet", JSON.stringify(bet));
    sessionStorage.setItem("playercount", playercount);
    var storedNames = JSON.parse(sessionStorage.getItem("arr"));
    console.log(storedNames)
    window.open('home.html',"_self")

}

function c()
{
    console.log("hello")
    
}


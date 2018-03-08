let c=document.getElementById("canvas");
let d=c.getContext("2d");
let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
let clickcolor=new Array();
let clicktool=new Array();
let curcolor="blue";
let clear=document.getElementById("clear")
let curtool="pencil";
for (let j=1;j<=4;j++){
    let btn=document.getElementById("b"+j);
    
    btn.onclick=function(){curcolor=btn.innerText;
   }
}
for (let j=1;j<=3;j++){
    let btn=document.getElementById("t"+j);
    
    btn.onclick=function(){curtool=btn.innerText;}
}

clear.onclick=function(){
     clickX = new Array();
 clickY = new Array();
clickDrag = new Array();
curcolor=clickcolor[clickcolor.length-1]
clickcolor=new Array();
curtool=clicktool[clicktool.length-1]
clicktool=new Array();
redraw();
};
let paint;
function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  if(curtool=="eraser"){clickcolor.push("white")}else{
  clickcolor.push(curcolor);
clicktool.push(curtool)}
}
c.onmousedown=function(e){let mouseX=e.pageX-this.offsetLeft;
let mouseY=e.pageY-this.offsetTop;
paint =true;
console.log(e.pageX);
addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
redraw();};
c.onmousemove=function(e){
   if(curtool=="line"){paint=false;}
    if(paint){
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw();
    }
  };
  c.onmouseup=function(e){if (curtool=="line"){addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop)}
      paint=false; redraw();};
  c.onmouseleave=function(e){paint=false;};
  


function redraw(){
    d.clearRect(0,0,d.canvas.width,d.canvas.height);
   // d.strokeStyle="#df4b26"
    d.lineJoin="round";
    d.lineWidth="4"
    for(var i=0;i<clickX.length;i++){
        d.beginPath();
        console.log(clickX);
        console.log(curtool)
       
        if(clickDrag[i]&&i){
            d.moveTo(clickX[i-1],clickY[i-1])
        }
        else if(clicktool[i]=="line"){ 
            d.moveTo(clickX[i-1],clickY[i-1])
        }
        else{d.moveTo(clickX[i]-1,clickY[i])}
        d.lineTo(clickX[i],clickY[i]);
        d.closePath();
        d.strokeStyle=clickcolor[i];
        d.stroke();
    }



}
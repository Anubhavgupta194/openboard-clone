let canvas=document.querySelector("canvas")
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let pencilcolor=document.querySelectorAll(".pencil-color")
let pencilwidth=document.querySelector(".p-width")
let eraserwidth=document.querySelector(".e-width")
let eracolor="white"
let pencolor="black"
let penwidth=pencilwidth.value;
let erawidth=eraserwidth.value;
let redo=document.querySelector(".redo")
let undo=document.querySelector(".undo")
let trackerarray =[];
let trackvalue=0;

//API
let tool=canvas.getContext("2d");
tool.strokeStyle="pencolor";
tool.linewidth="penwidth";

canvas.addEventListener("mousedown",(e)=>{
    mouseDown=true;
    tool.beginPath();
    tool.moveTo(e.clientX,e.clientY);
    let data ={
        x:e.clientX,
        y:e.clientY

    }
    Socket.emit("beginpath",data);
})
canvas.addEventListener("mousemove",(e)=>{
    if(mouseDown){
        tool.lineTo(e.clientX,e.clientY);
        tool.stroke()
        tool.strokeStyle =erasersetting ? eracolor : pencolor;
        tool.lineWidth=  erasersetting ?  erawidth : penwidth;
        }

})
canvas.addEventListener("mouseup",(e)=>{
    mouseDown=false;
    let url=canvas.toDataURL();
    trackerarray.push(url);
    trackvalue=trackerarray.length-1;
})
redo.addEventListener("click",()=>{
         if(trackvalue>0) trackvalue--
         //action
         let obj={
            value:trackvalue,
            array:trackerarray,
        }
        undoredocanvas(obj); 

})
undo.addEventListener("click",()=>{
    if(trackvalue<trackerarray.length-1) trackvalue++;
    //action
    let obj={
        value:trackvalue,
        array:trackerarray,
    }
    undoredocanvas(obj);
})
function undoredocanvas(obj){
    val=obj.value;
    tracker=obj.array;
    let url=trackerarray[val];
    let img=new Image();
    img.src=url;
    img.onload=(e)=>{           //second way of wrting event
    tool.drawImage(img,0,0,canvas.width,canvas.height );
    }

}
pencilcolor.forEach((colorelem)=>{
    colorelem.addEventListener("click",()=>{
        let c=colorelem.classList[0];
        pencolor=c;
        tool.strokeStyle=pencolor;
    })
})
pencilwidth.addEventListener("change",()=>{
    penwidth=pencilwidth.value;
    tool.lineWidth=penwidth;

})
eraserwidth.addEventListener("change",()=>{
    erawidth=eraserwidth.value;
    tool.lineWidth=erawidth;
    
})
eraser.addEventListener("click",()=>{
    
    if(erasersetting){
      tool.strokeStyle=eracolor;
      tool.lineWidth=erawidth;
    }
    else{
tool.strokeStyle=pencolor;
tool.lineWidth=penwidth;
    }
})
Socket.on("beginpath",(data)=>{
    //data fropm server
    tool.beginPath();
     tool.moveTo(data.clientX,data.clientY);
    
})

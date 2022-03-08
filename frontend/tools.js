let options=document.querySelector(".options-cont")
let tools_container=document.querySelector(".tools-cont")
let penciltool= document.querySelector(".pencil-tool")
let erasertool= document.querySelector(".eraser-tool")
let pencil=document.querySelector(".pencil")
let eraser=document.querySelector(".eraser")
let stickyicon=document.querySelector(".sticky-notes")
let stickynotes=document.querySelector(".sticky-note");
let download=document.querySelector(".download")
let pencilsetting=false;
let erasersetting=false;
let upload=document.querySelector(".upload");
let notes=false;

let flag=true;
options.addEventListener("click",()=>{
    flag=!flag;
    if(flag)
    {
        openoptions();
    }
    else{
              closeoptions();
    }

})
              

function openoptions ()
{
     let icon= options.children[0];
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
    tools_container.style.display="flex"

 
}

function closeoptions ()
{
    let icon= options.children[0];
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
     tools_container.style.display="none"
     penciltool.style.display="none"
     erasertool.style.display="none";
}
upload.addEventListener("click",()=>{
    let input=document.createElement("input");
     input.setAttribute("type","file");
     input.click();
     input.addEventListener("change",()=>{
         let file=input.files[0];
         let url=URL.createObjectURL(file);
        let note=document.createElement("div");
        note.setAttribute("class","sticky-note");
        note.innerHTML= `
        <div class="sticky-header">
        <div class="minimize"></div>
        <div class="remove"></div>
          </div>
          <div class="sticky-text">
          <img src="${url}" alt="" class="file">
          </div>
        `;
        document.body.appendChild(note);
        let mini=note.querySelector(".minimize")
        let rem=note.querySelector(".remove")
        perform(mini,rem,note)
        note.onmousedown = function(event) {
    
           drag(note,event);
        };
          
           note.ondragstart = function() {
            return false;
          };

     })
     
})


pencil.addEventListener("click",()=>{
    pencilsetting=!pencilsetting
    if(pencilsetting) penciltool.style.display="block"
    else penciltool.style.display="none";
})
eraser.addEventListener("click",()=>{
    erasersetting=!erasersetting
    if(erasersetting) erasertool.style.display="block"
    else erasertool.style.display="none";
})
stickyicon.addEventListener("click",()=>{
    let note=document.createElement("div");
    note.setAttribute("class","sticky-note");
    note.innerHTML= `
    <div class="sticky-header">
    <div class="minimize"></div>
    <div class="remove"></div>
      </div>
      <div class="sticky-text">
      <textarea class="area"></textarea>
      </div>
    `;
    document.body.appendChild(note);
    let mini=note.querySelector(".minimize")
    let rem=note.querySelector(".remove")
    perform(mini,rem,note)
    note.onmousedown = function(event) {

       drag(note,event);
    };
      
       note.ondragstart = function() {
        return false;
      };

})
  function perform(mini,rem,note)
  {
      rem.addEventListener("click",()=>{
          note.remove();
      })
      mini.addEventListener("click",()=>{
          let notecontainer=note.querySelector(".sticky-text");
          let areacheck=getComputedStyle(notecontainer).getPropertyValue("display")
          if(areacheck=="none")
          notecontainer.style.display="block";
          else
          notecontainer.style.display="none";
        
    })
  }

function drag(element,event)
{
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;
  
    element.style.position = 'absolute';
    element.style.zIndex = 1000;
   
//   document.body.append(element)
    moveAt(event.pageX, event.pageY);
  
    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the ball, remove unneeded handlers
    element.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };
  
  };
  download.addEventListener("click",()=>{
      let url=canvas.toDataURL();
      let a =document.createElement("a");
      a.href=url;
      a.download="mysheet.jpg";
      a.click();
  })



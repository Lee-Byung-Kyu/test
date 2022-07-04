const canvas : HTMLCanvasElement | null =
  document.getElementById("tsCanvas") as HTMLCanvasElement;
const ctx : CanvasRenderingContext2D | null =
   canvas.getContext("2d") as CanvasRenderingContext2D;
const colors : HTMLCollectionOf<Element> | null =
  document.getElementsByClassName("tsColor");
const range : HTMLElement | null = document.getElementById("tsRange");
const mode : HTMLElement | null = document.getElementById("tsMode");
const saveBtn : HTMLElement | null = document.getElementById("tsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting : boolean = false;
let filling : boolean = false;

function stopPainting(){
  painting = false;
}

function startPainting(){
  painting = true;
}

function onMouseMove(event : MouseEvent){
  if (!ctx)
    return ;
  const x : number = event.offsetX;
  const y : number = event.offsetY;

  if (!painting){
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event : Event){
  if (!ctx)
    return ;
  if (!event || !event.target)
    return ;
  const color : string = (event.target as HTMLElement).style.backgroundColor;

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event : Event){
  if (!ctx)
    return ;
  if (!event || !event.target)
    return ;
  const size = (event.target as HTMLInputElement).value;
  ctx.lineWidth = +size;
}

function handleModeClick(){
  if (!mode)
    return ;

  if (filling === true){
    filling = false;
    mode.innerText = "Fill";
  } else{
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick(){
  if (!ctx)
    return ;
  if (!canvas)
    return ;

  if (filling){
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleSaveClick(){
  if (!canvas)
    return ;

  const image : string = canvas.toDataURL();
  const link : HTMLAnchorElement = document.createElement("a");

  link.href = image;
  link.download = "PaintTS"; 
  link.click();
}

if (canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting );
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

if (colors){
  Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
  );
}

if (range){
  range.addEventListener("input", handleRangeChange);
}

if (mode){
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick);
}

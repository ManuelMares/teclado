const SHAPES = [
    "path_1", "path_2", "path_3", "path_4", "path_5", "path_6", "path_7", "path_8", "path_9", "path_10",
    "path_11", "path_12", "path_13", "path_14", "path_15", "path_16", "path_17", "path_18", "path_19", "path_20",
    "path_21", "path_22", "path_23", "path_24", "path_25", "path_26", "path_27", "path_28", "path_29", "path_30",
]
let PATH_NAME = ""
const SHAPE_ATTEMPTS = 10;
const SHAPE_INDEX = 0
const trackerBackground = document.getElementById("trackerBackground");
const repetitionsCounter = document.getElementById("repetitionsCounter");

let answer1;
let answer2;
let answer3;
const question1 = document.getElementsByName("question1");
const question2 = document.getElementsByName("question2");
const question3 = document.getElementsByName("question3");
let questionaryContainer = await document.querySelector(".questionaryContainer");

let isQuestionary = false;

let shapeAttempsIndex = 0;

main();

async function main(){
    for (let pathIndex = 0; pathIndex < SHAPES.length + 1; pathIndex++) {
        PATH_NAME = SHAPES[pathIndex];
        // 3) continue drawing
        isQuestionary = false;

        // 1) Load Path interface
        let pathSVGsrc = "./Paths/" + PATH_NAME + ".png"
        trackerBackground.src = pathSVGsrc;
        shapeAttempsIndex = 0;
        repetitionsCounter.innerText = shapeAttempsIndex;

        // 2) Start registering path output

        // while(shapeAttempsIndex < SHAPE_ATTEMPTS){
        await waitForShapeAttemps()
            // 3) stop drawing
        isQuestionary = true;

        // 3) Insert Questionary
        questionaryContainer.style.visibility = "visible"

        
        // 4) Save information   
        await waitForSubmitForm();
        await retrieveAnswers();
        await downloadImage();
        await downloadAnswers();


        //clear variables, hide and reset questionary
        await clearAnswers();
        questionaryContainer.style.visibility = "hidden"        
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

        //nextItems

    } 
}

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};


function create(htmlStr) {
    var frag = document.createDocumentFragment(),
    temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}



async function waitForShapeAttemps() {
    return new Promise((resolve) => {
        const checkValue = () => {
            if (shapeAttempsIndex === SHAPE_ATTEMPTS) {
                return resolve();
            } else {
                setTimeout(checkValue, 500); // Check again after 500 milliseconds
            }
        };
        checkValue();
    });
}


async function waitForSubmitForm() {
    return new Promise((resolve) => {
        submitButton.addEventListener("click", async ()=>{
            return resolve()
        });
    });
}



let tracker = document.getElementById('tracker');
let ctx1 = tracker.getContext('2d');

let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext('2d');
ctx2.strokeRect(0, 0, 500, 500); 


let isDrawing = false;
let shape4Hovered = false;
let shape4 = document.querySelector("#shape4");
shape4.addEventListener('mouseup', ()=>{shape4Hovered = true})
shape4.addEventListener('mouseout', ()=>{shape4Hovered = false})
function startDrawing(e) {
    if(isQuestionary) return
    ctx1.beginPath();
}

function draw(e) {
    if (!isDrawing) return;
    if (isQuestionary) return;
    let x = e.clientX || e.touches[0].clientX;
    let y = e.clientY || e.touches[0].clientY;
    ctx1.lineTo(x - tracker.offsetLeft, y - tracker.offsetTop);
    ctx1.stroke();
}

function stopDrawing(e) {
    if (!isDrawing) return;
    ctx2.drawImage(tracker, 0, 0);
    ctx1.clearRect(0, 0, tracker.width, tracker.height);
    shapeAttempsIndex++;
    repetitionsCounter.innerText = shapeAttempsIndex;
}

function drawingController(e){
    if (isDrawing)
    {
        stopDrawing(e);
        isDrawing = false;
    }
    else
    {
        let x = e.clientX || e.touches[0].clientX;
        let y = e.clientY || e.touches[0].clientY;
        if(x < 290 || x > 330 || y < 290 || y > 330)
        {
            console.log("No good start");
            return;
        }
        else{
            startDrawing(e);
            isDrawing = true;
        }
    }
}
tracker.addEventListener('click', (e)=>{drawingController(e)});
tracker.addEventListener('mousemove', draw);



// tracker.addEventListener('mousedown', startDrawing);
// tracker.addEventListener('touchstart', startDrawing);

// tracker.addEventListener('touchmove', draw);

// tracker.addEventListener('mouseup', stopDrawing);
// tracker.addEventListener('touchend', stopDrawing);

// tracker.addEventListener('mouseout', stopDrawing);
// tracker.addEventListener('touchleave', stopDrawing);

// document.getElementById('clear').addEventListener('click', function() {
//     download();
//     ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
// });



async function downloadImage(){
    var link = document.createElement('a');
    link.download = 'pattern_'+PATH_NAME+'.png';
    link.href = canvas2.toDataURL()
    link.click();
}
async function downloadAnswers(){
    const link = document.createElement("a");
    let content = `
    1)${answer1}
    2)${answer2}
    3)${answer3}
    `
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = 'pattern_'+PATH_NAME+'.txt';
    link.click();
    URL.revokeObjectURL(link.href);
}
async function retrieveAnswers(){
    for(const option of question1)
    {
        if(option.checked){
            answer1 = option.value;
            break;
        }
    }
    for(const option of question2)
    {
        if(option.checked){
            answer2 = option.value;
            break;
        }
    }
    for(const option of question3)
    {
        if(option.checked){
            answer3 = option.value;
            break;
        }
    }
}
async function clearAnswers(){
    for(const option of question1)
        option.checked = false
    for(const option of question2)
        option.checked = false
    for(const option of question3)
        option.checked = false
    
    let answer1 = "";
    let answer2 = "";
    let answer3 = "";
}







//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
// let shape1 = document.querySelector(".shape1");
// let shape2 = document.querySelector(".shape2");
// let shape3 = document.querySelector(".shape3");
// let shape4 = document.querySelector(".shape4");

// let PATH_ARRAY = []
// let HOVERED_ID = ""
// // let TIMER;
// let paths =  {
//     p0:["shape4", "shape5", "shape2"],
//     p1:["shape4", "shape1", "shape2"],
//     p2:["shape4", "shape1", "shape0"],
//     p3:["shape4", "shape3", "shape0"],
//     p4:["shape4", "shape3", "shape6"],
//     p5:["shape4", "shape7", "shape6"],
//     p6:["shape4", "shape5", "shape8"],
//     p7:["shape4", "shape7", "shape8"],
//     p8:["shape4", "shape0"],
//     p8:["shape4", "shape1"],
//     p8:["shape4", "shape2"],
//     p8:["shape4", "shape3"],
//     p8:["shape4", "shape4"],
//     p8:["shape4", "shape5"],
//     p8:["shape4", "shape6"],
//     p8:["shape4", "shape7"],
//     p9:["shape4", "shape8"],
//     p10:[],
// }





function patternMatcher(){

}









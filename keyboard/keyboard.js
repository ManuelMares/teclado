let shape1 = document.querySelector(".shape1");
let shape2 = document.querySelector(".shape2");
let shape3 = document.querySelector(".shape3");
let shape4 = document.querySelector(".shape4");

let PATH_ARRAY = []
let HOVERED_ID = ""
let TIMER;
let paths =  {
    p0:["shape4", "shape5", "shape2"],
    p1:["shape4", "shape1", "shape2"],
    p2:["shape4", "shape1", "shape0"],
    p3:["shape4", "shape3", "shape0"],
    p4:["shape4", "shape3", "shape6"],
    p5:["shape4", "shape7", "shape6"],
    p6:["shape4", "shape5", "shape8"],
    p7:["shape4", "shape7", "shape8"],
    p8:["shape4", "shape0"],
    p8:["shape4", "shape1"],
    p8:["shape4", "shape2"],
    p8:["shape4", "shape3"],
    p8:["shape4", "shape4"],
    p8:["shape4", "shape5"],
    p8:["shape4", "shape6"],
    p8:["shape4", "shape7"],
    p9:["shape4", "shape8"],
    p10:[],
}

/*
    Path register
    keeps track of the paths in PATH_ARRAY
*/
document.addEventListener("mouseover", (e)=>{
    stopTimer();
    let className = e.target.classList[0];
    let HOVERED_ID = e.target.id;

    //adds/restarts path
    if(className === "shape" ){
        PATH_ARRAY.push(HOVERED_ID)
    }
    else if(HOVERED_ID === "canvas"){
        /*Pass. This section is to avoid restarting paths*/
    }
    else{
        PATH_ARRAY = []
    } 

    //detect path triggered by time
    startTimer();
}, false);



function patternMatcher(){

}



function startTimer(){
    TIMER = setTimeout(() => {
        console.log(PATH_ARRAY)
        PATH_ARRAY = []
    }, 1500);
}
function stopTimer(){
    clearTimeout(TIMER);
}
let TIME_CLICK = 1700;
let CLICKED_OBJECT = "";
let TIMER;



//=====================================================================
//Click by object
//We can move the mouse, as long as we stay within the same object
//=====================================================================
// /*
//     Add event listener for click.
// */
// document.addEventListener("mouseover", (e)=>{clickTimer(e)}, false);

// /*
//     Control timer and click trigger when an object is hovered
// */
// function clickTimer(e){
//     stopTimer();

//     CLICKED_OBJECT = e.target.classList[0] === "clickable" ? e.target.id : "";

//     startTimer();
// }

// /*
//     Starts time for click and triggers click itself when time has passed.
// */
// function startTimer(){
//     TIMER = setTimeout(() => {
//         if(CLICKED_OBJECT === ""){
//             return;
//         }else{
//             console.log("éxito!: ", CLICKED_OBJECT);
//             document.querySelector("."+CLICKED_OBJECT).click();
//         }
//         CLICKED_OBJECT === "";
//     }, TIME_CLICK);
// }

// /*
//     Stops timer canceling click.
// */
// function stopTimer(){ clearTimeout(); }





//=====================================================================
//Click by time
//=====================================================================
// let clickAnimation = document.getElementById('click-animation');
document.addEventListener('mousemove', (e)=>{resetTimer(e)});
document.addEventListener('mousedown', (e)=>{resetTimer(e)});
document.addEventListener('keydown', (e)=>{resetTimer(e)});

function resetTimer(e) {
    if(!e) return;
    clearTimeout(TIMER);
    CLICKED_OBJECT = e.target.classList[0] === "clickable" ? e.target.id : "";
    TIMER = setTimeout(()=>{triggerClick(e)}, TIME_CLICK);
}

function triggerClick(event) {
    if(CLICKED_OBJECT === "") return;
    console.log(CLICKED_OBJECT)
    let objectToClick = document.querySelector('.'+CLICKED_OBJECT);
    console.log(objectToClick)
    // Get the current cursor position
    let cursorX = event.clientX;
    let cursorY = event.clientY;

    // Create a custom event to pass to animateClick
    let customEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: cursorX,
        clientY: cursorY
    });

    // Trigger the click event on the object
    objectToClick.dispatchEvent(customEvent);

    // Manually call animateClick with the custom event
    // animateClick(customEvent);
    console.log(customEvent)
}

// Initial timer setup
resetTimer();


//add click animation
document.addEventListener('click', (e)=>{animateClick(e)});
function animateClick(e){
    var clickAnimation = document.getElementById('click-animation');

    // If the click-animation element doesn't exist, create it
    if (!clickAnimation) {
        clickAnimation = document.createElement('div');
        clickAnimation.id = 'click-animation';
        document.body.appendChild(clickAnimation);
    }

    // Calculate the position of the animation
    var animationX, animationY;
    
    // Check if the click is inside a canvas element
    if (e.target.tagName.toLowerCase() === 'canvas') {
        var canvas = e.target;
        var rect = canvas.getBoundingClientRect();
        animationX = e.clientX - rect.left + window.scrollX + 40;
        animationY = e.clientY - rect.top + window.scrollY + 40;
    } else {
        // Position the animation at the cursor's location for other elements
        animationX = e.pageX-20;
        animationY = e.pageY-20;
    }

    // Position the animation at the calculated coordinates
    clickAnimation.style.left = animationX + 'px';
    clickAnimation.style.top = animationY + 'px';
    clickAnimation.classList.add('active');

    // Remove the active class after the animation duration
    setTimeout(function() {
        clickAnimation.classList.remove('active');
    }, 300);
}



//-------------------------------------------------------------------------------------------------------------------------
//Increase timer
//-------------------------------------------------------------------------------------------------------------------------
let increaseTimer = document.querySelector("#IncreaseTimeButton");
let decreaseTimer = document.querySelector("#DecreaseTimeButton");
let timeInput = document.querySelector("#clickTime");
increaseTimer.addEventListener("click", ()=>{updateTime(100)});
decreaseTimer.addEventListener("click", ()=>{updateTime(-100)});

function updateTime(extratime)
{
    TIME_CLICK = TIME_CLICK + extratime;
    clickTime.value = TIME_CLICK/1000;
}
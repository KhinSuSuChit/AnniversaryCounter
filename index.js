const calculateEl = document.querySelector(".calculate");
const bodyEl = document.querySelector("body");

const box_days = document.querySelector('#days');
const box_months = document.querySelector('#months');
const box_years = document.querySelector('#years');

const dateInput = document.querySelector('#date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('max', today);

calculateEl.addEventListener("click", (event) =>{
    displayDuration(); 
});

bodyEl.addEventListener("mousemove", (event) =>{

    if (event.target.closest('.no-animation')) {
        return; // Do nothing if the mouse is over an excluded element
    }

    const xPos = event.pageX;
    const yPos = event.pageY;

    const heart = document.createElement("span");
    heart.classList.add("heart");

    heart.style.left = xPos + "px";
    heart.style.top = yPos + "px";
    bodyEl.appendChild(heart);

    const random = Math.random()*100;
    heart.style.width = random + "px";
    heart.style.height = random + "px";

    setTimeout(()=>{
        heart.remove();
    }, 4000)
});

function displayDuration() {
    const anniversaryInput = document.querySelector('#date').value;
    
    if (anniversaryInput) {
        const currentDate = new Date();
        const duration = calculateDuration(anniversaryInput, currentDate);
        if(duration.days <= 1){
            document.querySelector("#textDays").innerHTML = "Day";
        }
        if(duration.months <= 1){
            document.querySelector("#textMonths").innerHTML = "Month";
        }
        if(duration.years <= 1){
            document.querySelector("#textYears").innerHTML = "Year";
        }
        box_days.innerText = duration.days;
        box_months.innerText = duration.months;
        box_years.innerText = duration.years;
    } else {
        alert("Please chose the date!");
    }

}

function calculateDuration(startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    
    if (days < 0) {
        months--;
        let prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years: years, months: months, days: days };
}

calculateEl.addEventListener("mouseover", (event)=>{
    const x = event.pageX - calculateEl.offsetLeft;
    const y = event.pageY - calculateEl.offsetTop;

    calculateEl.style.setProperty("--xPos", x + "px");
    calculateEl.style.setProperty("--yPos", y + "px");
});
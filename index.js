/** GLOBALS **/
const base_url = "http://localhost:3000/data";
let allPomodoros = document.querySelector('#all-pomodoros');
let form = document.querySelector('#add-pomodoros-form');


/* WHEN THE DOM LOADS */
document.addEventListener('DOMContentLoaded', () => {
    getPomodoros(); //initialize
    form.addEventListener('submit', (event) => {
        handleSubmit(event);
    })
})

/** FETCH REQUESTS **/


function getPomodoros() {
    fetchData(base_url)
    .then(res => res.json())
    .then(pomodoroData => { 
        pomodoroData.map(pomodoro => render(pomodoro))
    })
}

/** RENDER **/
function render(pomodoro) {

    let card = document.createElement('div');
    card.innerHTML = `
        <p>
            <b>Topic: ${pomodoro.topic}</b>
        </p>
        <p>Category: ${pomodoro.category}</p>
        <p>Due Date: ${pomodoro.due}</p>
        <p>${pomodoro.pomodoroNum} pomodoros</p>
        <button class="buttons" id=${pomodoro.id}>&#127813</button>
    `;

    allPomodoros.appendChild(card);

    //Event listener to increase pomodoro count
    card.querySelector(".buttons").addEventListener("click", (event) => {
        //console.log(event.target.dataset)
        //increasePomodoroCount(event)
    }
        //pomodoro.pomodoroNum+=1;
        //card.querySelector("span").innerText = pomodoro.pomodoroNum;
    )   

}

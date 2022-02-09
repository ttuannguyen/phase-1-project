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


async function fetchData() {
    let res = await fetch(base_url)
    let data = await res.json()
    return data
}

function getPomodoros() {
    fetchData()
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
        console.log(event.target.dataset)
        //increasePomodoroCount(event)
    }
    
    )   

}

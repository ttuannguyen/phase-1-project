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
        <p>
            Category: ${pomodoro.category}
        </p>
        <p>
            Due Date: ${pomodoro.due}
        </p>
        <p>
            ${pomodoro.pomodoroNum} pomodoros
        </p>
        <button class="buttons" id=${pomodoro.id}>
            &#127813
        </button>
    `;

    allPomodoros.appendChild(card);

    //Event listener to increase pomodoro count
    card.querySelector(".buttons").addEventListener("click", (event) => {
        //console.log(event.target.dataset)
        increasePomodoroCount(event)
    }

    )   
}

/** EVENT HANDLERS **/
function handleSubmit(event) {
    event.preventDefault();
    let pomodoroObj = {
        topic: event.target.topic.value, 
        category: event.target.category.value,
        due: event.target.due.value,
        pomodoroNum: 1
    };
    addNewPomodoro(pomodoroObj);
}

function addNewPomodoro(pomodoroObj) {
    fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(pomodoroObj)
    })
     .then(res => res.json())
     .then(json => {
        render(json);
        document.getElementById('topic').value = '';
        document.getElementById('category').value = '';
        document.getElementById('due').value = '';
     })
}
function increasePomodoroCount(e) {
    
    let increase = parseInt(e.target.previousElementSibling.innerText) + 1
    
    fetch(base_url + `/${e.target.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
    
          },
        body: JSON.stringify({
            //
    })
})
}

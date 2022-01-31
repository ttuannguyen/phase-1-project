/** GLOBALS **/
const allPomodoros = document.querySelector('#all-pomodoros');


/** EVENT LISTENER **/
document.querySelector('#add-pomodoros-form').addEventListener('submit', handleSubmit)

/** EVENT HANDLING **/
function handleSubmit(e) {
    e.preventDefault();
    let pomodoroObj = {
        topic:e.target.topic.value, //has to match name on the node
        category:e.target.category.value,
        due:e.target.due.value,
        pomodoroNum: 1
    };
    addNewPomodoro(pomodoroObj);
}

/** FETCH REQUESTS **/
function getPomodoros() {
    fetch("http://localhost:3000/data")
    .then(res => res.json())
    .then(pomodoroData => pomodoroData.map(pomodoro => renderOnePomodoro(pomodoro)))
}
getPomodoros(); //initialize

/** NODE GETTERS **/

/** RENDERS **/
function renderOnePomodoro(pomodoro) {

    const card = document.createElement('div');

    card.innerHTML = `
        <p>
            <b>Topic: ${pomodoro.topic}</b>
        </p>
        <p>Category: ${pomodoro.category}</p>
        <p>Due Date: ${pomodoro.due}</p>
        <p id="increase"">
            &#127813 <span>${pomodoro.pomodoroNum}</span>
        </p>
        <p id="remove">Complete</p>
    `;

    allPomodoros.appendChild(card);

    //Event listener to increase pomodoro count
    card.querySelector("#increase").addEventListener("click", (e) => {
        e.preventDefault;
        pomodoro.pomodoroNum+=1;
        card.querySelector("span").textContent = pomodoro.pomodoroNum;
        increasePomodoroCount(pomodoro);
    })

    //Event listener to remove completed pomodoro
    card.querySelector("#remove").addEventListener('click', (e) => {
        e.preventDefault();
        removePomodoro(pomodoro);
    })


}

function addNewPomodoro(pomodoroObj) {
    fetch("http://localhost:3000/data", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(pomodoroObj)
    })
}

function increasePomodoroCount(pomodoroObj) {
    fetch(`http://localhost:3000/data/${pomodoroObj.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(pomodoroObj)
    })
}

function removePomodoro(pomodoroObj) {
    fetch(`http://localhost:3000/data/${pomodoroObj.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })
}

const AddBTN = document.querySelector('.addTask button'),
    Input = document.querySelector('.addTask input[type=text]'),
    TasksList = document.querySelector('.tasks');



let tasks;

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem("tasks"))

let todoItemElem = [];

function Task(description) {
    this.description = description;
    this.completed = false;
};

const createTemplate = (element, index) => {
    return `
                <li class = "${element.completed ? 'checked' : ""} ">
                    <div class='item'>
                    <input onclick="completeTask(${index})" type="checkbox" name="" id="" ${element.completed ? 'checked' : ""}>
                    <p>${element.description}</p>
                    </div>
                    
                    <button onclick="deleteTask(${index})" ></button>
                </li>
    `
}

const show = () => {
    TasksList.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach((element, index) => {
            TasksList.innerHTML += createTemplate(element, index);
        });
        todoItemElem = document.querySelectorAll("li");
    }
};
show();
const updateLS = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
};

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemElem[index].classList.add('checked');
    } else {
        todoItemElem[index].classList.remove('checked');
    }
    updateLS();
    show();
}


const deleteTask = index => {
    tasks.splice(index, 1);
    updateLS();
    show();
}


AddBTN.addEventListener("click", () => {
    if (Input.value.length > 0) { tasks.push(new Task(Input.value)); }
    updateLS();
    show();
    Input.value = "";
})




//geolocation and wather
const weather = document.querySelector('.modal_window .title .aboutweather .weather'),
    weatherIcon = document.querySelector('.modal_window .title  .aboutweather .weather__blok .icon'),
    weatherInfo = document.querySelector('.modal_window .title .aboutweather .weather__blok .inform');

function myLocation() {
    const getLocation = (resoult) => {
        console.log(resoult);
        let Lat = resoult.coords.latitude;
        let Lon = resoult.coords.longitude;
        console.log(Lat, Lon);

        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${Lat}+${Lon}&key=7a8980e030af475e9c79a7e6a0161f00`)
            .then(function(resp) { return resp.json() })
            .then(function(data2) {
                console.log(data2);
                city = data2.results[0].components.city;
                console.log(city);

                fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&appid=51e0fc8246f5f18489d57289d2145462`)
                    .then(function(resp) { return resp.json() })
                    .then(function(data) {
                        console.log(data);
                        weather.innerHTML = city + " " + Math.round(data.main.temp - 273.15) + '&deg';
                        weatherIcon.style.cssText = `background : url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png) center no-repeat;
                        background-size: cover;`

                        weatherInfo.innerHTML = data.weather[0].main
                    });
            });
    };
    navigator.geolocation.getCurrentPosition(getLocation, console.log);
}
myLocation();


window.addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
        if (Input.value.length > 0) { tasks.push(new Task(Input.value)); }
        updateLS();
        show();
        Input.value = "";
    };
})

// if (Input.value.length > 0) {
//     window.addEventListener("keypress", function(e) {
//         if (e.key == "Enter") {
//             tasks.push(new Task(Input.value));
//             updateLS();
//             show();
//             Input.value = "";
//         };
//     })
// };
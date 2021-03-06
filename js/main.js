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
                    <button class='btnClose' onclick="deleteTask(${index})" ></button>
                    </div>
                    
                   
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
        // console.log(resoult);
        let Lat = resoult.coords.latitude;
        let Lon = resoult.coords.longitude;
        // console.log(Lat, Lon);

        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${Lat}+${Lon}&key=7a8980e030af475e9c79a7e6a0161f00`)
            .then(function(resp) { return resp.json() })
            .then(function(data2) {
                // console.log(data2);
                city = data2.results[0].components.city;
                // console.log(city);

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&appid=51e0fc8246f5f18489d57289d2145462`)
                    .then(function(resp) { return resp.json() })
                    .then(function(data) {
                        // console.log(data);
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
        if (InputList.value.length > 0) { lists.push(new List(InputList.value)); }
        updateListS();
        showLISTS();
        ShowInfo();
        InputList.value = "";
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
const BtnAddList = document.querySelector('.addlist button');
const InputList = document.querySelector('.addlist input');
const Lists = document.querySelector('.lists')


let lists;

!localStorage.lists ? lists = [] : lists = JSON.parse(localStorage.getItem("lists"))

let listsItemElem = [];

function List(description) {
    this.description = description;
    this.completed = false;

};

const createList = (element, index) => {
    return `
                <li  data-list_number="${index}">
                    <div class='item'>
                    <p>${element.description}</p>
                    <button class='btnClose' onclick="deleteList(${index})" ></button>
                    </div>    
                    
                </li>
    `
}

const showLISTS = () => {
    Lists.innerHTML = "";
    if (lists.length > 0) {
        lists.forEach((element, index) => {
            Lists.innerHTML += createList(element, index);
        });
        todoItemElem = document.querySelectorAll("li");
    }
};
showLISTS();
const updateListS = () => {
    localStorage.setItem('lists', JSON.stringify(lists))
};




const deleteList = index => {
    lists.splice(index, 1);
    updateListS();
    showLISTS();
    ShowInfo();
}


BtnAddList.addEventListener("click", () => {
    if (InputList.value.length > 0) { lists.push(new List(InputList.value)); }
    updateListS();
    showLISTS();
    ShowInfo();
    InputList.value = "";
})




function RemoveClass() {
    const MyLists = document.querySelectorAll(".lists li")
    MyLists.forEach(element => {
        if (element.classList.contains("Active")) {
            element.classList.remove("Active");
        };
    });
}

function ShowInfo() {
    const MyLists = document.querySelectorAll(".lists li")
    MyLists.forEach(element => {
        element.addEventListener('click', function() {
            RemoveClass();
            this.classList.add("Active");
            document.querySelector('.title__item__list').innerHTML = this.outerText

        })
    })
}
ShowInfo();
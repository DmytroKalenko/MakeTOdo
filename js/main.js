const AddBTN = document.querySelector('.addTask button'),
    Input = document.querySelector('.addTask input[type=text]'),
    TasksList = document.querySelector('.tasks');


let tasksArray = [];
if (localStorage.getItem('tasks') != undefined) {
    tasksArray = JSON.parse(localStorage.getItem("tasks"))
    showTasks();
};

function setTasks() {

    let task = {
        task: Input.value,
        check: false,
    };
    tasksArray.push(task)
    Input.value = '';

    showTasks();
    closing();
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
};

AddBTN.addEventListener('click', setTasks);


function showTasks() {
    let out = '';
    for (var element in tasksArray) {
        out += `<li><input type="checkbox"> ${tasksArray[element].task} <button></button></li>`;
    }
    TasksList.innerHTML = out;
};



function checking() {
    let Check = document.querySelectorAll(".tasks li input[type=checkbox]");
    for (var i = 0; i < Check.length; i++) {
        Check[i].addEventListener("change", function() {
            if (this.checked) { this.parentElement.style.textDecoration = "line-through" } else if (this.parentElement.style.textDecoration = "none");
        })
        console.log(Check[i]);
    }
};
checking()


function closing() {
    let Closes = document.querySelectorAll(".tasks li button");

    for (var i = 0; i < Closes.length; i++) {
        Closes[i].addEventListener("click", function() {
            this.parentElement.style.display = "none";

        })
    }
};
closing()





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
               
                fetch( `http://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Lon}&appid=51e0fc8246f5f18489d57289d2145462`)
                    .then(function(resp) { return resp.json() })
                    .then(function(data) {
                        console.log(data);
                        weather.innerHTML = city +  " " + Math.round(data.main.temp - 273.15) +'&deg';
                        weatherIcon.style.cssText = `background : url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png) center no-repeat;
                        background-size: cover;`

                        weatherInfo.innerHTML = data.weather[0].main
                    });
            });
    };
    navigator.geolocation.getCurrentPosition(getLocation, console.log);
}
myLocation();





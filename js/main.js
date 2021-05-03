const AddBTN = document.querySelector('.addTask button'),
    Input = document.querySelector('.addTask input[type=text]'),
    TasksList = document.querySelector('.tasks');


let tasksArray = []; 
 if (localStorage.getItem('tasks')!=undefined){
     tasksArray = JSON.parse(localStorage.getItem("tasks"))
     showTasks();
    };
 
    function setTasks(){
       
        let task = { 
            task: Input.value,
            check: false,
        };
        tasksArray.push(task)
        Input.value='';
        
         showTasks();
         localStorage.setItem("tasks", JSON.stringify(tasksArray) );
    };

    AddBTN.addEventListener('click',setTasks);
    

    function showTasks(){
        let out='';
        for (var element in tasksArray ){
            out+= `<li><input type="checkbox"> ${tasksArray[element].task} <button></button></li>`;
        }
       TasksList.innerHTML = out;
    };

let Check = document.querySelectorAll(".tasks li input[type=checkbox]");
    function checking(){
        for(var i= 0; i<Check.length; i++){
            Check[i].addEventListener("change", function(){              
                if(this.checked){this.parentElement.style.textDecoration = "line-through"}
                else if(this.parentElement.style.textDecoration = "none");           
            })
             console.log(Check[i]);
        }
    };
    checking()

    let Closes = document.querySelectorAll(".tasks li button");
    function closing(){
        for(var i= 0; i<Closes.length; i++){
            Closes[i].addEventListener("click", function(){              
               this.parentElement.style.display = "none";

            })          
        }
    };
    closing()

    
// //    wather



//geolocation

function myLocation(){

const getLocation = (resoult)=>{
    console.log(resoult);
    let Lat = resoult.coords.latitude;
    let Lon = resoult.coords.longitude;
    console.log(Lat, Lon);
    
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${Lat}+${Lon}&key=7a8980e030af475e9c79a7e6a0161f00`)
        .then(function(resp){return resp.json()})
        .then(function(data2){
        console.log(data2);
        city = data2.results[0].components.city;
        console.log(city);
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=51e0fc8246f5f18489d57289d2145462`)
        .then(function(resp){return resp.json()})
        .then(function(data){
        console.log(data);
});
});


};



 navigator.geolocation.getCurrentPosition(getLocation, console.log);
}



myLocation()



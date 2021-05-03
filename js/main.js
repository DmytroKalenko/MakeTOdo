const AddBTN = document.querySelector('.addTask input[type=button]'),
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
            out+= `<li><input type="checkbox"> ${tasksArray[element].task} <button>X</button></li>`;
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

 
   
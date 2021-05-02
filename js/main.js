const AddBTN = document.querySelector('.addTask input[type=button]'),
    Input = document.querySelector('.addTask input[type=text]'),
    TasksList = document.querySelector('.tasks');

let tasksArray = [];    

    function setTasks(){
       
        let task = {
            task: Input.value,
            check: false,
        };
        tasksArray.push(task)
        Input.value='';
         showTasks();
    };

    AddBTN.addEventListener('click',setTasks);
    

    function showTasks(){
        let out='';
        for (var element in tasksArray ){
            out+= `<li><input type="checkbox"> ${tasksArray[element].task} <button>X</button></li>`;
        }
       TasksList.innerHTML = out;
    };

// let check = document.querySelectorAll("li input[type=checkbox]");
    // function check(){

    // };
   

 
   
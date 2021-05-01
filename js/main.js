const AddBTN = document.querySelector('.addTask input[type=button]'),
    Input = document.querySelector('.addTask input[type=text]'),
    TasksList = document.querySelector('.tasks');


AddBTN.addEventListener('click', function(e) {
    const Task = document.createElement('li');
    TasksList.appendChild(Task);



    const Cheack = document.createElement('input');
    Cheack.setAttribute("type", "checkbox");
    Task.innerHTML = `<input type="checkbox" name="" id="">${Input.value}<span>X</span>`;



});
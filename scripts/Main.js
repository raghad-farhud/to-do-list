let themeBtn = document.querySelectorAll('.themeBox .btn');
let container = document.querySelector('body .container');
let inputTask = document.querySelector('.taskContainer input#task-name');
let addTaskBtn = document.querySelector('.taskContainer .add');
let taskPlace =document.querySelector('.task-placs');
let theDate= document.querySelector('.date');
// theDate.innerHTML = new Date();

window.onload = function(){
    inputTask.focus();
}


const getTodos = () => {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}

window.addEventListener('DOMContentLoaded', () => {
        
    if(taskPlace.childElementCount !== 0){
        
        let noTaskMsg = document.querySelector('.noTaskMsg');
        if (document.body.contains(document.querySelector('.noTaskMsg'))){
            noTaskMsg.remove();
        }
    }

        const todos = getTodos();

        todos.forEach( todo=>{
            
            let taskSpan = document.createElement('span');
            taskSpan.textContent = todo;
            taskSpan.classList.add('taskSpan');
    
            let deleteTask = document.createElement('span');
            deleteTask.className= 'delete';
            deleteTask.textContent = 'delete';
            
            taskSpan.appendChild(deleteTask);
            taskPlace.appendChild(taskSpan);
        
        })
})

addTaskBtn.addEventListener('click',  function(){
    createNoTaskMsg()
    if (inputTask.value === ''){
        window.alert('no value to add ☹');
        
    }else {
        
        let noTaskMsg = document.querySelector('.noTaskMsg');
        if (document.body.contains(document.querySelector('.noTaskMsg'))){
            noTaskMsg.remove();
        }

        function creatTaskSpan(){
            const todos = getTodos();
            todos.push(inputTask.value);
            localStorage.setItem('todos', JSON.stringify(todos))

            let taskSpan = document.createElement('span');
            taskSpan.textContent = inputTask.value;
            taskSpan.classList.add('taskSpan');

            let deleteTask = document.createElement('span');
            deleteTask.className= 'delete';
            deleteTask.textContent = 'delete';
            
            taskSpan.appendChild(deleteTask);
            taskPlace.appendChild(taskSpan);
        }
        creatTaskSpan();
        
        inputTask.value = '';
        inputTask.focus();
        taskCalculate();
    

    }
})


// const deleteTodos = (todos, e) => {
//     const targetLi = todos.indexOf(e.target.textContent)
//     todos.splice(targetLi, 1)
//     localStorage.setItem('todos', JSON.stringify(todos))
// }

document.addEventListener('click' , (a)=>{
    createNoTaskMsg()

    if (a.target.classList.contains('taskSpan')) {
        a.target.classList.toggle('completed');
    }

    if (a.target.classList.contains('delete-all')) {
        document.querySelectorAll('.taskSpan').forEach((el)=>{
            el.remove();
        })
        localStorage.clear();
        }


    // document.addEventListener('click', function (e) {

        if (a.target.classList.contains('delete')) {
            a.target.parentNode.remove();

            let  targeted = a.target.parentNode.textContent.slice(0, a.target.parentNode.textContent.indexOf('delete'));
            // console.log(targeted)
            const todos= getTodos()
            // console.log(todos)
            todos.splice(todos.indexOf(targeted), 1)
            // console.log(todos)
            localStorage.setItem('todos', JSON.stringify(todos))
            // console.log(localStorage)
            createNoTaskMsg()
        }

        createNoTaskMsg()
        taskCalculate();
    // })
})

function createNoTaskMsg(){
    if (taskPlace.childElementCount == 0 ){
        let noTask = document.createElement('div');
        noTask.classList.add('noTaskMsg');
        noTask.textContent = 'No Tasks To Show';
        taskPlace.appendChild(noTask);
    }
}

function taskCalculate(){
    let taskCount = document.querySelector('.task-count span');
    let taskCompleted = document.querySelector('.task-completed span');

    taskCount.innerHTML= document.querySelectorAll('.task-placs .taskSpan').length;
    taskCompleted.innerHTML= document.querySelectorAll('.task-placs .taskSpan.completed').length;
}

// theme functionality
for(let i=0; i<themeBtn.length; i++){
    themeBtn[i].addEventListener('click', ()=>{
        if (themeBtn[i].textContent == 'Dark'){
            document.body.classList.add('darkTheme');
            container.style.backgroundColor = '#1e1e1e';
            document.querySelector(':root').style.cssText = '--blackNwhite: black;';
        }else {
            document.body.classList.remove('darkTheme');
            container.style.backgroundColor = '#e7e7e7';
            document.querySelector(':root').style.cssText = '--blackNwhite:white;';
        }
    })
}
themeBtn.forEach((el)=>{
    el.addEventListener('click', function(e){
        themeBtn.forEach((el)=>{
            el.classList.remove('active-theme');
        })
        e.currentTarget.classList.add('active-theme');
    })
})
// localStorage.clear()

// addTaskBtn.addEventListener('click', function(){
//     tasksList = document.querySelectorAll('.task-placs>span');
//     tasksList.forEach( function (task, index) {
//             console.log(task.textContent , index);
//             localStorage.setItem(index, task.textContent);
//         })
// })

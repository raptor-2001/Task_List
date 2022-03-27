// UI variables

const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const clrBtn = document.querySelector('.clear-task');
const taskList = document.querySelector('.collection');

// Load eventListner

loadEventListners();

function loadEventListners(){

  //add task
  form.addEventListener('submit',addTask);

  // remove task
  taskList.addEventListener('click',removeTask);

  // clear all 
  clrBtn.addEventListener('click',clearTask);

  // filter function
  filter.addEventListener('keyup',filterTasks);

  // to display the local storage contents
  document.addEventListener('DOMContentLoaded',getTasks);


}


// get tasks in ls
function getTasks(){

  let tasks ;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
      // creating li
      const li = document.createElement('li');
      // setting li className
      li.className='collection-item';
      // adding text in it
      li.appendChild(document.createTextNode(task));
      
      // Creating link
      const link = document.createElement('a');
      // setting class name
      link.className = 'delete-item secondary-content';

      // adding cross
      link.innerHTML=`<i class="fa fa-remove"></i>`;

      li.appendChild(link);
      
      // Adding tasks in the list
      taskList.appendChild(li);
  });
        
}
// addTask function
function addTask(e){

  // checking new task input is empty or not
  if(taskInput.value === ''){
    alert("Write a task");
  }else{

      // creating li
      const li = document.createElement('li');
      // setting li className
      li.className='collection-item';
      // adding text in it
      li.appendChild(document.createTextNode(task.value));
      
      // Creating link
      const link = document.createElement('a');
      // setting class name
      link.className = 'delete-item secondary-content';

      // adding cross
      link.innerHTML=`<i class="fa fa-remove"></i>`;

      li.appendChild(link);


      storeToLocalStorage(task.value);
      
      // Adding tasks in the list
      taskList.appendChild(li);
  }
  taskInput.value='';
  e.preventDefault();
}


// to set the tasks in local storage
function storeToLocalStorage(task){

  let tasks ;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks',JSON.stringify(tasks));
}
// Remove Task

function removeTask(e){
 
  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove();
  }

  removeTaskFormLocalStorage(e.target.parentElement.parentElement);

}


// to remove task from local storage

function removeTaskFormLocalStorage(taskItem){
  let tasks ;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task,index){

    if(task === taskItem.textContent){
      tasks.splice(index,1);
    }
  });

  localStorage.setItem('tasks',JSON.stringify(tasks));
}
// Clear Task

function clearTask(){

  // method 1
  // taskList.innerHTML= "";

  // method 2 faster
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  clearLocakStorage();
}

// to clear the local storage

function clearLocakStorage(){
  localStorage.clear();
}

// Filter tasks

function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task){

      const item = task.firstChild.textContent;

      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      }else{
        task.style.display =' none';
      }
     
      
  });
};
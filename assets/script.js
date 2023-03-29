// scrollbar menu functions
$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});

var formatDate = function(dateToFormat) {
    const yyyy = dateToFormat.getFullYear();
    let mm = dateToFormat.getMonth() + 1; // Months start at 0!
    let dd = dateToFormat.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return mm + '/' + dd + '/' + yyyy;
}

// start creating IDs by incrementing from 0
var taskIdCounter = 0;

// declare empty object for tasks in local storage
var tasks = [];

// add task button
var addTask = function(taskText, taskDay, taskId) {
    // new <li> for individual task
    var taskLi = $(`<li class="task-li-item" data-task-id=${taskId}>`);
    // create the checkbox
    var task = $(`<input type="checkbox" name="to-do-item" id="to-do-item" data-task-id=${taskId}>`).addClass('task-line');
    // // grab the text from the text input next to add task btn
    // var taskText = $(`#add-task-${taskDay}-text`).val();
    // create label with text from input
    var taskLabel = $('<label for="to-do-item">').text(taskText);
    // create a delete button for the task
    var delBtn = $(`<button type="button" class="btn btn-danger delete-btn" data-task-id=${taskId}>`).text('X');
    // append the input and label to the div
    var newTask = taskLi.append(task, taskLabel, delBtn);
    // prepend new task to ul element, newest on top
    $(`#${taskDay}-tasks-ul`).prepend(newTask);

    // save today's date for future use in the tasks array
    var today = new Date();
    today = formatDate(today);

    // save in tasks array
    tasks.push({
        text: taskText,
        day: taskDay,
        date: today,
        id: taskIdCounter
    });

    // increment taskIdCounter by 1
    taskIdCounter++;
};

var loadTasks = function() {
    // grab the items from local storage
    let tasks = localStorage.getItem('tasks')
    // if there are saved tasks
    if (tasks) {
        // parse into array
        tasks = JSON.parse(localStorage.getItem('tasks'));
        // loop through array
        tasks.forEach(function(task) {
            console.log(task);
            // add each task to appropriate place
            // THIS IS WHERE YOU WOULD CHECK TASK.DATE AND MOVE ACCORDINGLY!
            addTask(task.text, task.day, task.id);
        })
    }
    else {
        return []
    }
};

// use local storage to save tasks
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

/*

EXPLANATION OF USING $(DOCUMENT.BODY) FOR DYNAMIC CONTENT

You have to add the selector parameter, otherwise the event is directly bound instead of delegated, 
which only works if the element already exists (so it doesn't work for dynamically loaded content).

See http://api.jquery.com/on/#direct-and-delegated-events

*/

// remove a task
$(document.body).on('click', '.delete-btn', function() {
    // $(this).closest('li').remove();
    console.log('delete button clicked');
    // saveTasks();
    var taskId = $(this).attr('data-task-id');
    console.log(taskId);

    // find task list element with taskId value and remove it
    // var selectedTask = $(`".task-line[data-task-id='${taskId}']"`);
    var selectedTask = $(".task-li-item[data-task-id='" + taskId + "']");
    console.log(selectedTask);
    selectedTask.remove();

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
      // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
      if (tasks[i].id !== parseInt(taskId)) {
        updatedTaskArr.push(tasks[i]);
      }
    }
    console.log(updatedTaskArr);
  
    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    saveTasks();

});

// keyup to track input text in input fields
$(".new-task-input").keyup(function () {
    var parentId = $(this).parent().attr('id');
    // console.log(parentId);
    // reference the add task button
    var taskButton = $(`#add-task-${parentId}-btn`);

    // verify there is text in the input field
    if ($(this).val().trim() != "") {
        // enable the btn when input field has a value
        taskButton.removeAttr("disabled");
    } else {
        // disable the btn if the user deletes text and the input is empty again
        taskButton.attr("disabled", "disabled");
    }
});

// what happens when add task button is clicked
$(".add-task-btn").click(function() {
    var parentId = $(this).parent().attr('id');
    var taskButton = $(`#add-task-${parentId}-btn`);
    // grab the text from the text input next to add task btn
    var taskText = $(`#add-task-${parentId}-text`).val();

    addTask(taskText, parentId);
    // clear the input field(s)
    $(`#add-task-${parentId}-text`).val('');
    // disable add task btn once clicked
    taskButton.attr("disabled", "disabled");

    saveTasks();
});

// load tasks from local storage
loadTasks();
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

// declare empty object for tasks in local storage
var tasks = [];

// add task button
var addTask = function(taskText, taskDay) {
    // new div for individual task
    var taskDiv = $('<div>');
    // create the checkbox
    var task = $('<input type="checkbox" name="to-do-item" id="to-do-item">').addClass('task-line');
    // // grab the text from the text input next to add task btn
    // var taskText = $(`#add-task-${taskDay}-text`).val();
    // create label with text from input
    var taskLabel = $('<label for="to-do-item">').text(taskText);
    // append the input and label to the div
    var newTask = taskDiv.append(task, taskLabel);
    // prepend entire new task to the section so newest ones appear at the top
    $(`#${taskDay}-tasks`).prepend(newTask);

    // save in tasks array
    tasks.push({
        text: taskText,
        day: taskDay
    });
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
            addTask(task.text, task.day);
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
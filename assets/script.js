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

// declare empty object for tasks in local storage
var tasks = [];

// add task button
var addTask = function(taskText, taskDay) {
    // new <li> for individual task
    var taskLi = $('<li>');
    // create the checkbox
    var task = $('<input type="checkbox" name="to-do-item" id="to-do-item">').addClass('task-line');
    // // grab the text from the text input next to add task btn
    // var taskText = $(`#add-task-${taskDay}-text`).val();
    // create label with text from input
    var taskLabel = $('<label for="to-do-item">').text(taskText);
    // create a delete button for the task
    var delBtn = $('<button type="button" class="btn btn-danger delete-btn">').text('X');
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
        date: today
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
            // THIS IS WHERE YOU WOULD CHECK TASK.DATE AND MOVE ACCORDINGLY!
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

// remove a task
$(".delete-btn").on("click", function() {
    $(this).closest('li').remove();
    console.log('delete button clicked');
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
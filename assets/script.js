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

// add task button
var addTask = function() {
    // new div for individual task
    var taskDiv = $('<div>');
    // create the checkbox
    var task = $('<input type="checkbox" name="to-do-3" id="to-do-3">').addClass('task-line');
    // grab the text from the text input next to add task btn
    var taskText = $("#add-task-today-text").val();
    // create label with text from input
    var taskLabel = $('<label for="to-do-3">').text(taskText);
    // append the input and label to the div
    var newTask = taskDiv.append(task, taskLabel);
    // prepend entire new task to the section so newest ones appear at the top
    $("#today-tasks").prepend(newTask);
};

$("#add-task-btn").click(function() {
    addTask();
});
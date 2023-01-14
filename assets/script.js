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
var addTask = function(taskText) {
    var taskDiv = $('<div>');
    var task = $('<input type="checkbox" name="to-do-3" id="to-do-3">').addClass('task-line');
    var taskLabel = $('<label for="to-do-3">').text(taskText);
    var newTask = taskDiv.append(task, taskLabel);
    $("#today-tasks").prepend(newTask);
};

$("#add-task-btn").click(function() {
    console.log("add task button clicked");
    addTask(' testing add new text button');
});
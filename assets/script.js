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
    var task = $('<input type="checkbox">').addClass('task-line');
    var taskLabel = $('<label for="to-do-2">').text(taskText);
    $("#today-section").append(task, taskLabel);
};

$("#add-task-btn").click(function() {
    console.log("add task button clicked");
    addTask('testing add new text button');
});
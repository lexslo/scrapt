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
var addTask = function(taskDay) {
    // new div for individual task
    var taskDiv = $('<div>');
    // create the checkbox
    var task = $('<input type="checkbox" name="to-do-3" id="to-do-3">').addClass('task-line');
    // grab the text from the text input next to add task btn
    var taskText = $(`#add-task-${taskDay}-text`).val();
    // create label with text from input
    var taskLabel = $('<label for="to-do-3">').text(taskText);
    // append the input and label to the div
    var newTask = taskDiv.append(task, taskLabel);
    // prepend entire new task to the section so newest ones appear at the top
    $(`#${taskDay}-tasks`).prepend(newTask);
};

// enable add task button once text is entered in the input field
// $(".new-task-input").click(function() {
//     var parentId = $(this).parent().attr('id');
//     console.log(parentId);
//     

//     if ($(this).val().trim() != "") {
//         //Enable the TextBox when TextBox has value.
//         taskButton.removeAttr("disabled");
//     } else {
//         //Disable the TextBox when TextBox is empty.
//         taskButton.attr("disabled", "disabled");
//     }
// });
$(".new-task-input").keyup(function () {
    var parentId = $(this).parent().attr('id');
    // console.log(parentId);
    //Reference the Button.
    var taskButton = $(`#add-task-${parentId}-btn`);

    //Verify the TextBox value.
    if ($(this).val().trim() != "") {
        //Enable the TextBox when TextBox has value.
        taskButton.removeAttr("disabled");
    } else {
        //Disable the TextBox when TextBox is empty.
        taskButton.attr("disabled", "disabled");
    }
});

// what happens when add task button is clicked
$(".add-task-btn").click(function() {
    var parentId = $(this).parent().attr('id');
    var taskButton = $(`#add-task-${parentId}-btn`);

    addTask(parentId);
    // clear the input field(s)
    $(`#add-task-${parentId}-text`).val('');
    // disable add task btn once clicked
    taskButton.attr("disabled", "disabled");
});
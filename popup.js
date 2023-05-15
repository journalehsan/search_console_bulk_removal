// Add a load event listener to the window
window.addEventListener('load', function() {
    // Get the input element for file_name

});


// Get the remove button element
var openAppButton = document.getElementById("open_app");

// Add a click event listener to the remove button
openAppButton.addEventListener("click", function() {
    // Open a new window with the file name as a parameter
    window.open("openFile.html");

});

//open file_name dialog for select file when click on select_button
// Get the button element
var button = document.getElementById("close");

// Add a click event listener to the button
button.addEventListener("click", function() {
    //close current window
    window.close();
});
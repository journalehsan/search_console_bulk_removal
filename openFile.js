//call remove_from_google_search_console function when click on remove_button
// Get the button element
var button = document.getElementById("remove_button");
button.addEventListener("click", remove_from_google_search_console);

// Replace these values with your own client ID and scope
var CLIENT_ID = "YOUR_CLIENT_ID";
var SCOPE = "https://www.googleapis.com/auth/webmasters";

//when click on login_button call loginWithGoogle function
// Get the button element
var button = document.getElementById("login_button");
button.addEventListener("click", loginWithGoogle);


// This function is called when the user clicks the button
function loginWithGoogle() {
    // Get the message element

    function init() {
        gapi.load('auth2', function() {
            // Now you can use gapi.auth2.authorize
            gapi.auth2.authorize({
                    client_id: CLIENT_ID,
                    scope: SCOPE,
                    immediate: false
                },
                handleAuthResult
            );
        });
    }

    alert('ok');
    init(); // Call the init function

}

function remove_from_google_search_console() {
    // Get the message element
    var message = document.getElementById("message");

    // Get the file input element and the selected file
    var fileInput = document.getElementById("file_name");
    var file = fileInput.files[0];

    // Check if the file is valid
    if (file && file.type === "text/csv") {
        // Read the file content as text
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            // Get the file content as an array of lines
            var content = reader.result;
            var lines = content.split("\n");

            // Get the column number and site url from the user input
            var columnNumber = document.getElementById("column_number").value;
            var siteUrl = document.getElementById("site_url").value;

            // Check if the column number and site url are valid
            if (columnNumber && siteUrl) {
                // Loop through the lines and get the links from the specified column
                var links = [];
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    var cells = line.split(",");
                    var link = cells[columnNumber - 1];
                    links.push(link);
                }
                console.log('links, cloumn, siteURL' + links + columnNumber + siteUrl);

                // Remove the links from the site using fetch
                var promises = [];
                for (var j = 0; j < links.length; j++) {
                    var linkToRemove = links[j];
                    // Check if the link is defined and not empty
                    if (linkToRemove && linkToRemove.trim() !== "") {
                        var token = "YOUR_AUTH_TOKEN"; // replace this with your own token
                        var urlToRemove =
                            "https://search.google.com/search-console/remove?resource_id=" +
                            siteUrl +
                            "&url=" +
                            linkToRemove;
                        var headers = new Headers();
                        headers.append("Authorization", "Bearer " + token);
                        var promise = fetch(urlToRemove, { method: "POST", headers: headers });
                        promises.push(promise);
                    }
                }

                // Wait for all the promises to resolve and show a success message
                Promise.all(promises)
                    .then(function() {
                        let message =
                            "All links have been removed successfully from " + siteUrl;
                        alert(message);
                    })
                    .catch(function(error) {
                        let message =
                            "An error occurred while removing the links: " + error;
                        alert(message);
                    });
            } else {
                // Show an error message if the column number or site url are missing
                let message =
                    "Please enter a valid column number and site url in the pop-up page.";
                alert(message);
            }
        };
        reader.onerror = function() {
            // Show an error message if the file could not be read
            let message = "An error occurred while reading the file: " + reader.error;
            alert(message);
        };
    } else {
        // Show an error message if the file is missing or not a CSV file
        let message =
            "Please select a valid CSV file in the pop-up page.";
        alert(message);
    }
}
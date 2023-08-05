"use strict";


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  TAG METHODS

// method to get the user input in the search bar and divide the tags by if they are a "-" before it
const getTags = (tags) => {
    //Put every search query in one list
    tags = tags.split(" ");
    //Split list into two lists that separate wanted queries from unwanted queries (marked with -)
    const wantedTags = [];
    const unwantedTags = [];
    for(let i = 0; i < tags.length; i++){
        if(tags[i].charAt(0) == "-"){
            unwantedTags.push(tags[i]);
        }
        else {
            wantedTags.push(tags[i]);
        }
    }
    //remove the '-' from each query in the unwanted list
    for (let i = 0; i < unwantedTags.length; i++){
        unwantedTags[i] = unwantedTags[i].substring(1);
    }

    // Store the tags in local storage so that they can be accessed by the other pages
    localStorage.setItem("wantedlist",wantedTags);
    localStorage.setItem("unwantedlist",unwantedTags);
}
// VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV TAG METHODS

// Method to validate that user entered a non blank value in the searchbar
const valiateSideBarSearch = (userInput) => {
    let desiredtags = userInput.split(" ")
    if(!userInput == "" && desiredtags.length != 0 ){
        return true;
    }
}



$(document).ready( () => {

    // Getting the tags from the Navbar Search and doing proper validation
    $("#NavbarSearchButton").click(() => {
        let tagSearch = $("#NavbarSearchBar").val()
        if(valiateSideBarSearch(tagSearch)){
            // Do the tag Search
            getTags(tagSearch);
            $("#navbarSearchError").text("")
            window.location.href = "http://localhost:8080/pictureGrid.html";
        } else{
            $("#navbarSearchError").text("Please Enter your Desired tags seperated by a ,")
        }
    })


    // go to the post image page
    $("#toPostPage").click( () => {
        window.location.href = "http://localhost:8080/postImage.html";
    })


    // Validate the main searchbars input. If its valid, classify the tags and go to the picturegrid page
    $("#homepagebutton").click(() => {
        let tagInput = $("#homepagebar").val()
        if (tagInput == ""){
            $("#error").text("Please enter something"); 
        }
        else{
            getTags(tagInput);
            window.location.href = "http://localhost:8080/pictureGrid.html";
        }
    })
})


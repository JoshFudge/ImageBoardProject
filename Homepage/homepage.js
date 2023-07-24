"use strict";

const getTags = () => {
    const tags = $("#homepagebar").val().split(",");
    localStorage.setItem("list",tags);
    console.log(tags);


}





const valiateSideBarSearch = (userInput) => {
    let desiredtags = userInput.split(",")
    if(!userInput == "" && desiredtags.length != 0 ){
        return true;
    }
}


const validateComment = (UserComment) => {
    if(!UserComment == ""){
        return true;
    }
}

$(document).ready( () => {

    // Getting the tags frm the Navbar Search and doing proper validation
    $("#NavbarSearchButton").click(() => {
        let tagSearch = $("#NavbarSearchBar").val()
        if(valiateSideBarSearch(tagSearch)){
            // Do the tag Search
            $("#navbarSearchError").text("")
        } else{
            $("#navbarSearchError").text("Please Enter your Desired tags seperated by a ,")
        }
    })





    $("#homepagebutton").click(() => {
        if ($("#homepagebar").val() == ""){
            $("#error").text("Please enter something"); 
        }
        else{
            getTags();
        }
    })
})


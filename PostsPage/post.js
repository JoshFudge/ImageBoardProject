"use strict";

const getTags = () => {

}

const narrowSearch = () => {
    
}

const makeComment = () => {
    
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

    $("#NavbarSearchButton").click(() => {
        let tagSearch = $("#NavbarSearchBar").val()
        if(valiateSideBarSearch(tagSearch)){
            // Do the tag Search
            $("#navbarSearchError").text("")
        } else{
            $("#navbarSearchError").text("Please Enter your Desired tags seperated by a ,")
        }
    })






    $("#postComment").click( () => {
        let comment = $("#commentArea").val();
        console.log(comment)

        if(validateComment(comment)){
            // Do the posting
        } else{
            $("#commentError").text("Please Enter a comment before posting!");
        }
        
    } )



})
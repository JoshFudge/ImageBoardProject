"use strict";

const getTags = () => {
    //Put every search query in one list
    const tags = $("#NavbarSearchBar").val().split(" ");
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
    localStorage.setItem("wantedlist",wantedTags);
    localStorage.setItem("unwantedlist",unwantedTags);
    console.log(tags);
    console.log(wantedTags);
    console.log(unwantedTags);

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
            getTags();
            window.location.href = "http://127.0.0.1:5500/PictureGridPage/picturegrid.html";
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
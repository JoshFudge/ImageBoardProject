"use strict";

const valiateSideBarSearch = (userInput) => {
    let desiredtags = userInput.split(",")
    if(!userInput == "" && desiredtags.length != 0 ){
        return true;
    }
}

//Should getTags take a list of tags from the search bar?
const getTags = () => {
//Maybe needs to have a for-loop in here somewhere? eg. for each tag in the list, it does the code displayed below?
    $(`<div class="grid-item">`+
    `<img id = "photo" src = ${url}>`+
`</div>`)
    .appendTo('#grid-container');
}

const openPost = () => {

}

const narrowSearch = () => {
    
}

//TODO figure out how to get the image object onto the piture grid page

const getImages = async (imageID) => {
    const image = await fetch("http://localhost:8080/images/"+imageID)
    if(image.status > 299 || topic.status < 200) {
        throw Error("Invalid Image ID")
    }
    return image
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
    

    $("#")

})




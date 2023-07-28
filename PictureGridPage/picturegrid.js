"use strict";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  TAG METHODS
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


const postTags = async(tags) => {
    let postingURL = "/search";
    let contents = JSON.stringify({
        goodTags: tags[0],
        badTags: tags[1]
    })
    try{
        fetch(postingURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: contents
        }).then(res => {
            if(!res.ok){
                throw new Error('Network Died ' +res.status)
            }
        })
    }catch(e){
        console.log(e)
    }
}


const getWantedTags = () => {
    let gTags = localStorage.getItem("wantedlist");
    let bTags = localStorage.getItem("unwantedlist");
    let tagList = [gTags,bTags]
    console.log(tagList)
    return tagList
}



//Should getTags take a list of tags from the search bar?
const displayTags = () => {
    //Maybe needs to have a for-loop in here somewhere? eg. for each tag in the list, if it matches a tag on one or more of the json objects, display the image in the grid
        $(`<div class="grid-item">`+
        `<img id = "photo" src = ${url}>`+
    `</div>`)
        .appendTo('#grid-container');
}


// VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV TAG METHODS













////////////////////////////////////// ANCILLARY METHODS

const valiateSideBarSearch = (userInput) => {
    let desiredtags = userInput.split(",")
    if(!userInput == "" && desiredtags.length != 0 ){
        return true;
    }
}

////////////////////////////////////// ANCILLARY METHODS









const openPost = () => {

}

const narrowSearch = () => {
    
}




//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ IMAGE METHODS


//TODO figure out how to get the image object onto the piture grid page

const getImages = async (imageID) => {
    const image = await fetch("http://localhost:8080/images/"+imageID)
    if(image.status > 299 || topic.status < 200) {
        throw Error("Invalid Image ID")
    }
    return image
}

//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV IMAGE METHODS



$(document).ready( () => {
    let Tags = getWantedTags()
    postTags(Tags)

    // TODO get tag post from local storage, make post, fetch tags 




    $("#NavbarSearchButton").click(() => {
        let tagSearch = $("#NavbarSearchBar").val()
        if(valiateSideBarSearch(tagSearch)){
            // Do the tag Search
            $("#navbarSearchError").text("")
            getTags();
            window.location.href = "http://localhost:8080/pictureGrid.html";
        } else{
            $("#navbarSearchError").text("Please Enter your Desired tags seperated by a ,")
        }
    })
    

    //TODO Make this apply to every image, not just the first one
    $(".grid-item").click(() => {
        window.location.href = "http://localhost:8080/post.html";
    })

    $("#uploadImageButton").click(() => {
        window.location.href = "http://localhost:8080/postImage.html";
    })

})




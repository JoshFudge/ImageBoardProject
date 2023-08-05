"use strict";

// method to get the user input tags if the sidebar searchbar is used
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


// Method to make a new comment and post it to the backend
const makeComment = async (imgID,content) => {
    const bodyContents = JSON.stringify({
        "comment": content
    })
    const settings = JSON.stringify({
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }})
    fetch("http://localhost:8080/image/"+imgID+"/comment", 
        {   settings,
            method: "POST",
            body: bodyContents
        }
    ).then( (response) => { 
        if(response.status < 200 || response.status > 299){
            throw Error(e);
        }
    });
}

// Method to fetch an image from the backend using its imageid
const getImage = async (imageID) => {
    const image = await fetch("http://localhost:8080/image/"+imageID);
    if(image.status > 299 || image.status < 200) {
        throw Error("Invalid Image ID")
    }
    return image
}

// Method to get a comment
const getComments = async (imgID) => {
    return await fetch("http://localhost:8080/image/"+imgID+"/comment")
}



// Method to check if the search bar search is a valid entry
const valiateSideBarSearch = (userInput) => {
    let desiredtags = userInput.split(",")
    if(!userInput == "" && desiredtags.length != 0 ){
        return true;
    }
}

// Method to check if the users comment is a valid entry
const validateComment = (UserComment) => {
    if(!UserComment == ""){
        return true;
    }
}


// method to display all the image information
const displayPage = async () => {
    // ge the id from local storage
    let selected = localStorage.getItem("imageSelected")
    console.log(selected)

    // get the image objec and display the url as a html image
    let imagePromise = await getImage(selected)
    let imageString = await imagePromise.json()
    console.log(imageString["URL"])
    $(`<img id = photopost src = ${imageString["URL"]}>`).appendTo("#imageDiv")

    let imageTags = []

    // for each of the images tags push it to a list
    for(let i = 0; i< imageString["tags"].length; i++){
        let currentTags = imageString["tags"]
        for (const tag of currentTags) {
            if(!imageTags.includes(tag)) {
                imageTags.push(tag)
            }

        }
    }
    // for each tag in the list, display it on the sidebar
    for(let i = 0; i< imageTags.length; i++){
        $(`<li> ${imageTags[i]}</li>`).appendTo("#imageTagsList")
    }

    // get all the comments for the image object
    let imgCommentPromise= await getComments(imageString["imageID"])
    let imgCommentJSON = await imgCommentPromise.json()
    let individualComments = imgCommentJSON["response"].split(",")

    // display each comment on the html 
    if(individualComments[0] != ""){
        for(let i = 0; i < individualComments.length; i++){
            $(`<div class="individualComment"> `+
            `<h3>Anonymous Says:</h3>`+
            `<p>${individualComments[i]}</p>` +
        `</div>`).appendTo(".CommentDiv")
        }
    }

}


$(document).ready( () => {
    // display the image info
    displayPage()

    // if the sidebar searchbar is used, do the proper validation and search
    $("#NavbarSearchButton").click(() => {
        let tagSearch = $("#NavbarSearchBar").val()
        if(valiateSideBarSearch(tagSearch)){
            // Do the tag Search
            $("#navbarSearchError").text("")
            getTags();
            // navigate to the picture grid page
            window.location.href = "http://localhost:8080/pictureGrid.html";
        } else{
            $("#navbarSearchError").text("Please Enter your Desired tags seperated by a ,")
        }
    })


    $("#postComment").click( async () => {
        try{
            let comment = $("#commentArea").val();
    
            if(validateComment(comment)){
                // Do the posting
                let currentImageID = parseInt(localStorage.getItem("imageSelected"))
                //  Make the new comment 
                await makeComment(currentImageID,comment)


                // refresh the page with the new comment
                window.location.href = "http://localhost:8080/post.html";


            } else{
                $("#commentError").text("Please Enter a comment before posting!");
            }
        }catch(e){
            console.log(e)
        }

        
    } )



})
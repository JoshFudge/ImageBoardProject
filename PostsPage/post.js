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


// Method to make a new comment object
// const makeComment = async (imgID,content) => {
//     const bodyContents = JSON.stringify({
//         "contents": content
//     })
//     const settings = JSON.stringify({
//         headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }})
//     fetch("http://localhost:8080/image"+imgID+"/comment", 
//         {   settings,
//             method: "POST",
//             body: bodyContents
//         }
//     ).then( (response) => { 
//         if(response.status < 200 || response.status > 299){
//             throw Error(e);
//         }
//         $(
//             `<h3> User: Josh<h3>`+
//             `<p>${content}<p>`
//         )
//         .appendTo('#CommentDiv');

//     });
// }

// Method to get an image
const getImage = async (imageID) => {
    const image = await fetch("http://localhost:8080/image/"+imageID);
    if(image.status > 299 || image.status < 200) {
        throw Error("Invalid Image ID")
    }
    return image
}

// Method to get a comment
const getComment = async (imgID) => {
    return await fetch("http://localhost:8080/image/"+imgID+"/comment")
}

// Method to get all comments
const getAllComments = async(allCommentIDs) => {
    const commentsContainer = [];
    for (let i = 0; i< allCommentIDs.length; i++) {
        const commentID = allCommentIDs[i];
        const commentPromise = await getComment(commentID);
        const comment = await commentPromise.json();
        commentsContainer.push(comment);
    }
    return commentsContainer;

}

// Method to update the image with all the comments including the newly posted one
// const updateImageWithComment = async (commentID, imageID) => {
//     const image = await fetch(`http://localhost:8080/addComment/${commentID}/toImage/${imageID}`);
//     if(image.status > 299 || image.status < 200) {
//         throw Error("Invalid Topic ID")
//     }
//     return image
// }

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


const displayPage = async () => {
    let selected = localStorage.getItem("imageSelected")
    console.log(selected)

    let imagePromise = await getImage(selected)
    let imageString = await imagePromise.json()
    console.log(imageString["URL"])
    $(`<img id = photopost src = ${imageString["URL"]}>`).appendTo("#test")

    let imageTags = []

    for(let i = 0; i< imageString["tags"].length; i++){
        let currentTags = imageString["tags"]
        for (const tag of currentTags) {
            if(!imageTags.includes(tag)) {
                imageTags.push(tag)
            }

        }
    }
    for(let i = 0; i< imageTags.length; i++){
        $(`<li> ${imageTags[i]}</li>`).appendTo("#imageTagsList")
    }




}


$(document).ready( () => {
    displayPage()

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


    //TODO get comments working

    // getComment()

    $("#postComment").click( async () => {
        try{
            let comment = $("#commentArea").val();
            console.log(comment)
    
            if(validateComment(comment)){
                // Do the posting

                const imageID = 1;// get the image id here
                const imagePromise = await getImage(imageID)
                const image = await imagePromise.json();

                const commentIDs = image.comments;
                const comments = await getAllComments(commentIDs)

                const lastCommentId = commentIDs[postIDs.length -1];
                const newCommentId = imageID
                    .concat("-")
                    .concat(Number(lastCommentId.split('-')[1])+1);


                // Make the new comment object
                await makeComment(newCommentId,comment)
                // Update the current image with the new comment?
                await updateImageWithComment(newCommentId,imageID)

                $("#commentArea").val("");


            } else{
                $("#commentError").text("Please Enter a comment before posting!");
            }
        }catch(e){
            console.log(e)
        }

        
    } )



})
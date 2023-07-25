"use strict";

const getTags = () => {

}

const narrowSearch = () => {
    
}



// Method to make a new comment object
const makeComment = async (commentID,content) => {
    const bodyContents = JSON.stringify({
        "contents": content
    })
    const settings = JSON.stringify({
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }})
    fetch("http://localhost:8080/comment/"+commentID, 
        {   settings,
            method: "post",
            body: bodyContents
        }
    ).then( (response) => { 
        if(response.status < 200 || response.status > 299){
            throw Error(e);
        }
        $(
            `<h3> User: Josh<h3>`+
            `<p>${content}<p>`
        )
        .appendTo('#CommentDiv');

    });
}

// Method to get an image
const getImage = async (imageID) => {
    const image = await fetch("http://localhost:8080/images/"+imageID);
    if(image.status > 299 || image.status < 200) {
        throw Error("Invalid Image ID")
    }
    return image
}

// Method to get a comment
const getComment = async (CommentID) => {
    return await fetch("http://localhost:8080/comment/"+CommentID)
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
const updateImageWithComment = async (commentID, imageID) => {
    const image = await fetch(`http://localhost:8080/addComment/${commentID}/toImage/${imageID}`);
    if(image.status > 299 || image.status < 200) {
        throw Error("Invalid Topic ID")
    }
    return image
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


    //TODO get comments working



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
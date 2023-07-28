"use strict";



const postImage = async (imgID,imgURL,imgTags) => {
    let postingURL = "image/"+imgID;
    let contents = JSON.stringify({
        imageID: imgID,
        URL: imgURL,
        tags: imgTags,
        comments: []
    })
    try{
        fetch(postingURL, {
           method: 'POST',
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           } ,
           body: contents
        }).then(res => {
            if(res.ok){
                return contents;
            }else{
                throw new Error('Network Died ' +res.status)

            }
        })
    }catch{
        console.log("ERROR!!!!")
    }
}

$(document).ready(() => {

$("#uploadImageButton").click( async () => {

    try{
        let imgURL = $("#picurl").val();
        let tagInput = $("#pictags").val();
        let imageTags = tagInput.split(" ");
        postImage(2,imgURL,imageTags)
        $("#pictags").val("");
        $("#picurl").val("");
    }catch (e){
        console.log(e)
    }
})

$("#returnToHome").click( () => {
    window.location.href = "http://localhost:8080/homepage.html";
})


} )

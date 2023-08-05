"use strict";

// method to fetch athe total number of images from the backend
const getImageTotal = async () => {
    return await fetch("/allImages")
}

// Method to post the users image to the backend
const postImage = async (imgID,imgURL,imgTags) => {
    let postingURL = "image/"+imgID;
    let contents = JSON.stringify({
        imageID: `"${imgID}"`,
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

// when the user attempts to post an image
$("#uploadImageButton").click( async () => {

    // get the total number of existing images from the backend
    if($("#picurl").val() != "" && $("#pictags").val() != ""){
        try{
            let imagetotalpromise = await getImageTotal()
    
            let totalObjectJson = await imagetotalpromise.json()
            let string = JSON.stringify(totalObjectJson)
            console.log(string)
            let totalmgsString = parseInt(totalObjectJson["response"])
            console.log(totalmgsString)
            // get the values from the user input
            let imgURL = $("#picurl").val();
            let tagInput = $("#pictags").val();
            let imageTags = tagInput.split(" ");
    
            // post the image on the backend with the user entered values
            postImage(totalmgsString+1,imgURL,imageTags)
            $("#pictags").val("");
            $("#picurl").val("");
        }catch (e){
            console.log(e)
        }
    }

})

// when clicked, return to the homepage
$("#returnToHome").click( () => {
    window.location.href = "http://localhost:8080/homepage.html";
})


} )

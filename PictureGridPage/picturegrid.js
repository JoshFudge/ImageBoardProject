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
    console.log(wantedTags);
    localStorage.setItem("unwantedlist",unwantedTags);
    console.log(unwantedTags);
    window.location.href = "http://localhost:8080/pictureGrid.html";

}
const getWantedTags = () => {
    let gTags = localStorage.getItem("wantedlist");
    let bTags = localStorage.getItem("unwantedlist");
    let tagList = [gTags,bTags]
    // console.log(tagList)
    return tagList
}

const postTags = async(tags) => {
    let postingURL = "/search";
    let contents = JSON.stringify({
        goodTags: tags[0],
        badTags: tags[1]
    })
    try{
       const x = await fetch(postingURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: contents
        })
            if(!x.ok){
                throw new Error('Network Died ' +res.status)
            }
            return await x.json()
    }catch(e){
        console.log(e)
    }
}


// VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV TAG METHODS













////////////////////////////////////// ANCILLARY METHODS

const valiateSideBarSearch = (userInput) => {
    let desiredtags = userInput.split(",")
    if(!userInput == "" && desiredtags.length != 0 ){
        return true;
    }
}

const getImagesAndDisplayPage = async () => {
    let tags = getWantedTags()
    let tagsPromise = await postTags(tags)
    let tagsPromiseString = JSON.stringify(tagsPromise)
    let imageIdsReturnedObject = JSON.parse(tagsPromiseString)
    let imageIdsReturned = imageIdsReturnedObject.response
    let imgIDlist = imageIdsReturned.split(",")
    console.log(imgIDlist)

    let imglist = []
    for(let i=0; i < imgIDlist.length; i++){
        if(imgIDlist[i] != ""){
        let currentImg = await getImages(imgIDlist[i])
        let currentImgString = JSON.stringify(currentImg)
        imglist.push(currentImgString);
        console.log("IMAGELIST: "+ imglist)
        }
    }

    for(let i = 0; i < imglist.length; i++){
        let currentImage = JSON.parse(imglist[i])
    
        $(`<div class="grid-item">`+
        `<img id = "${currentImage.imageID}" src = "${currentImage.URL}">`+
        `</div>`).appendTo(".grid-container")
    }

    let imageTags = []
    for(let i = 0; i< imglist.length; i++){
        let currentImage = JSON.parse(imglist[i])
        let currentTags =currentImage.tags
        for (const tag of currentTags) {
            if(!imageTags.includes(tag))
            imageTags.push(tag)
        }
    }
    for(let i = 0; i< imageTags.length; i++){
        $(`<li> ${imageTags[i]}</li>`).appendTo("#imageTagsList")
    }
}

////////////////////////////////////// ANCILLARY METHODS


//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ IMAGE METHODS


//TODO figure out how to get the image object onto the piture grid page

const getImages = async (imageID) => {
    const image = await fetch("http://localhost:8080/image/"+imageID)
    if(image.status > 299 || image.status < 200) {
        throw Error("Invalid Image ID")
    }
    return await image.json()
}

const storeImageID = (imageID) => {

    localStorage.setItem("imageSelected",imageID)
}

//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV IMAGE METHODS


$(document).ready( async () => {
    getImagesAndDisplayPage()


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
    

    $(".grid-container").click((evt) => {

        let imgSelected = evt.target

        console.log(imgSelected)
        if(imgSelected["id"]){
            storeImageID(imgSelected["id"])
            window.location.href = "http://localhost:8080/post.html";
        }

        
    })

    $("#uploadImageButton").click(() => {
        window.location.href = "http://localhost:8080/postImage.html";
    })

})




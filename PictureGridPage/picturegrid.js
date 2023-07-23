"use strict";

const getTags = () => {

}

const openPost = () => {

}

const narrowSearch = () => {
    
}

//TODO figure out how to get the image object onto the piture grid page

const getImages = async (imageID) => {
    const image = await fetch("http://localhost:8080/images/"+imageID)
    if(image.status > 299 || topic.status < 200) {
        throw Error("Invalid Topic ID")
    }
    return image
}
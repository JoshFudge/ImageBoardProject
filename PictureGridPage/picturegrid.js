"use strict";

const getTags = () => {

}

const openPost = () => {

}

const narrowSearch = () => {
    
}



const getImages = async (imageID) => {
    const image = await fetch("http://localhost:8080/images/"+imageID)
    if(image.status > 299 || topic.status < 200) {
        throw Error("Invalid Topic ID")
    }
    return image
}
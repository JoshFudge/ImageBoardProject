"use strict";
const fs = require('fs').promises;
const http = require('http');

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^ ANCILLARY METHODS
const getFile = (res, filePath, contentType) => {
    res.writeHead(200, {'Content-Type': contentType});
    fs.readFile(filePath)
    .then(content => res.write(content))
    .then(_ => res.end());
}

// VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV ANCILLARY METHODS


// ^^^^^^^^^^^^^^^^^^^^^^^^^^ TAG METHODS

const checkForMatch = (imgTags,TagsSearched) => {
    let flag = false;
    for(let i = 0; i < imgTags.length; i++){
        // console.log("IMGTAGS: "+ imgTags + typeof(imgTags))

        // console.log("INCLUDE: "+TagsSearched[0]+ typeof(TagsSearched[0]))
        // console.log("Exclude: "+TagsSearched[1]+ typeof(TagsSearched[1]))
        if(imgTags.includes(TagsSearched[0]) && !imgTags.includes(TagsSearched[1])){

            // console.log("imgTags INCLUDES "+ TagsSearched[0])
            flag = true
        }
    }
    return flag
}

const getTagSearch = async (res,tags) => {
fs.readFile("allImages.json")
.then(content => {
    let results = JSON.parse(content)
    let imagesList = results.allImages;

    let imagesThatPass = []

    let responseString = "";


    // For each image Object
    for(let i = 0; i < imagesList.length; i++){
        // get that objects tags
        let stringTags =  imagesList[i].tags
        console.log("This images Tags: "+ stringTags)

        if(checkForMatch(stringTags,tags)){
            console.log(imagesList[i].imageID)
            imagesThatPass.push(imagesList[i].imageID)

        }

    }
    for(let i = 0; i < imagesThatPass.length; i++){
        responseString += (imagesThatPass[i] + ",")
    }
    console.log("images That Pass: "+responseString)
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write('{"response":"'+responseString+`"}`);
    res.end();
})







}

// VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV TAG METHODS



//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ COMMENT METHODS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


const getComments = (res,imageID) => {
//  Get the list of comments associated with this Image-ID
    fs.readFile("images/"+imageID+".json")
    .then(content => {
        const imgData = JSON.parse(content)
        let imgComments = imgData.comments
       
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write('{"response":"'+imgComments+`"}`);
        res.end();
    }).catch( _ => {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.write('{"error": "No post for given ID"}');
        res.end();
    });
}

const makeComment = (res, commentID, contents) => {
    fs.writeFile("images/comments/"+commentID+".json",
    `{
        "comment-id": "${commentID}",
        "content": "${contents}"
    }`
    ).then( content => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write("");
            res.end();
        }).catch( _ => {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.write('{"error": "No post for given ID"}');
            res.end();
        });
}

//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV COMMENT METHODS VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV



////////////////////////////////// IMAGE METHODS

const getImage = (res, imageID) => {
    // return an image’s JSON object from its JSON file, using the
// unique Image-ID to find the image.
fs.readFile("images/"+imageID+".json")
.then(content => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(content);
    res.end();
}).catch( _ => {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.write('{"error": "No topic for given ID"}');
    res.end();
});
}

// Method to make new imge JSON file
const makeNewImage = (res, imageID,imageURL, imageTags) => {
    imageID = getImageCount()
    fs.writeFile("images/"+imageID+".json",
    `{
        "image-id": "${imageID}",
        "URL": "${imageURL}",
        "tags": "[${imageTags}]",
        "comments": []
    }`
    ).then( content => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write("");
            res.end();
        }).catch( _ => {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.write('{"error": "No image for given ID"}');
            res.end();
        });
}

const addImageToImageStorage = async (img) => {
    fs.readFile(`allImages.json`)
    .then(content => {
        const imgList = JSON.parse(content);
        imgList.allImages.push(img);
        return fs.writeFile(`allImages.json`, JSON.stringify(imgList))
    }
    )
}

// Method to get total images to automate imageIDs
const getImageCount = async() => {
    await fs.readFile(`allImages.json`)
    .then(content => {
        const imgTotal = JSON.parse(content)
        // console.log(imgTotal)
        console.log("here: "+imgTotal.allImages.length)
        let total = imgTotal.allImages.length
        
        return total;
    })
}
////////////////////////////////// IMAGE METHODS



http.createServer(  (req, resp) => {
const path = req.url.split('/');
console.log(path);
// Sync up the homepage files
if(path[1] === "" || path[1] === "homepage.html"){
    getFile(resp, "Homepage/" + path[1], "text/html");
} else if(path[1] === "homepage.css"){
    getFile(resp, "homepage/"+ path[1], "text/css")
}else if(path[1] === "homepage.js"){
    getFile(resp, "homepage/"+ path[1], "text/javascript")
}
// Sync up the picture grid files
else if(path[1] === "pictureGrid.html"){
    getFile(resp, "PictureGridPage/"+ path[1], "text/html")
}else if(path[1] === "picturegrid.css"){
    getFile(resp, "PictureGridPage/"+ path[1], "text/css")
}else if(path[1] === "picturegrid.js"){
    getFile(resp, "PictureGridPage/"+ path[1], "text/javascript")
}
// Sync up the post files
else if(path[1] === "post.html"){
    getFile(resp, "PostsPage/"+ path[1], "text/html")
}else if(path[1] === "posts.css"){
    getFile(resp, "PostsPage/"+ path[1], "text/css")
}else if(path[1] === "post.js"){
    getFile(resp, "PostsPage/"+ path[1], "text/javascript")
}
else if(path[1] === "postImage.html"){
    getFile(resp, "PostImagePage/"+ path[1], "text/html")
}else if(path[1] === "postImage.css"){
    getFile(resp, "PostImagePage/"+ path[1], "text/css")
}else if(path[1] === "postImage.js"){
    getFile(resp, "PostImagePage/"+ path[1], "text/javascript")
}
else if (path[1] === "image"){

    if(req.method == "POST"){
        let body ="";
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end',async () => {
            //TODO make the getImageCOunt method return a number not undefined
            let totalImages =  await getImageCount()
            console.log("TOTAL: "+ totalImages)
            // let bodyObject = JSON.parse(body)
            // let printablebodyObject = JSON.stringify(bodyObject)
            // console.log(printablebodyObject);
            // makeNewImage(resp,(totalImages+1),bodyObject['URL'],bodyObject['tags'])
            // // -----> This breaks the server, idk why
            // addImageToImageStorage(bodyObject) 

        });
    }else if (req.method == "GET"){

        if(path[1]== "image" && path[3] === "comment"){
            console.log("HERE")
            getComments(resp,path[2])
        }
        else if(path[1]== "image"){
            getImage(resp,path[2])
        }
    }

}else if (path[1] == "search"){
    let body = "";
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', async () => {
        let bodyObject = JSON.parse(body)
        let printablebodyObject = JSON.stringify(bodyObject)

        let good = bodyObject['goodTags'];
        let bad = bodyObject['badTags'];
        let allTs = [good,bad]
        console.log(allTs)
        getTagSearch(resp,allTs)
    })
}



else {
    resp.writeHead(404, {'Content-Type': 'text/html'});
    resp.write(
        "<html><head></head><body><p>Oops! nooooo content here.</p></body><html/>"
    );
    resp.end();
}
}).listen(8080)
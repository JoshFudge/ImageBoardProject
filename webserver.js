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

const getTagSearch = async (res,) => {
fs.readFile("allImages.json")
.then(content => {
    let results = JSON.parse(content)
    let imagesList = results.allImages;

    // let x = getTagSearchFromPost()

    for(let i = 0; i <= imagesList.length; i++){
        //TODO get the tag search from the post
        if (imagesList[i].tags){}
    }
    let stringResults = JSON.stringify(results.allImages[0])
    console.log(stringResults)
})

}

// VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV TAG METHODS



//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ COMMENT METHODS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


const getComments = (res,imageID) => {
//  Get the list of comments associated with this Image-ID
    fs.readFile("images/"+imageID+".json")
    .then(content => {
        const imgData = JSON.parse(content)
        console.log(imgData)
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(content);
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
        "tags": "${imageTags}",
        "comments": []
    }`
    ).then( content => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            // res.write()
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
const getImageCount = () => {
    fs.readFile(`allImages.json`)
    .then(content => {
        const imgTotal = JSON.parse(content)
        console.log(imgTotal)
        console.log(imgTotal.allImages.length)
        return imgTotal.allImages.length;
    })
}
////////////////////////////////// IMAGE METHODS



http.createServer(  (req, resp) => {
const path = req.url.split('/');
console.log(path);
// Sync up the homepage files
if(path[1] === "" || path[1] === "homepage.html"){
    getFile(resp, "Homepage/" + path[1], "text/html");
    console.log("HERE");
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
            let totalImages =  getImageCount()
            let bodyObject = JSON.parse(body)
            let printablebodyObject = JSON.stringify(bodyObject)
            console.log(printablebodyObject);
            makeNewImage(resp,(parseInt(totalImages)+1),bodyObject['URL'],bodyObject['tags'])
            // -----> This breaks the server, idk why
            addImageToImageStorage(bodyObject) 

        });
    }else if (req.method == "GET"){
        if(path[3] === "comment"){
            getComments(res,path[2])
        }
    }

}else if (path[1] == "search"){
    getTagSearch(resp)
}



else {
    resp.writeHead(404, {'Content-Type': 'text/html'});
    resp.write(
        "<html><head></head><body><p>Oops! nooooo content here.</p></body><html/>"
    );
    resp.end();
}
}).listen(8080)
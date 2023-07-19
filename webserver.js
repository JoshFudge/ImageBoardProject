"use strict";

const http = require('http');
const fs = require('fs').promises;

//TODO the API shit
const getFile = (res, filePath, contentType) => {
    res.writeHead(200, {'Content-Type': contentType});
    fs.readFile(filePath)
    .then(content => res.write(content))
    .then(_ => res.end());
}


const getTagSearch = () => {
    // return a list of all Image-IDs
// who’s JSON files contain all
// tags from the body not starting with “-” and contain none
// of the tags starting with “-”.



}

const getImages = () => {
    // return an image’s JSON object from its JSON file, using the
// unique Image-ID to find the image.


}

const postImage = () => {
//  Create a new image JSON file
// for this Image-ID and make the
// provided URL from the body a
// field of this object.

}

const getComment = () => {
//  Get the list of comments associated with this Image-ID
}


const makeComment = () => {
    // Add a new comment to the list
    // of comments for an Image-ID.
    // The contents of the comment
    // will be in the body.



}





http.createServer( (req, resp) => {
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
else {
    resp.writeHead(404, {'Content-Type': 'text/html'});
    resp.write(
        "<html><head></head><body><p>Oops! nooooo content here.</p></body><html/>"
    );
    resp.end();
}
}).listen(8080)
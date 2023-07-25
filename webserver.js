"use strict";


const fs = require('fs').promises;
const http = require('http');


const getFile = (res, filePath, contentType) => {
    res.writeHead(200, {'Content-Type': contentType});
    fs.readFile(filePath)
    .then(content => res.write(content))
    .then(_ => res.end());
}

////////////// WE NEED:

// 1) A post /search (Tags) ----------------------- All Pages

// 2) A get /image/ImageID ------- PictureGrid, Post

// 3) A post /image/ImageID --------- PostImage Page

// 4) A get image/imageID/comment ------ Post Page

// 5) A post image/imageId/comment ------ Post Page




const getTagSearch = () => {
    // return a list of all Image-IDs
// who’s JSON files contain all
// tags from the body not starting with “-” and contain none
// of the tags starting with “-”.



}

// Part 2
const getImages = (res, imageID) => {
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

const postImage = () => {
//  Create a new image JSON file
// for this Image-ID and make the
// provided URL from the body a
// field of this object.

}


/// Part
const getComment = (res,CommentID) => {
//  Get the list of comments associated with this Image-ID
    fs.readFile("images/comments/"+CommentID+".json")
    .then(content => {
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

else if(path[1] === "postImage.html"){
    getFile(resp, "PostImagePage/"+ path[1], "text/html")
}else if(path[1] === "postImage.css"){
    getFile(resp, "PostImagePage/"+ path[1], "text/css")
}else if(path[1] === "postImage.js"){
    getFile(resp, "PostImagePage/"+ path[1], "text/javascript")
}
else {
    resp.writeHead(404, {'Content-Type': 'text/html'});
    resp.write(
        "<html><head></head><body><p>Oops! nooooo content here.</p></body><html/>"
    );
    resp.end();
}
}).listen(8080)
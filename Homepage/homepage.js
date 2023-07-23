"use strict";

const getTags = () => {
    const tags = $("#homepagebar").val().split(",");
    localStorage.setItem("list",tags);
    console.log(tags);


}

$(document).ready( () => {
    $("#homepagebutton").click(() => {
        if ($("#homepagebar").val() == ""){
            $("#error").text("Please enter something"); 
        }
        else{
            getTags();
        }
    })
})


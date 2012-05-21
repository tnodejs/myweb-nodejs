$(".anonymous_sign_in").click(function(){
    $(getDisplayBlockObj()).fadeOut("slow",function(){
        $(".anonymous_sign_in_part").fadeIn("slow");
    });
});

$(".sign_up").click(function(){
    $(getDisplayBlockObj()).fadeOut("slow",function(){
        $(".sing_up_part").fadeIn("slow");
    });
});

$(".find_password_button").click(function(){
    $(getDisplayBlockObj()).fadeOut("slow",function(){
        $(".find_password_part").fadeIn("slow");
    });
});

$(".login_part_button").click(function(){
    $(getDisplayBlockObj()).fadeOut("slow",function(){
        $(".login_part_erea").fadeIn("slow");
    });
});

function getDisplayBlockObj(){
    var objArray = $('.display_state');
    for(var i=0;i<objArray.size();i++){
        if(objArray[i].style.display != "none"){
            return objArray[i];
        }
    }
    return null;
}

$("#login_picture").imageView({
    lastIndex     : 27,
    imagePreName  : "shot",
    imageLastName : "jpg"
});

$(".button").attr({"hidefocus":true});

/*
 * for data send to server
 */
$.document.ready(function(){
    $("#login_to_system").click(function(){

    });
});
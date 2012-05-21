//code by huangdanhua 2011-10-01

//code for nav list operation
$("#person_chat").click(function(){
    makeSubNavListDisplay("person_chat");
});
$("#group_chat").click(function(){
    makeSubNavListDisplay("group_chat");
});
$("#friend_chat").click(function(){
    makeSubNavListDisplay("friend_chat");
});
$("#friend_list").click(function(){
    makeSubNavListDisplay("friend_list");
});
function makeSubNavListDisplay(string){
    if($("."+string).css("display") == "block"){
        $("."+string).css("display" ,"none");
    }
    else{
        $(".person_chat").get(0).style.display = "none";
        $(".group_chat").get(0).style.display = "none";
        $(".friend_chat").get(0).style.display = "none";
        $(".friend_list").get(0).style.display = "none";
        $("."+string).css("display" ,"block");
    }
}

//code for chat box;
$(".sub_nav_list_item>a").click(function(){
    if($("#dBox").length>0){
        $("#d_head").remove();
        var className = $("#dBox").attr("class");
        $("#dBox").attr({
            id:className,
            style:"display:none",
            "class":""
        });
    }
    $("#chating_area").dBox({});
});

$('.sub_friend_list_item').click(function(){
    if($(this).attr("id")=="friend_operation"){
        return;
    }
    if($("#dBox").length>0){
        $("#d_head").remove();
        var className = $("#dBox").attr("class");
        $("#dBox").attr({
            id:className,
            style:"display:none",
            "class":""
        });
    }
    $("#person_message").dBox({});
});  

$("#system_list").click(function(){
    if($("#dBox").length>0){
        $("#d_head").remove();
        var className = $("#dBox").attr("class");
        $("#dBox").attr({
            id:className,
            style:"display:none",
            "class":""
        });
    }
    $("#system_message").dBox({});
});

//insert for emation tools
$("#feel_like").click(function(){ 
    var impressionexDom = document.createElement("div");
    $(impressionexDom).attr({
        id:"impressionex_sub_tools"
    });
    var impressionexTitle = document.createElement("div");
    $(impressionexTitle).attr({
        id:"impressionex_title"
    });
    var impressionexContent = document.createElement("div");
    $(impressionexContent).attr({
        id:"impressionex_content"
    });
    $(impressionexDom).append(impressionexTitle);
    $(impressionexDom).append(impressionexContent);
    $(impressionexDom).confirm({
        width:"600px",
        height:"100px",
        issystem:"1"
    }); 
});



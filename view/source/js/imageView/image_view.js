/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * by danhuang:2011-11-06
 */

(function ($) {
 /*
  * function for dBox,you can call it as bleow
  * imageView(source:"",contefirstIndexnt:1)
  * source: the image_view source path such as /data/js/image_view
  * firstIndex: the first image out put in the view page
  * lastIndex: how much image in the source file
  * height: null
  * imagePreName: all of the image previoue name such as my_1.jpg,then the previous name is my
  * imageLastName: the type of the image,such as my_1.jpg ,then the last name is jpg
  * buttonTop: the go left button and the go right button margin-top 
  * buttonWidth: distance of the left button and right button
  * speed: the speed autimatucally go next image
  * autimatucally: if we need the image autimatucally go next image set it true, else set false
  */
    $.fn.imageView = function (options) {
        var variables = {
            source        : "",
            firstIndex    : 1,
            lastIndex     : 20,
            height        : "60px",
            imagePreName  : "my",
            imageLastName : "gif",
            buttonTop     : "220px",
            buttonLeft    : "197px",
            buttonWidth   : "338px",
            speed         : 8000,
            autimatucally : true
        }
        var opts = $.extend(variables, options);
        var t;
        var count = 0;
        var thisDom = $(this);
        var imageDom = $(this).find("img").first();
        var imageClass = $(imageDom).attr("class");
        var srcName = imageDom.attr("src");
        var marginTop = parseInt($(imageDom).css("margin-top"));
        var marginLeft = parseInt($(imageDom).css("margin-left"));
        var imageHeight = parseInt($(imageDom).css("height"));
        var imageWidth = parseInt($(imageDom).css("width"));
        var leftButton = document.createElement("img");
        var rightButton = document.createElement("img");
        setSrcIndexNumber(srcName); 
        createTimeOut();
        $(this).append(leftButton);
        $(this).append(rightButton);
        $(leftButton).attr({
            "src"   : "source/js/imageView/source/left.png",
            "class" : "left_image_button image_button",
            "style" : "display:none;top:" + opts.buttonTop + ";left:" + opts.buttonLeft
        });
        $(rightButton).attr({
            "src"   : "source/js/imageView/source/right.png",
            "class" : "right_image_button image_button",
            "style" : "display:none;top:" + opts.buttonTop + ";left:" + (parseInt(opts.buttonLeft)+parseInt(opts.buttonWidth)) + "px;"
        });
        $(this).mouseover(function(){
            clearTimeOut();
            $(".left_image_button")[0].style.display = "block";
            $(".right_image_button")[0].style.display = "block";
            $(imageDom).attr({
                "style" : "height:" + (imageHeight + 10) + "px;width:"+ (imageWidth + 10) + "px;" + "-webkit-border-radius:10px;-moz-border-radius: 10px;border-radius: 10px;cursor:pointer;",
                "class" : "",
                "float" : "left",
                "margin-top"  : marginTop + 5 + "px",
                "margin-left" : marginLeft + 5 + "px"
            });
        });
        $(this).mouseout(function(){
            clearTimeOut();
            $(".left_image_button")[0].style.display = "none";
            $(".right_image_button")[0].style.display = "none";
            $(imageDom).attr({
                "style" : "height:" + imageHeight + "px;width:"+ imageWidth  + "px;",
                "class" : imageClass,
                "float" : "left",
                "margin-top"  : marginTop +  "px",
                "margin-left" : marginLeft +  "px"
            });
            createTimeOut();
        });
        $(".image_button").mouseover(function(){
            clearTimeOut();
        });
        
        $(leftButton).click(function(){
            clearTimeOut();
            var nextImageDom = $(imageDom).clone();
            var srcNameT = srcName;
            thisDom.prepend(nextImageDom);
            nextImageDom.attr({
                "src"   : getSrcPath(srcNameT) + opts.imagePreName + "_" + ((opts.firstIndex + 1)%opts.lastIndex+1) + "." + opts.imageLastName,
                "style" : "display:none;",
                "class" : imageClass
            });
            $(imageDom).fadeOut("normal",function(){
                nextImageDom.fadeIn("normal");
                imageDom.remove();
                imageDom = nextImageDom;
            });
            opts.firstIndex += 1;
            createTimeOut();
        });
        
        $(rightButton).click(function(){
            clearTimeOut();
            var nextImageDom = $(imageDom).clone();
            var srcNameT = srcName;
            thisDom.prepend(nextImageDom);
            if(opts.firstIndex - 1 == 0){
                opts.firstIndex = opts.lastIndex;
            }
            $(nextImageDom).attr({
                "src": getSrcPath(srcNameT) + opts.imagePreName + "_" + ((opts.firstIndex - 1)%opts.lastIndex+1) + "." + opts.imageLastName,
                "style" : "display:none;",
                "class" : imageClass
            });
            $(imageDom).fadeOut("normal",function(){
                nextImageDom.fadeIn("normal");
                imageDom.remove();
                imageDom = nextImageDom;
            });
            opts.firstIndex -= 1;
            if(opts.firstIndex<1){
                opts.firstIndex = opts.lastIndex;
            }
            createTimeOut();
        });
        
        function circulateImage(){
            if(count>0){
                var nextImageDom = $(imageDom).clone();
                var srcNameT = srcName;
                thisDom.prepend(nextImageDom);
                nextImageDom.attr({
                    "src"   : getSrcPath(srcNameT) + opts.imagePreName + "_" + ((opts.firstIndex + 1)%opts.lastIndex+1) + "." + opts.imageLastName,
                    "style" : "display:none;",
                    "class" : imageClass
                });
                $(imageDom).fadeOut("normal",function(){
                    nextImageDom.fadeIn("normal");
                    imageDom.remove();
                    imageDom = nextImageDom;
                });
                opts.firstIndex += 1;
            }
            count++;
            t = setTimeout(circulateImage, opts.speed);
        }
        
        function setSrcIndexNumber(srcName){
            var imageNameIndex = srcName.indexOf("/");
            while(imageNameIndex != -1){
                srcName = srcName.substring(imageNameIndex+1);
                imageNameIndex = srcName.indexOf("/");
            }
            var _index = srcName.indexOf("_");
            srcName = srcName.substring(_index+1);
            var pointIndex = srcName.indexOf(".");
            opts.firstIndex = parseInt(srcName.substring(0,pointIndex));
        }
        
        function getSrcPath(srcName){
            var srcPath = "";
            var imageNameIndex = srcName.indexOf("/");
            while(imageNameIndex != -1){
                srcPath = srcPath + srcName.substring(0,imageNameIndex) + "/" ;
                srcName = srcName.substring(imageNameIndex+1);
                imageNameIndex = srcName.indexOf("/");
            }
            return srcPath;
        }
        
        function clearTimeOut(){
            if(opts.autimatucally){
                clearTimeout(t);
                count = 0;
            }
        }
        
        function createTimeOut(){
            if(opts.autimatucally){
                circulateImage();
            }
        }
        
    }
})(jQuery);
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function ($) {
    /*
  * function for dBox,you can call it as bleow
  * dBox(opacity:0.2,content:'')
  */
    $.fn.dBox = function (options) {
        var variables = {
            opacity: 0.5, 
            title: '&nbsp;',
            content: '',
            left: 234,
            top: 200,
            width: 600,
            height: 465,
            overlay: true,
            id:"",
            ajaxSrc:""
        }
        var opts = $.extend(variables, options);
        opts.id = $(this).attr("id");
        $(this).attr({
            style:"display:block"
        });
        $(this).attr({
            id:"dBox",
            "class":opts.id
        });
        var title = document.createElement("div");
        var d_title = document.createElement("div");
        var d_close = document.createElement("div");
        $(d_title).attr({
            id:"d_title"
        });
        $(d_close).attr({
            id:"d_close"
        });
        $(title).attr({
            id:"d_head"
        });
        d_title.innerHTML = opts.title;
        $(title).append(d_title);
        $(title).append(d_close);
        $("#dBox").prepend(title);    
        var content_body = document.createElement("div");
        $(content_body).attr({
            id:"d_content"
        });
        $(".button").attr({"hidefocus":true});

 /*
  *this is a function  to handle click  event
  */
        $(this).ready(function(){
            addCSS();
            drag();
            $("#d_close").click(dBoxRemove);
            return false;
        });
        /*
     * function that remove the dBoxHtml
     * you can call it as below
     * dBoxRemvoe();
     */
        function dBoxRemove() {
            $("#dBox").hide();
            $("#d_head").remove();
            $("#dBox").attr({style:"display:none",id:opts.id});
        }
        /*
      *function set the dBox position
      *and voerlay the body html
      *you can call it as below
      *addCss()
      */
        function addCSS() {
            var pos = setPosition();
            $("#dBox").css({
                "left": pos[0], 
                "top": pos[1], 
                "width": opts.width + "px", 
                "height": opts.height + "px"
            });
        }
        /*
       *function set the position  base on window size
       *return a array
       *call it as below
       *var position = setPosition()
       */
        function setPosition() {
            var x =  "141px";
            var y =  "260px";
            return Array(y, x);
        }
        /*
        * get the window's height and width
        * return a array
        * class it as below
        * var windowSize = getPageSize();
        */
        function getPageSize() {
            h = $(window).height();
            w = $(window).width();
            return Array(w, h);
        }
        /*
         * function deal with the drag action
         */
        function drag() {
            var dx, dy, moveout;
            var handle = $("#dBox").find("#d_head>#d_title").css('cursor', 'move');
            handle.mousedown(function (e) {
                dx = e.clientX - parseInt($("#dBox").css("left"));
                dy = e.clientY - parseInt($("#dBox").css("top"));
                $("#dBox").mousemove(move).mouseout(out).css({
                    "opacity": opts.opacity
                });
                handle.mouseup(up);
            });
            /*
             * move for a new position
             */
            move = function (e) {
                moveout = false;
                var x, y;
                if (e.clientX - dx < 0) {
                    x = 0;
                } else {
                    if (e.clientX - dx > ($(window).width() - $("#dBox").width())) {
                        x = $(window).width() - $("#dBox").width();
                    } else {
                        x = e.clientX - dx;
                    }
                }
                if (e.clientY - dy < 0) {
                    y = 0;
                } else {
                    y = e.clientY - dy;
                }
                $("#dBox").css({
                    left: x,
                    top: y
                });
            }
            out = function (e) {
                moveout = true;
                setTimeout(function () {
                    moveout && up(e);
                }, 5);
            }
            up = function (e) {
                $("#dBox").unbind("mousemove", move).unbind("mouseout", out).css("opacity", 1);
                handle.unbind("mouseup", up);
            }
        }
    }
})(jQuery);
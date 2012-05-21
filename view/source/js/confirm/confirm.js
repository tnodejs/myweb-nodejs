(function ($) {
    $.fn.confirm = function(options){
        var variables = {
            msg: '确定删除这条广播?',
            x: 500,
            y: 500,
            height:200,
            width:200,
            okclick: null,
            cacelclick: null,
            issystem:"0"
        }
        var opts = $.extend(variables, options);
        var html = "";
        if(opts.issystem == "0"){
            html = '<div class="delChose" id="confirmbox"><div class=\"tiptext\">'+opts.msg+'</div><input type="button" value="确定" class="ok" id="ok">&nbsp;&nbsp;<input type="button" value="取消" class="cancel" id="cancel"></div>';
            var htmlobj = $(html);
            var animationtime = 0;
            if(!$.browser.msie){
                animationtime = 300;
            }
            htmlobj.css({
                'position':absolute,
                'left':opts.x, 
                'top':opts.y, 
                'display':'block',
                'height':opts.height,
                'width':opts.width
            });
            htmlobj.find("#ok").bind('click',function(){
                if(opts.okclick){
                    opts.okclick();
                }
                htmlobj.fadeOut(animationtime,function(){
                    htmlobj.remove();
                });
            });
            htmlobj.find("#cancel").bind('click',function(){
                if(opts.cacelclick){
                    opts.cacelclick();
                }
                htmlobj.fadeOut(animationtime,function(){
                    htmlobj.remove();
                });
            });
            htmlobj.hide().appendTo("body").fadeIn(animationtime,function(){
                if(!$.browser.msie){
                    htmlobj.find("#ok").focus();
                }else{
                    setTimeout(function(){
                        htmlobj.find("#ok").focus();
                    },0);
                }
            });
        }
        else{
            htmlobj = document.createElement("div");
            $(htmlobj).append(html);
            html = $(htmlobj).append(this.html());
            $(htmlobj).appendTo("body");
            htmlobj.css({
                'position':absolute,
                'left':opts.x, 
                'top':opts.y, 
                'display':'block',
                'height':opts.height,
                'width':opts.width
            });
        }

    };
})(jQuery);
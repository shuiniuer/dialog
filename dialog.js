!(function($){
    function Dialog(config){
        config.elm.appendTo('body');
        config.elm.css({
            'position': 'absolute',
            'z-index': config.zindex
        });
        this.config = config;
        this.show = function(){
            var that = this,
                config = that.config,
                win = $(window);
            this.modal(config.mask,config.minWidth);
            this.center(config.elm);
            win.on('resize.'+config.id, function(event) {
                that.modal(config.mask,config.minWidth);
                that.center(config.elm);
            });
            win.on('scroll.'+config.id, function(event) {
                that.center(config.elm);
            });
        };
        this.hide = function(){
            var config = this.config,
                win = $(window);
            config.mask.hide(0);
            config.elm.hide(0);
            win.off('resize.'+config.id);
            win.off('scroll.'+config.id);
        };
        this.destroy = function(){
            var config = this.config;
            if(config.htmlFlag){
                config.elm.remove();
            }
            config.mask.remove();
        };
    };

    Dialog.prototype.modal = function(elm,minWidth){
        var doc = $(document),
            height = doc.height(),
            width = $(window).width();
        if(typeof minWidth !== 'undefined' && minWidth>width){
            width = minWidth;
        }
        elm.width(width);
        elm.height(height);
        elm.show(0);
    };

    Dialog.prototype.center = function(elm,minWidth){
        var win = $(window),
            height = elm.height(),
            width = elm.width(),
            winWidth = win.width(),
            winHeight = win.height(),
            scrollHeight = win.scrollTop();

        if(typeof minWidth !== 'undefined' && minWidth > winWidth){
            winWidth = minWidth;
        }
        var centerLeft = (winWidth - width)/2,
            centerTop = (winHeight - height)/2 + scrollHeight;

        elm.css({
            'top': centerTop+'px',
            'left': centerLeft+'px'
        });
    };

    function dialog(config){
        var mask = $('<div></div>'),
            elm;
        mask.appendTo('body');
        mask.css({
            'position': 'absolute',
            'background': '#000',
            'top': '0px',
            'left': '0px',
            'z-index': config.zindex - 1
        }).animate({
            opacity:.3
        },0);

        config.id = 'dialog'+new Date().getTime();

        if(typeof config.selector !== 'undefined'){
            elm = $(config.selector);
        }else if(typeof config.html !== 'undefined'){
            elm = $(config.html);
            config.htmlFlag = true;
        }

        var dialogConfig = {
            elm: elm,
            id: config.id,
            mask: mask
        }
        return new dialog.prototype.init(config);
    };

    dialog.prototype.init = Dialog;

    $.dialog ? $.dialog : $.dialog = dialog;
})(jQuery);
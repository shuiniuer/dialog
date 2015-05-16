!(function($){
    function Dialog(config){

        config.elm.appendTo('body');
        config.elm.css({
            'position': 'absolute',
            'z-index': config.zindex
        });

        this.config = config;

        this.show = function(){
            modal(config.mask);

            $(window).on('resize.'+config.id, function(event) {
                event.preventDefault();
                modal(config.mask);
            });
            
            center(config.elm);
        };

        this.hide = function(){
            config.mask.hide(0);
            config.elm.hide(0);
            $(window).off('resize.'+config.id);
        };

        this.destroy = function(){
            if(config.htmlFlag){
                config.elm.remove();
            }
            config.mask.remove();
        };
    };

    Dialog.prototype.modal = function(elm){
        var doc = $(document),
            docWidth = doc.width(),
            docHeight = doc.height();

        elm.width(docWidth);
        elm.height(docHeight);
        elm.show(0);
    };

    Dialog.prototype.center = function(elm){
        var win = $(window),
            height = elm.height(),
            width = elm.width(),
            winHeight = win.height(),
            winWidth = win.width();

        var centerLeft = (winWidth - width)/2,
            centerTop = (winHeight - height)/2;

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
            'z-index': config.zindex - 1
        }).animate({
            opacity:.3
        },0);

        config.id = 'dialog'+new Date().getTime();
        config.mask = mask;

        if(typeof config.selector !== 'undefined'){
            elm = $(config.selector);
        }else if(typeof config.html !== 'undefined'){
            elm = $(config.html);
            config.htmlFlag = true;
        }
        config.elm = elm;

        return new init(config);
    };

    dialog.prototype.init = Dialog;

    $.dialog ? $.dialog : $.dialog = dialog;

})(jQuery);
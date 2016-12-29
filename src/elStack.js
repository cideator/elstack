/* elStack */

/*
 * Author: Farhan Wazir
 * Email: farhan.wazir@gmail.com
 * Website: http://github.com/farhanwazir/elstack
 *
 ************ Objective ***********
 * To create a group of HTML element, to show a bundle.
 *
 ************ Description: ***********
 * It was a requirement for one of my project, so i have decided to development when no options i had
 * found on internet.
 *
 ************ LICENSE ***********
 * The MIT License (MIT)
 * Copyright (c) 2016 Farhan Wazir
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN
 * NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * */

;(function($, window){

    var elStack = 'elStack';

    function jConstruct(ele, options){

        var config = $.extend({}, $.fn[elStack].defaults, options);
        var target = $(ele);

        if(config.target !== false) target = $(config.target);

        var clone, container;

        var id = 'elstack-'+Math.floor((Math.random() * 999) + 1)+''+Math.floor(Math.random() * 9);

        var init = function(){
            clone = $(target).clone();
            $(clone).removeAttr('data-elstack');
            $(clone).removeAttr('data-elstack-class');
            $(clone).removeAttr('data-elstack-offset-top');
            $(clone).removeAttr('data-elstack-offset-left');
            /*crate container*/
            createStack();
        };

        var createStack = function(){
            container = document.createElement('div');
            $(container).addClass(config.class);
            $(container).css('position', 'relative');
            $(container).attr('id', id);
            createStackElements();
        };

        var createStackElements = function(){
            for(var i=0; i < config.repeat; i++){
                var stackElement = $(clone).clone();
                $(stackElement).addClass('elstack-item');
                $(stackElement).css('position', 'absolute');
                $(stackElement).css('z-index', (i+1));
                $(stackElement).css('top', config.offset.top*(i+1));
                $(stackElement).css('left', config.offset.left*(i+1));
                $(stackElement).appendTo(container);
            }
        };

        var setCloneProperties = function(){
            /*remove data attribute from target*/
            $(clone).css('position', 'absolute');
            $(clone).css('z-index', (parseInt(config.repeat)+1));
            $(clone).css('top', config.offset.top*(parseInt(config.repeat)+1));
            $(clone).css('left', config.offset.left*(parseInt(config.repeat)+1));
            $(clone).addClass('elstack-target-item');
        };

        var resizeStackItems = function(target_item){
            /*resize items*/
            $('#'+id).children('.elstack-item').css('height', $('#'+id).children('.elstack-target-item').height());
            $('#'+id).children('.elstack-item').css('width', $('#'+id).children('.elstack-target-item').width());
            /*resize container*/
            var container_offset_h = (parseInt(config.repeat)+1) * config.offset.top;
            var container_offset_w = (parseInt(config.repeat)+1) * config.offset.left;
            $('#'+id).css('min-height', $('#'+id).children('.elstack-target-item').height()+container_offset_h);
            $('#'+id).css('min-width', $('#'+id).children('.elstack-target-item').width()+container_offset_w);
        };

        var publish = function(){
            $(clone).appendTo(container);
            setCloneProperties();
            /*publish onto stage*/
            $(target).replaceWith(container);
            resizeStackItems($(container).children('.elstack-target-item'));
        };

        /*initialize plugin*/
        init();
        /*publish output*/
        publish();

        return this;
    };

    $.fn[elStack] = function ( options ) {
        return this.each(function () {
            new jConstruct(this, options);
        });
    };

    $.fn[elStack].defaults = {
        target: false,
        repeat: 3,
        offset: {
            top: 3,
            left: 3
        },
        class: 'elStack-container'
    };

    $(document).ready(function(){
        $('[data-elstack]').each(function(){
            var repeat = (typeof $(this).attr('data-elstack') !== typeof undefined && $(this).attr('data-elstack') !== false)? $(this).attr('data-elstack') : $.fn[elStack].defaults.repeat;
            var css_class = (typeof $(this).attr('data-elstack-class') !== typeof undefined && $(this).attr('data-elstack-class') !== false)? $(this).attr('data-elstack-class') : $.fn[elStack].defaults.class;
            var offset_top = (typeof $(this).attr('data-elstack-offset-top') !== typeof undefined && $(this).attr('data-elstack-offset-top') !== false)? $(this).attr('data-elstack-offset-top') : $.fn[elStack].defaults.offset.top;
            var offset_left = (typeof $(this).attr('data-elstack-offset-left') !== typeof undefined && $(this).attr('data-elstack-offset-left') !== false)? $(this).attr('data-elstack-offset-left') : $.fn[elStack].defaults.offset.left;
            $(this).elStack({
                repeat: repeat,
                offset: {
                    top: offset_top,
                    left: offset_left
                },
                class: css_class

            });
        });
    });

}(jQuery, window));
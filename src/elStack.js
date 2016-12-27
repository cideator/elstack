/* elStack */

/*
 * Author: Farhan Wazir
 * Email: farhan.wazir@gmail.com
 * Website: http://github.com/farhanwazir/elstack
 *
 ************ Objective ***********
 * It makes a group of HTML element in a stack.
 *
 *
 ************ Description: ***********
 *
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

    var myName = 'elStack';

    function jConstruct(ele, options){

        var config = $.extend(true, $.fn[myName].defaults, options);
        var target = ele;

        if(config.target !== false) target = $(config.target);

        var clone, container;

        var init = function(){
            clone = $(target).clone();
            //remove data attribute from target
            $(clone).removeAttr('data-elstack');
            $(clone).css('position', 'absolute');
            $(clone).css('z-index', (parseInt(config.repeat)+1));
            $(clone).css('top', config.offset.top*(parseInt(config.repeat)+1));
            $(clone).css('left', config.offset.left*(parseInt(config.repeat)+1));
            //crate container
            createStack();
        };

        var createStack = function(){
            container = document.createElement('div');
            $(container).addClass(config.class);
            $(container).css('position', 'relative');
            $(container).css('height', $(target).height()+(config.offset.top*(parseInt(config.repeat)+1)));
            $(container).css('width', $(target).width()+(config.offset.left*(parseInt(config.repeat)+1)));
            createStackElements();
        };

        var createStackElements = function(){
            for(var i=0; i < config.repeat; i++){
                var stackElement = $(clone).clone().html('');
                $(stackElement).addClass('elstack-item');
                $(stackElement).css('position', 'absolute');
                $(stackElement).css('z-index', (i+1));
                $(stackElement).css('top', config.offset.top*(i+1));
                $(stackElement).css('left', config.offset.left*(i+1));
                $(stackElement).appendTo(container);
            }
        };

        var resizeStackItems = function(){
            $('.elstack-item').css('height', $('.elstack-target-item').height());
            $('.elstack-item').css('width', $('.elstack-target-item').width());
        };

        var publish = function(){
            $(clone).appendTo(container);

            $(clone).addClass('elstack-target-item');
            //publish onto stage
            $(target).replaceWith(container);
            resizeStackItems();
        };

        //initialize plugin
        init();
        //publish output
        publish();

        return this;
    };

    $.fn[myName] = function ( options ) {
        return this.each(function () {
            new jConstruct(this, options);
        });
    };

    $.fn[myName].defaults = {
        target: false,
        repeat: 3,
        offset: {
            top: 5,
            left: 5,
            right: 0,
            bottom: 0
        },
        class: 'elStack-container'
    };

    $(document).ready(function(){
        $('[data-elstack]').each(function(index, value){
            var tmp_elstack_html_ele = $(this);
            $(tmp_elstack_html_ele).elStack({
                repeat: tmp_elstack_html_ele.attr('data-elstack')
            });
        });
    });

}(jQuery, window));
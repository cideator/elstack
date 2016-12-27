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
        this.target = ele;

        if(config.target !== false) this.target = $(config.target);

        var init = function(){
            //
        };

        //initialize plugin
        init();

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
            top: '10px',
            left: '10px',
            right: '0px',
            bottom: '0px'
        }
    };

    $(document).ready(function(){
        $('[data-elstack]').elStack();
    });

}(jQuery, window));
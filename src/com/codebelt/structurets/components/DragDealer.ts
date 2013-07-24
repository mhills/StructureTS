/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureTS
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

///<reference path='Cursor'/>
///<reference path='PositionUtil'/>

class DragDealer {

    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'DragDealer';

    public wrapper = null;
    public handle = null;
    public options = null;

    public disabled = null;
    public horizontal = null;
    public vertical = null;
    public slide = null;
    public steps = null;
    public snap = null;
    public loose = null;
    public speed = null;
    public xPrecision = null;
    public yPrecision = null;

    public callback = null;
    public animationCallback = null;
    public bounds = null;
    public value = null;
    public offset = null;
    public change = null;
    public activity = null;
    public dragging = null;
    public tapping = null;

    public stepRatios = null;
    public interval = null;


    constructor(wrapper:any, options?:any)
    {
        if(typeof(wrapper) == 'string')
        {
            wrapper = document.getElementById(wrapper);
        }
        if(!wrapper)
        {
            return;
        }
        var handle = wrapper.getElementsByTagName('div')[0];
        if(!handle || handle.className.search(/(^|\s)handle(\s|$)/) == -1)
        {
            return;
        }
        this.init(wrapper, handle, options || {});
        this.setup();
    };



    public init(wrapper, handle, options)
    {
        this.wrapper = wrapper;
        this.handle = handle;
        this.options = options;

        this.disabled = this.getOption('disabled', false);
        this.horizontal = this.getOption('horizontal', true);
        this.vertical = this.getOption('vertical', false);
        this.slide = this.getOption('slide', true);
        this.steps = this.getOption('steps', 0);
        this.snap = this.getOption('snap', false);
        this.loose = this.getOption('loose', false);
        this.speed = this.getOption('speed', 10) / 100;
        this.xPrecision = this.getOption('xPrecision', 0);
        this.yPrecision = this.getOption('yPrecision', 0);

        this.callback = options.callback || null;
        this.animationCallback = options.animationCallback || null;

        this.bounds = {
            left: options.left || 0, right: -(options.right || 0),
            top: options.top || 0, bottom: -(options.bottom || 0),
            x0: 0, x1: 0, xRange: 0,
            y0: 0, y1: 0, yRange: 0
        };
        this.value = {
            prev: [-1, -1],
            current: [options.x || 0, options.y || 0],
            target: [options.x || 0, options.y || 0]
        };
        this.offset = {
            wrapper: [0, 0],
            mouse: [0, 0],
            prev: [-999999, -999999],
            current: [0, 0],
            target: [0, 0]
        };
        this.change = [0, 0];

        this.activity = false;
        this.dragging = false;
        this.tapping = false;
    }
   getOption(name, defaultValue)
    {
        return this.options[name] !== undefined ? this.options[name] : defaultValue;
    }

    setup()
    {
        this.setWrapperOffset();
        this.setBoundsPadding();
        this.setBounds();
        this.setSteps();

        this.addListeners();
    }

    setWrapperOffset()
    {
        this.offset.wrapper = PositionUtil.get(this.wrapper);
    }

    setBoundsPadding()
    {
        if(!this.bounds.left && !this.bounds.right)
        {
            this.bounds.left = PositionUtil.get(this.handle)[0] - this.offset.wrapper[0];
            this.bounds.right = -this.bounds.left;
        }
        if(!this.bounds.top && !this.bounds.bottom)
        {
            this.bounds.top = PositionUtil.get(this.handle)[1] - this.offset.wrapper[1];
            this.bounds.bottom = -this.bounds.top;
        }
    }

    setBounds()
    {
        this.bounds.x0 = this.bounds.left;
        this.bounds.x1 = this.wrapper.offsetWidth + this.bounds.right;
        this.bounds.xRange = (this.bounds.x1 - this.bounds.x0) - this.handle.offsetWidth;

        this.bounds.y0 = this.bounds.top;
        this.bounds.y1 = this.wrapper.offsetHeight + this.bounds.bottom;
        this.bounds.yRange = (this.bounds.y1 - this.bounds.y0) - this.handle.offsetHeight;

        this.bounds.xStep = 1 / (this.xPrecision || Math.max(this.wrapper.offsetWidth, this.handle.offsetWidth));
        this.bounds.yStep = 1 / (this.yPrecision || Math.max(this.wrapper.offsetHeight, this.handle.offsetHeight));
    }

    setSteps()
    {
        if(this.steps > 1)
        {
            this.stepRatios = [];
            for(var i = 0; i <= this.steps - 1; i++)
            {
                this.stepRatios[i] = i / (this.steps - 1);
            }
        }
    }

    addListeners()
    {
        var self = this;

        this.wrapper.onselectstart = function()
        {
            return false;
        }
        this.handle.onmousedown = this.handle.ontouchstart = function(e)
        {
            console.log("handle.onmousedown")
            self.handleDownHandler(e);
        };
        this.wrapper.onmousedown = this.wrapper.ontouchstart = function(e)
        {
            console.log("wrapper.onmousedown")
            self.wrapperDownHandler(e);
        };
        var mouseUpHandler = document.onmouseup || function(){};
        document.onmouseup = function(e)
        {
            console.log("document.onmouseup")
            mouseUpHandler(e);
            self.documentUpHandler(e);
        };
//        var touchEndHandler = document.ontouchend || function(){};
//        document.ontouchend = function(e)
//        {
//            touchEndHandler(e);
//            self.documentUpHandler(e);
//        };
        var resizeHandler = window.onresize || function(){};
        window.onresize = function(e)
        {
            console.log("window.onresize")
            resizeHandler(e);
            self.documentResizeHandler(e);
        };
        this.wrapper.onmousemove = function(e)
        {
            console.log("wrapper.onmousemove")
            self.activity = true;
        }
        this.wrapper.onclick = function(e)
        {
            console.log("wrapper.onclick")
            return !self.activity;
        }

        this.interval = setInterval(function(){ self.animate() }, 25);
        self.animate(false, true);
    }

    handleDownHandler(e)
    {
        this.activity = false;
        Cursor.refresh(e);

        this.preventDefaults(e, true);
        this.startDrag();
        this.cancelEvent(e);
    }

    wrapperDownHandler(e)
    {
        Cursor.refresh(e);

        this.preventDefaults(e, true);
        this.startTap();
    }

    documentUpHandler(e)
    {
        this.stopDrag();
        this.stopTap();
        //this.cancelEvent(e);
    }

    documentResizeHandler(e)
    {
        this.setWrapperOffset();
        this.setBounds();

        this.update();
    }

    enable()
    {
        this.disabled = false;
        this.handle.className = this.handle.className.replace(/\s?disabled/g, '');
    }

    disable()
    {
        this.disabled = true;
        this.handle.className += ' disabled';
    }

    setStep(x, y, snap)
    {
        this.setValue(
            this.steps && x > 1 ? (x - 1) / (this.steps - 1) : 0,
            this.steps && y > 1 ? (y - 1) / (this.steps - 1) : 0,
            snap
        );
    }

    setValue(x, y, snap)
    {
        this.setTargetValue([x, y || 0]);
        if(snap)
        {
            this.groupCopy(this.value.current, this.value.target);
        }
    }

    startTap(target?)
    {
        if(this.disabled)
        {
            return;
        }
        this.tapping = true;

        if(target === undefined)
        {
            target = [
                Cursor.x - this.offset.wrapper[0] - (this.handle.offsetWidth / 2),
                Cursor.y - this.offset.wrapper[1] - (this.handle.offsetHeight / 2)
            ];
        }
        this.setTargetOffset(target);
    }

    stopTap()
    {
        if(this.disabled || !this.tapping)
        {
            return;
        }
        this.tapping = false;

        this.setTargetValue(this.value.current);
        this.result();
    }

    startDrag()
    {
        if(this.disabled)
        {
            return;
        }

        console.log("startDrag", Cursor.x - PositionUtil.get(this.handle)[0])
        console.log("startDrag", Cursor.x - PositionUtil.get(this.handle)[1])
        this.offset.mouse = [
            Cursor.x - PositionUtil.get(this.handle)[0],
            Cursor.y - PositionUtil.get(this.handle)[1]
        ];

        this.dragging = true;
    }

    stopDrag()
    {
        if(this.disabled || !this.dragging)
        {
            return;
        }
        this.dragging = false;

        var target = this.groupClone(this.value.current);
        if(this.slide)
        {
            var ratioChange = this.change;
            target[0] += ratioChange[0] * 4;
            target[1] += ratioChange[1] * 4;
        }
        this.setTargetValue(target);
        this.result();
    }

    feedback()
    {
        var value = this.value.current;
        if(this.snap && this.steps > 1)
        {
            value = this.getClosestSteps(value);
        }
        if(!this.groupCompare(value, this.value.prev))
        {
            if(typeof(this.animationCallback) == 'function')
            {
                this.animationCallback(value[0], value[1]);
            }
            this.groupCopy(this.value.prev, value);
        }
    }

    result()
    {
        if(typeof(this.callback) == 'function')
        {
            this.callback(this.value.target[0], this.value.target[1]);
        }
    }

    animate(direct?, first?)
    {
        if(direct && !this.dragging)
        {
            return;
        }
        if(this.dragging)
        {
            var prevTarget = this.groupClone(this.value.target);

            var offset = [
                Cursor.x - this.offset.wrapper[0] - this.offset.mouse[0],
                Cursor.y - this.offset.wrapper[1] - this.offset.mouse[1]
            ];
            this.setTargetOffset(offset, this.loose);

            this.change = [
                this.value.target[0] - prevTarget[0],
                this.value.target[1] - prevTarget[1]
            ];
        }
        if(this.dragging || first)
        {
            this.groupCopy(this.value.current, this.value.target);
        }
        if(this.dragging || this.glide() || first)
        {
            this.update();
            this.feedback();
        }
    }

    glide()
    {
        var diff = [
            this.value.target[0] - this.value.current[0],
            this.value.target[1] - this.value.current[1]
        ];
        if(!diff[0] && !diff[1])
        {
            return false;
        }
        if(Math.abs(diff[0]) > this.bounds.xStep || Math.abs(diff[1]) > this.bounds.yStep)
        {
            this.value.current[0] += diff[0] * this.speed;
            this.value.current[1] += diff[1] * this.speed;
        }
        else
        {
            this.groupCopy(this.value.current, this.value.target);
        }
        return true;
    }

    update()
    {
        if(!this.snap)
        {
            this.offset.current = this.getOffsetsByRatios(this.value.current);
        }
        else
        {
            this.offset.current = this.getOffsetsByRatios(
                this.getClosestSteps(this.value.current)
            );
        }
        this.show();
    }

    show()
    {
        if(!this.groupCompare(this.offset.current, this.offset.prev))
        {
            if(this.horizontal)
            {
                this.handle.style.left = String(this.offset.current[0]) + 'px';
            }
            if(this.vertical)
            {
                this.handle.style.top = String(this.offset.current[1]) + 'px';
            }
            this.groupCopy(this.offset.prev, this.offset.current);
        }
    }

    setTargetValue(value, loose?)
    {
        var target = loose ? this.getLooseValue(value) : this.getProperValue(value);

        this.groupCopy(this.value.target, target);
        this.offset.target = this.getOffsetsByRatios(target);
    }

    setTargetOffset(offset, loose?)
    {
        var value = this.getRatiosByOffsets(offset);
        var target = loose ? this.getLooseValue(value) : this.getProperValue(value);

        this.groupCopy(this.value.target, target);
        this.offset.target = this.getOffsetsByRatios(target);
    }

    getLooseValue(value)
    {
        var proper = this.getProperValue(value);
        return [
            proper[0] + ((value[0] - proper[0]) / 4),
            proper[1] + ((value[1] - proper[1]) / 4)
        ];
    }

    getProperValue(value)
    {
        var proper = this.groupClone(value);

        proper[0] = Math.max(proper[0], 0);
        proper[1] = Math.max(proper[1], 0);
        proper[0] = Math.min(proper[0], 1);
        proper[1] = Math.min(proper[1], 1);

        if((!this.dragging && !this.tapping) || this.snap)
        {
            if(this.steps > 1)
            {
                proper = this.getClosestSteps(proper);
            }
        }
        return proper;
    }

    getRatiosByOffsets(group)
    {
        return [
            this.getRatioByOffset(group[0], this.bounds.xRange, this.bounds.x0),
            this.getRatioByOffset(group[1], this.bounds.yRange, this.bounds.y0)
        ];
    }

    getRatioByOffset(offset, range, padding)
    {
        return range ? (offset - padding) / range : 0;
    }

    getOffsetsByRatios(group)
    {
        return [
            this.getOffsetByRatio(group[0], this.bounds.xRange, this.bounds.x0),
            this.getOffsetByRatio(group[1], this.bounds.yRange, this.bounds.y0)
        ];
    }

    getOffsetByRatio(ratio, range, padding)
    {
        return Math.round(ratio * range) + padding;
    }

    getClosestSteps(group)
    {
        return [
            this.getClosestStep(group[0]),
            this.getClosestStep(group[1])
        ];
    }

    getClosestStep(value)
    {
        var k = 0;
        var min = 1;
        for(var i = 0; i <= this.steps - 1; i++)
        {
            if(Math.abs(this.stepRatios[i] - value) < min)
            {
                min = Math.abs(this.stepRatios[i] - value);
                k = i;
            }
        }
        return this.stepRatios[k];
    }

    groupCompare(a, b)
    {
        return a[0] == b[0] && a[1] == b[1];
    }

    groupCopy(a, b)
    {
        a[0] = b[0];
        a[1] = b[1];
    }

    groupClone(a)
    {
        return [a[0], a[1]];
    }

    preventDefaults(e, selection)
    {
        if(!e)
        {
            e = window.event;
        }
        if(e.preventDefault)
        {
            e.preventDefault();
        }
        e.returnValue = false;

        if(selection && document.selection)
        {
            document.selection.empty();
        }
    }

    cancelEvent(e)
    {
        if(!e)
        {
            e = window.event;
        }
        if(e.stopPropagation)
        {
            e.stopPropagation();
        }
        e.cancelBubble = true;
    }

}
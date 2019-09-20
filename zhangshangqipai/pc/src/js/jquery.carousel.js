
var MIDDLE_PIC_POS = 1
    ;(function($){
    var Caroursel = function (caroursel){
        var self = this;
        this.caroursel = caroursel;
        this.posterList = caroursel.find(".poster-list");
        this.posterItems = caroursel.find(".poster-item");
        this.firstPosterItem = this.posterItems.first();
        this.lastPosterItem = this.posterItems.last();
        this.prevBtn = this.caroursel.find(".poster-prev-btn");
        this.nextBtn = this.caroursel.find(".poster-next-btn");
        this.curPositions = [];
        for(var i = 0;i<this.posterItems.length;++i){
            this.curPositions[i] = i+1;
        }

        this.setting = {
            "width":"560",
            "height":"460",
            "posterWidth":"760",
            "posterHeight":"460",
            "scale":"0.8",
            "speed":"1000",
            "isAutoplay":"true",
            "dealy":"3000",
            "algin":"middle"
        };

        $.extend(this.setting,this.getSetting());

        this.setFirstPosition();

        this.setSlicePosition();

        this.rotateFlag = true;
        this.prevBtn.bind("click",function(){
            if(self.rotateFlag){
                self.rotateFlag = false;
                self.rotateAnimate("left")
            }
        });

        this.nextBtn.bind("click",function(){
            if(self.rotateFlag){
                self.rotateFlag = false;
                self.rotateAnimate("right")
            }
        });

        if(this.setting.isAutoplay){
            this.autoPlay();
            this.caroursel.hover(function(){clearInterval(self.timer)},function(){self.autoPlay()})
        }
    };
    Caroursel.prototype = {
        autoPlay:function(){
            var that = this;
            this.timer =  window.setInterval(function(){
                that.nextBtn.click();
            },that.setting.dealy)
        },
        //记录每次移动的状态
        refreshPositions:function(offset){
            //console.log('before refreshPositions',this.curPositions,'the offset is offset ' + offset);
            for(var i = 0; i < this.curPositions.length; ++i)
            {
                var nextPos = this.curPositions[i] + offset;
                if (nextPos > this.curPositions.length) {//移动超过末尾,则位置变成到开头
                    nextPos = nextPos - this.curPositions.length;
                }else
                if (nextPos < 1) {////向左边移动已经移动到开始位置更左边,则位置变成结束
                    nextPos = this.curPositions.length + nextPos;
                }
                this.curPositions[i] = nextPos;
            }
        },

        cal_move_path:function(curPos,desPos,arraySize) {
            //console.log("begin cal_move_path ",curPos,desPos,arraySize);
            if(curPos == desPos) return null;
            //往左边移动
            var goRightSteps;
            var goLeftSteps;
            var retDirect;
            var retStep;
            if(curPos > desPos){
                goRightSteps = curPos - desPos;
                goLeftSteps = desPos + (arraySize - curPos);
                retDirect = (goRightSteps <= goLeftSteps) ? "right":"left";
                return {"direct":retDirect,"step":Math.min(goLeftSteps,goRightSteps)};
            }
        },
        clickPosButtonIndex:function(index){
            var self = this;
            if(self.rotateFlag == false) {//目前正在移动等移动结束后才能进入
                return;
            }
            var curPos = this.curPositions[index];
            var retPath = this.cal_move_path(curPos,MIDDLE_PIC_POS,this.curPositions.length);
            if (retPath == null){
                return;
            }

            var direct = retPath.direct;
            var step = retPath.step;

            self.rotateFlag = false;
            self.rotateAnimate(direct,step)
        },

        rotateAnimate:function(type,step){
            step = step || 1;
            var that = this;
            var zIndexArr = [];
            var speed = that.setting.speed;
            this.posterItems.each(function(){
                var self = $(this);
                var destPic = null;
                var curPic = self;
                for (var i = 0; i < step;++i){
                    if(type == "left"){
                        destPic = curPic.next().get(0)?curPic.next():that.firstPosterItem;
                    }
                    else{
                        destPic = curPic.prev().get(0)?curPic.prev():that.lastPosterItem;

                    }
                    curPic = destPic;
                }
                var width = destPic.css("width");
                var height = destPic.css("height");
                var zIndex = destPic.css("zIndex");
                var opacity = destPic.css("opacity");
                var left = destPic.css("left");
                var top = destPic.css("top");
                zIndexArr.push(zIndex);
                self.animate({
                    "width":width,
                    "height":height,
                    "left":left,
                    "opacity":opacity,
                    "top":top
                },speed,function(){
                    that.rotateFlag = true;
                });
            });
            this.posterItems.each(function(i){
                $(this).css("zIndex",zIndexArr[i]);
            });

            if (type == 'right'){
                this.refreshPositions(-step);
            }else{
                this.refreshPositions(step);
            }
        },

        setFirstPosition:function(){
            this.caroursel.css({"width":this.setting.width});
            this.posterList.css({"width":this.setting.width,"height":this.setting.width*0.5});
            var width = (this.setting.width - this.setting.posterWidth) / 2;
            this.prevBtn.css({"width":width ,"zIndex":Math.ceil(this.posterItems.size()/2)});
            this.nextBtn.css({"width":width ,"zIndex":Math.ceil(this.posterItems.size()/2)});
            this.firstPosterItem.css({
                "width":this.setting.posterWidth,
                "height":this.setting.posterHeight,
                "left":width,
                "zIndex":Math.ceil(this.posterItems.size()/1),
                "top":this.setVertialType(this.setting.posterHeight)
            });
        },
        setSlicePosition:function(){
            var _self = this;
            var sliceItems = this.posterItems.slice(1),
                level = Math.floor(this.posterItems.length/2),
                leftItems = sliceItems.slice(0,level),
                rightItems = sliceItems.slice(level),
                posterWidth = this.setting.posterWidth,
                posterHeight = this.setting.posterHeight,
                Btnwidth = (this.setting.width - this.setting.posterWidth) / 2,
                gap = Btnwidth/level,
                containerWidth = this.setting.width;
            var i = 1;
            var leftWidth = posterWidth;
            var leftHeight = posterHeight;
            var zLoop1 = level;
            leftItems.each(function(index,item){
                let scale = _self.setting.scale;
                if(index==1){
                  scale = scale - 0.2
                }
                $(this).css({
                    "width":leftWidth* scale,
                    "height":leftHeight *scale,
                    "left": Btnwidth - i*gap,
                    "zIndex":zLoop1--,
                    "opacity":1/(i+1),
                    "top":_self.setVertialType(leftHeight*scale)
                });
                i++;
            });
            var j = level;
            var zLoop2 = 1;
            var rightWidth = posterWidth;
            var rightHeight = posterHeight;
            rightItems.each(function(index,item){
                let scale = _self.setting.scale;
                if(rightItems.length<=1){
                   scale = scale
                }else{
                   if(index==0){
                      scale = scale  - 0.2 
                   }
                }
                $(this).css({
                    "width":leftWidth*scale,
                    "height":leftHeight*scale,
                    "left": containerWidth -( Btnwidth - j*gap + leftWidth*scale),
                    "zIndex":zLoop2++,
                    "opacity":1/(j+1),
                    "top":_self.setVertialType(leftHeight*scale)
                });
                j--;
            });
        },
        getSetting:function(){
             let setttingss
            if(oWidth<1200){
                setttingss ={
                        "width":oWidth-100,
                        "posterWidth":oWidth*0.7,
                        "posterHeight":oWidth*0.5,
                        "scale":0.8,
                        "dealy":"3000",
                        "algin":"middle"
                }
                if(oWidth<768){
                     setttingss ={
                            "width":oWidth-50,
                            "posterWidth":(oWidth-100)*0.8,
                            "posterHeight":oWidth*0.4,
                            "scale":0.8,
                            "dealy":"3000",
                            "algin":"middle"
                    }
                }
            }else{
                 setttingss ={
                        "width":1000,
                        "posterWidth":760,
                        "posterHeight":460,
                        "scale":0.8,
                        "dealy":"3000",
                        "algin":"middle"
                }
            }
            return setttingss
        },
        setVertialType:function(height){
            var align = this.setting.align;
            if(align == "top") {
                return 0
            }else if(align == "middle"){
                return (this.setting.posterHeight - height) / 2
            }else if(align == "bottom"){
                return this.setting.posterHeight - height
            }else {
                return (this.setting.posterHeight - height) / 2
            }
        }
    };
    Caroursel.init = function (caroursels){
        caroursels.each(function(index,item){
            new Caroursel($(this));
        })  ;
    };
    window["Caroursel"] = Caroursel;
})(jQuery);
// 获取非行内样式
function getStyle(obj,attr){
    return window.getComputedStyle ? window.getComputedStyle(obj,1)[attr] : obj.currentStyle[attr];
}
// 运动框架
function sport(obj,json,fn){
    // 清除上一步计时器
    clearInterval(obj.timer);
    // 开启新的计时器
    obj.timer = setInterval(function(){
        // 设置一个开关
        let trigger = true;
        // 遍历属性
        for(let attr in json){
            // 获取当前属性
            let cur = null;
            if(attr === "opacity"){
                cur = Math.floor(parseFloat(getStyle(obj,attr)) * 100);
            }else{
                cur = parseInt(getStyle(obj,attr));
            }
            // 计算速度
            let speed = (json[attr] - cur) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            // 判断属性是否全到
            if(cur != json[attr]){
                trigger = false;
            }
            // 设置运动
            if(attr === "opacity"){
                obj.style.opacity = (cur + speed) / 100;
                obj.style.filter  = `alpha(opacity=${cur + speed})`
            }else{
                obj.style[attr] = cur + speed + "px";
            }
            
        }
        // 判断开关
        if(trigger == true){
            clearInterval(obj.timer)
            // 判断fn
            if(fn instanceof Function){
                fn();
            }
        }
    },30)
}
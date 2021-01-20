class Index{
    constructor(){
        this.con_list = $(".nav-item");
        this.commodity = $(".commodity");
        this.nav_menu_list = $(".nav-menu-list");
        this.add();
        // 获取大盒子
        this.o_box = document.querySelector("#box");
        // 获取放图片的盒子
        this.o_ul = document.querySelector("#top-ul");
        // 获取所有图片
        this.o_img = this.o_ul.children;
        // 图片的数量
        this.o_num = this.o_img.length;
        // 计算ul的宽
        // this.o_ul.style.width = this.o_num * this.o_img[0].offsetWidth + "px";
        // 获取左按钮
        this.L_btn = document.querySelector("#left");
        // 获取右按钮;
        this.R_btn = document.querySelector("#right");
        // 设置一个当前下标
        this.cur_index = 0;
        // 设置计时器的名字
        this.timer = null;
        // 添加事件
        this.addEvent();
        // 自动轮播
        this.auto()
    }
    add(){
        let that = this;
        let i = document.createElement("div");
        for(let i = 0 ; i < 7 ; i ++){
            this.con_list.get(i).onmouseenter = function(){
                that.nav_menu_list.css({
                    "height" :287,
                    "border-top" : "1px solid #b0b0b0"
                })
                // console.log(that.nav_menu_list);
                $.get("./js/data.json",(data)=>{
                    let str =`<a href="#">
                    <img src="${data[i].src}" alt="${data[i].alt}">
                    <p>${data[i].name}</p>
                    <p class="price">${data[i].price}</p>
                    </a>
                            `
                    for(let j = 0 ; j < 5 ; j ++){
                        // console.log(that.commodity.get(j));
                        that.commodity.get(j).innerHTML = str; 
                    }
                })
            }
            this.con_list.get(i).onmouseleave = function(){
                that.nav_menu_list.css({
                    "height" :0,
                    "border-top" : 0
                })
            }
        }
        that.nav_menu_list.mouseenter(()=>{
            that.nav_menu_list.css({
                "height" :287,
                "border-top" : "1px solid #b0b0b0"
            })
        })
        that.nav_menu_list.mouseleave(()=>{
            that.nav_menu_list.css({
                "height" :0,
                "border-top" : 0
            })
        })
    }
    addEvent(){
        // 设置左按钮点击事件
        this.L_btn.onclick = function(){
            this.cur_index --;
            if(this.cur_index == -1){
                this.cur_index = this.o_num - 1;
            }
            // 轮播
            this.lb()
        }.bind(this);
        this.L_btn.onmouseenter = function(){
            this.style.background = "rgba(0,0,0,.5)"
        }
        this.L_btn.onmouseleave= function(){
            this.style.background = 0;
        }
        // 设置右按钮点击事件
        this.R_btn.onclick = function(){
            this.cur_index ++;
            if(this.cur_index == this.o_num){
                this.cur_index = 0;
            }
            // 轮播
            this.lb()
        }.bind(this);
        this.R_btn.onmouseenter = function(){
            this.style.background = "rgba(0,0,0,.5)"
        }
        this.R_btn.onmouseleave= function(){
            this.style.background = 0;
        }
    }
    lb(){
        for(let i = 0 ; i < this.o_num ; i ++){
            // this.o_img[i].style.opacity = 0;
            sport(this.o_img[i],{opacity : 0})
        }
        // this.o_img[this.cur_index].style.opacity = 1;
        sport(this.o_img[this.cur_index],{opacity : 100})
    }
    // 自动轮播
    auto(){
        let that = this;
        this.timer = setInterval(() => {
            this.cur_index ++;
            if(this.cur_index == this.o_num){
                this.cur_index = 0;
            }
            // 轮播
            this.lb()
            this.o_box.onmouseover = function(){
                clearInterval(that.timer);
            }
            this.o_box.onmouseout = function(){
                that.auto();
            }
        },1800)
    }

}
window.onload = function(){
    new Index();
}
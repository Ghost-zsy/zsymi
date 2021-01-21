class Index{
    constructor(){
        //导航栏
        this.con_list = $(".nav-item");
        //下拉列表里面的元素
        this.commodity = $(".commodity");
        //下拉列表
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
        // 获取左按钮
        this.L_btn = $("#left");
        // 获取右按钮;
        this.R_btn = $("#right");
        //获取小图标盒子
        this.o_ol = $(".small-btn");
        //获取小圆点
        this.o_ol_li = $(".small-btn").get(0).children;
        // 设置一个当前下标
        this.cur_index = 0;
        // 设置计时器的名字
        this.timer = null;
        // 添加事件
        this.addEvent();
        // 自动轮播
        this.auto()

        //轮播图左边菜单
        this.slideshow_menu = $(".slideshow-menu a")
        // console.log(this.slideshow_menu);
        //轮播图右边列表
        this.slideshow_list = $(".slideshow-list")
        // console.log(this.slideshow_list);
        this.add2();

        //关键字随机
        this.search_txt = $(".search-txt");
        this.txt_arr = ["小米1","红米k30至尊纪念碑","滚筒洗衣机","第一次的项目","为发烧而生"]
        // console.log(this.search_txt.attr("placeholder"))
        this.randomKeyWord();
    }
    randomKeyWord(){
        let that = this;
        setInterval(() => {
            that.search_txt.attr("placeholder",`${that.txt_arr[that.randomNum(0,that.txt_arr.length - 1)]}`)
            // console.log(this.randomNum(0,that.txt_arr.length - 1))
        }, 3000);
    }
    randomNum(min,max){
        if(min > max){
            [min,max] = [max,min];
        }
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    add(){
        let that = this;
        // let i = document.createElement("div");
        for(let i = 0 ; i < 7 ; i ++){
            this.con_list.get(i).onmouseenter = function(){
                that.nav_menu_list.css({
                    "height" :287,
                    "border-top" : "1px solid #b0b0b0"
                })
                // console.log(that.nav_menu_list);
                $.get("./json/data.json",(data)=>{
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
        let that = this;
        // 设置左按钮点击事件
        this.L_btn.click(()=>{
            that.cur_index --;
            // console.log("下标" + that.cur_index)
            if(that.cur_index == -1){
                that.cur_index = that.o_num - 1;
            }
            that.lb()
        })
        // 设置右按钮点击事件
        this.R_btn.click(()=>{
            that.cur_index ++;
            // console.log("下标" + that.cur_index)
            if(that.cur_index == that.o_num){
                that.cur_index = 0;
            }
            that.lb()
        })
        for(let i = 0 ; i < this.o_num;i ++){
            $("<li>").appendTo(this.o_ol);
            this.o_ol_li[i].onmouseenter = function(){
                this.style.background = "rgba(224, 223, 223, 0.9)";
            }
            this.o_ol_li[i].onmouseleave = function(){
                this.style.background = "rgba(0,0,0,.4)";
                if(that.cur_index == i){
                    this.style.background = "rgba(224, 223, 223, 0.9)";
                }
            }
        }
        this.o_ol_li[0].style.background = "rgba(224, 223, 223, 0.9)";

        for(let j = 0 ; j < this.o_num ; j ++){
            this.o_ol_li[j].onclick = function(){
                // console.log(j);
                that.cur_index = j;
                that.lb();
            }
        }
    }
    lb(){
        for(let i = 0 ; i < this.o_num ; i ++){
            sport(this.o_img[i],{opacity : 0})
            this.o_ol_li[i].style.background = "rgba(0,0,0,.4)";
        }
        sport(this.o_img[this.cur_index],{opacity : 100})
        this.o_ol_li[this.cur_index].style.background = "rgba(224, 223, 223, 0.9)";
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
        },3000)
    }
    add2(){
        let that = this;
        for(let i = 0 ; i < 10 ; i ++){
            this.slideshow_menu.get(i).onmouseenter = function(){
                $.get("./json/menu-list.json",(data)=>{
                    // console.log(data);
                    let str = `
                    <ul>
                        <li>
                            <a href="javascript:;">
                                <img src="${data[i].src}" alt="">
                                <span>${data[i].name}</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <img src="${data[i].src}" alt="">
                                <span>${data[i].name}</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <img src="${data[i].src}" alt="">
                                <span>${data[i].name}</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <img src="${data[i].src}" alt="">
                                <span>${data[i].name}</span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <img src="${data[i].src}" alt="">
                                <span>${data[i].name}</span>
                            </a>
                        </li>
                    </ul>
                        `;
                    if(i < 2 || i === 4){
                        that.slideshow_list.html(str+str+str+str);
                    }else if(i == 6){
                        that.slideshow_list.html(str+str);
                    }else{
                        that.slideshow_list.html(str+str+str);
                    }
                    
                })
                that.slideshow_list.css("visibility","visible");
            }
            this.slideshow_menu.get(i).onmouseleave = function(){
                that.slideshow_list.css("visibility","hidden");
            }
        }
        that.slideshow_list.mouseenter(function(){
            $(this).css("visibility","visible");
        })
        that.slideshow_list.mouseleave(function(){
            $(this).css("visibility","hidden");
        })
    }
}
window.onload = function(){
    new Index();
}
class Detail{
    constructor(){
        this.con_list = $(".nav-item");
        this.commodity = $(".commodity");
        this.nav_menu_list = $(".nav-menu-list");
        this.ceiling = $("#ceiling");
        console.log(this.ceiling);
        this.add();
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
                $.get("../js/data.json",(data)=>{
                    let str =`<a href="#">
                    <img src=".${data[i].src}" alt="${data[i].alt}">
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
        $(window).scroll(()=>{
            if(parseInt($(window).scrollTop()) >= 300){
                that.ceiling.css({
                    "top":"0px",
                })
            }else{
                that.ceiling.css({
                    "top":"-5000px",
                })
            }
        })
    }
}
window.onload = function(){
    new Detail()
}
class Login{
    constructor(){
        this.user = $("#username");
        this.psd  = $("#psd");
        this.btn = $("#btn");
        this.flag = false;
        this.list = $(".tablist");
        this.list2 = $(".tablist2");
        this.confirm = $("#confirm");
        this.login_tab = $(".login-main-tab a");
        this.add();
    }
    add(){
        let that = this;
        this.login_tab.get(0).onclick = function(){
            that.login_tab.get(1).style.color = "";
            this.style.color = "#ff9f1a";
            that.list.css("display","block")
            that.list2.css("display","none")
        }
        this.login_tab.get(1).onclick = function(){
            that.login_tab.get(0).style.color = "";
            this.style.color = "#ff9f1a";
            that.list2.css("display","flex")
            that.list.css("display","none")
        }
        this.user.keyup(function(){
            that.user.css("border","2px solid #666");
        })
        this.btn.click(function(){
            let cookie_str = gj.getCookie("zsy") ? gj.getCookie("zsy") : "";
            let cookie_obj = gj.obj(cookie_str);
            let use = that.user.val();
            let pd = that.psd.val();
            if(use in cookie_obj){
                if(pd === cookie_obj[use]){
                    that.flag = true;
                    alert("登录成功");
                    location.href = "../index.html"
                }else{
                    that.flag = false;
                    that.user.css("border","2px solid orange");
                    alert("用户或者密码错误");
                }
            }
            if(that.flag == false){
                that.user.css("border","2px solid orange");
                alert("用户或者密码错误");
                return;
            }
        })
    }
}
window.onload = function(){
    new Login();
}
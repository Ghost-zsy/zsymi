class Login{
    constructor(){
        this.user = $("#username");
        this.psd  = $("#psd");
        this.btn = $("#btn");
        this.arr = [false,false];
        this.confirm = $("#confirm");
        this.add();
    }
    add(){
        let that = this;
        this.user.blur(function(){
            let str= $(this).val();
            let reg = /^\w+$/i;
            if(reg.test(str)){
                that.arr[0] = true;
                $(this).css("border","2px solid #32ff7e");
            }else{
                that.arr[0] = false;
                $(this).css("border","2px solid orange");
            }
        })
        this.psd.blur(function(){
            let str= $(this).val();
            let reg = /^\w{6,18}$/;
            if(reg.test(str)){
                that.arr[1] = true;
                $(this).css("border","2px solid #32ff7e");
            }else{
                that.arr[1] = false;
                $(this).css("border","2px solid orange");
            }
        })
        this.btn.click(function(){
            if(that.arr.indexOf(false) === -1){
                let cookie_str = gj.getCookie("zsy") ? gj.getCookie("zsy") : "";
                let cookie_obj = gj.obj(cookie_str);
                let use = that.user.val();
                let pd = that.psd.val();
                if(use in cookie_obj){
                    if(pd === cookie_obj[use]){
                        alert("登录成功");
                        location.href = "../index.html"
                    }else{
                        alert("密码不正确");
                    }
                }
            }else{
                alert("该用户不存在");
                return;
            }
        })
    }
}
window.onload = function(){
    new Login();
}
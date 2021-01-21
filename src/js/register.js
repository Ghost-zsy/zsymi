class Register{
    constructor(){
        this.txt = $("#txt");
        this.psd = $("#psd");
        this.confirm = $("#confirm");
        this.btn = $("#btn");
        this.arr = [false,false,false];
        this.add();
    }
    add(){
        let that = this;
        this.txt.blur(function(){
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
        this.confirm.blur(function(){
            let str= $(this).val();
            if(str === that.psd.val()){
                that.arr[2] = true;
                $(this).css("border","2px solid #32ff7e");
            }else{
                that.arr[2] = false;
                $(this).css("border","2px solid orange");
            }
        })
        this.btn.click(function(){
            if(that.arr.indexOf(false) === -1){
                let cookie_str = gj.getCookie("zsy") ? gj.getCookie("zsy") : "";
                let cookie_obj = gj.obj(cookie_str);
                let user = that.txt.val();
                let pd = that.psd.val();
                if(user in cookie_obj){
                    alert("用户名已存在");
                    return;
                }else{
                    cookie_obj[user] = pd;
                    gj.setCookie("zsy",JSON.stringify(cookie_obj),{expires : 3,path : "/"});
                    alert("注册成功");
                    location.href = "./login.html";
                }
            }else{
                alert("请完善信息");
            }
        })
    }
}
window.onload = function(){
    new Register();
}
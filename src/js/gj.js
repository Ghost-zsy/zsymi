let gj = {
    setCookie(key,value,json){
        json = json || {};
        let str = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        if(!isNaN(json.expires)){
            let date = new Date();
            date.setDate(date.getDate() + json.expires);
            str += ";expires=" + date;
        }
        if(json.path){
            str += ";path=" + json.path;
        }
        document.cookie = str;
    },
    getCookie(key){
        let arr = document.cookie.split('; ');
        for(let i = 0,len = arr.length;i < len;i ++){
            let list = arr[i].split('=');
            if(encodeURIComponent(key) === list[0]){
                return decodeURIComponent(list[1]);
            }
        }
    },
    obj(str){
        if(!str){
            return {};
        }
        return JSON.parse(str);
    }
}
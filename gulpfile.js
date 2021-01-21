let {src,dest,watch} = require("gulp");
const sass = require("gulp-sass"),
    cssnano = require("gulp-cssnano"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    babel = require("gulp-babel"),
    imagemin = require("gulp-imagemin"),
    htmlmin = require("gulp-htmlmin"),
    concat = require("gulp-concat")
//任务

// 测试
function fnTest(){
    console.log("可以使用");
}

//复制主页
function CopyIndex(){
    return src("./src/index.html")
    .pipe(dest("./dist"));
}

//压缩css
function fnCss(){
   return src("./src/sass/*.scss")
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(cssnano())
    .pipe(rename({suffix : ".min"}))
    .pipe(dest("./src/css"))
}
function fnJS(){
    return src("./src/js/*.js")
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : ".min"}))
    .pipe(dest("./src/js1"))
}

//json文件
function fnJson(){
    return src("./src/json/*.json")
    .pipe(dest("./dist/json"))
}
//压缩子页
function fnPage(){
    return src("./src/page/*.html")
    .pipe(htmlmin())
    .pipe(dest("./dist/page"))
}

//压缩图片
function fnImg(){
    return src("./src/img/*")
    .pipe(imagemin())
    .pipe(dest("./dist/img"))
}

function fnFont(){
    return src("./src/font/*")
    .pipe(dest("./dist/font"));
}
function fnJS1(){
    return src("./src/js1/*")
    .pipe(dest("./dist/js1"));
}
function fnCss1(){
    return src("./src/css/*")
    .pipe(dest("./dist/css"));
}
function fnWatch(){
    watch("./src/index.html",CopyIndex)
    watch("./src/sass/*.scss",fnCss)
    watch("./src/js/*.js",fnJS)
    watch("./src/page/*.html",fnPage)
    watch("./src/img/*",fnImg)
    watch("./src/font/*",fnFont)
    watch("./src/js1/*",fnJS1)
    watch("./src/css/*",fnCss1)
}
//导出模块
exports.test = fnTest;
exports.index = CopyIndex;
exports.css = fnCss;
exports.js = fnJS;
exports.page = fnPage;
exports.json = fnJson;
exports.img = fnImg;
exports.font = fnFont;
exports.js1 = fnJS1;
exports.css1 = fnCss1;
exports.default = fnWatch;

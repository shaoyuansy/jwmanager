$(function () {
    $('.remember input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });
    $(".remember input").val(0);
    $('.remember input').on('ifChecked', function (event) {
        Remember();
    });
    $('.remember input').on('ifUnchecked', function (event) {
        Forget();
    });
    $(".htmleaf-container").jParticle({
        background: "#d2d6de",
        color: "#ffffff"
    });

    //获取cookie
    var isCookieHave = JSON.parse(getCookiesUser("userMessage"));
    if(isCookieHave) {
        $("#username").val(isCookieHave.username);
        $("#password").val(isCookieHave.password);
        $('.remember input').iCheck('check');
    } else {
        $("#username").val("");
        $("#password").val("");
        $('.remember input').iCheck('uncheck');
    }
    //监听enter
    $(document).keyup(function(event){  
        if(event.keyCode ==13){  
            login();  
        }  
    });
});

function login(){
    var username = $("#username").val();
    var password = $("#password").val();
    if(username == ''){
        $(".loginerrormsg").text('用户名不能为空');
        return false;
    }
    if(password == ''){
        $(".loginerrormsg").text('密码不能为空');
        return false;
    }
    $.ajax({            
        type: "post",
        url: '/login',
        dataType: "json",
        async: false,
        cache: true,
        data: {username:username,password:sha1(password)},
        success: function (msg) {
            if(msg.success){
                if(msg.error == "login"){
                    $(".loginerrormsg").text(msg.errorMassage);
                }else{
                    location.href = msg.data;
                }                    
            }
        },
        error: function (e) {
            console.log(e);
        }
    })
};

function Remember(){
    var userMessage = {
        username: $("#username").val(),
        password: $("#password").val()
    };
    var userMessageJson = JSON.stringify(userMessage);
    document.cookie = "userMessage=" + userMessageJson + ";max-age = " + 24 * 3600 * 7;
}

function Forget(){
    document.cookie = "userMessage=" + " " + ";max-age = 0";
}

//取出name对应的值
function getCookiesUser(key) {
    var value = false;
    var resultArr = document.cookie.split(";");
    for(var i = 0; i < resultArr.length; i++) {
        var str = resultArr[i];
        var arr1 = str.split("=");
        var name1 = arr1[0];
        if(myTrim(name1) == key) {
            value = arr1[1]; //返回用户信息对象
        } else {
            continue ;
        }
    }
    return value;
}

function sha1(str) {
    var sha1_str = hex_sha1(str);
    return sha1_str;
}

function claer(){
    $(".loginerrormsg").text('');
}

function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

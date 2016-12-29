$(document).ready(function () {
    getUserName();
})
function getUserName() {
    var menus = GetIndexData();
    $('#loginUserNameH').html(menus[0].USERNAME + " 老师")
    $('#loginUserNameh').html(menus[0].USERNAME)
    $('#loginUserNameL').html(menus[0].USERNAME + " 老师")
}
//获取用户信息
function GetIndexData() {
    var data = [];
    $.ajax({
        type: "get",
        url: '/userService/getUserData',
        dataType: "json",
        async: false,
        cache: true,
        success: function (d) {
            data = d;
        },
        error: function (e) {
            console.log(e);
        }
    });
    return data;
}


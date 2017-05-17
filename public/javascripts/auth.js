$(document).ready(function () {
    if(getRule().ID == 1){
        $('.superAdmin').show();
    }
    getAdmins();
});


function changeinitpswd(){
    var initpassword = $('#initpassword').val();
    if(initpassword == ''){
        return false;
    }
    if(initpassword.length < 6){
        $("#warning_content").text("初始密码不可少于6个字符");
        $("#warning_modal").modal("show");
        return false;
    }
    initpassword = sha1(initpassword);
    $.ajax({
        type: "post",
        url: '/web_confService/updatepswd',
        dataType: "json",
        data: {npswd:initpassword},
        async: false,
        cache: true,
        success: function (msg) {
            if(msg.state.changedRows>0){
                $('#initpassword').val('')
                $("#success_modal").modal();
                setTimeout(function(){
                    $("#success_modal").modal('hide');
                },1000);
            }else if(result.state.changedRows == 0){
                $("#warning_content").text("密码与原密码相同");
                $("#warning_modal").modal("show");
            }else{
                $("#faile_modal").modal();
                setTimeout(function(){					
                    $("#faile_modal").modal('hide');
                },1000);
            }
        }
    })
}

function change_tpswd(){
    var atname = $('#atname').val();
    var npassword = $('#npassword').val();
    if(atname == ''){
        $("#warning_content").text("请输入学院教师姓名");
        $("#warning_modal").modal("show");
        return false;
    }
    if(npassword == ''){
        $("#warning_content").text("请输入新密码");
        $("#warning_modal").modal("show");
        return false;
    }
    if(npassword.length < 6){
        $("#warning_content").text("新密码不可少于6个字符");
        $("#warning_modal").modal("show");
        return false;
    }
    npassword = sha1(npassword);
    $.ajax({
        type: "post",
        url: '/userService/isAdmin',
        dataType: "json",
        data: {tname:atname},
        async: false,
        cache: true,
        success: function (msg) {
            if(msg.result== ''){
                $("#warning_content").text("此教师未授权登入此系统");
                $("#warning_modal").modal("show");
                return false;
            }
            if(msg.result[0].ID == 1){
                $("#faile_modal").modal();
                setTimeout(function(){					
                    $("#faile_modal").modal('hide');
                },1000);
                return false;
            }
            if(msg.result[0].RULE == 1){
                $("#warning_content").text("不可修改其他管理员密码");
                $("#warning_modal").modal("show");
                return false;
            }
            $.ajax({
                type: "post",
                url: '/userService/changepswd',
                dataType: "json",
                data: {atname:atname,npassword:npassword},
                async: false,
                cache: true,
                success: function (result) {
                    if(result.state.changedRows>0){
                        if(getRule().ID == msg.result[0].ID){
                            $("#warning_content").text("您的密码已修改，请重新登陆");
                            $("#warning_modal").modal("show");
                            setTimeout(function(){			
                                $("#warning_modal").modal('hide');
                                location.href="/login/logout";
                            },1000);
                        }else{
                            $("#success_modal").modal();
                            setTimeout(function(){			
                                $("#success_modal").modal('hide');
                            },1000);
                        }
                    }else if(result.state.changedRows == 0){
                        $("#warning_content").text("密码与原密码相同");
                        $("#warning_modal").modal("show");
                    }else{
                        $("#faile_modal").modal();
                        setTimeout(function(){					
                            $("#faile_modal").modal('hide');
                        },1000);
                    }
                }
            });
        }
    })
}

function addAdmin(){
    var tname = $('#tname').val();
    if(tname == ''){
        $("#warning_content").text("请输入学院教师姓名");
        $("#warning_modal").modal("show");
        return false;
    }
    $.ajax({
        type: "post",
        url: '/userService/isAdmin',
        dataType: "json",
        data: {tname:tname},
        async: false,
        cache: true,
        success: function (msg) {
            if(msg.result== ''){
                $("#warning_content").text("此教师不存在，不能任命管理员");
                $("#warning_modal").modal("show");
                return false;
            }
            if(msg.result[0].ID == 1){
                return false;
            }
            if(msg.result[0].RULE == 1){
                $("#warning_content").text("此教师已是管理员");
                $("#warning_modal").modal("show");
                return false;
            }
            $.ajax({
                type: "post",
                url: '/userService/addAdmin',
                dataType: "json",
                data: {tname:tname},
                async: false,
                cache: true,
                success: function (msg) {
                    if(msg.state.changedRows>0){
                        getAdmins();
                        $("#success_modal").modal();
                        setTimeout(function(){			
                            $("#success_modal").modal('hide');
                        },1000);
                    }else{
                        $("#faile_modal").modal();
                        setTimeout(function(){					
                            $("#faile_modal").modal('hide');
                        },1000);
                    }
                }
            });
        }
    });
}

function delAdmin(ID){
    $.ajax({
        type: "post",
        url: '/userService/delAdmin',
        dataType: "json",
        data: {ID:ID},
        async: false,
        cache: true,
        success: function (msg) {
            if(msg.state.changedRows>0){
                getAdmins();
                $("#success_modal").modal();
                setTimeout(function(){			
                    $("#success_modal").modal('hide');
                },1000);
            }else{
                $("#faile_modal").modal();
                setTimeout(function(){					
                    $("#faile_modal").modal('hide');
                },1000);
            }
        }
    });
}

function getAdmins(){
    $.ajax({
        type: "get",
        url: '/userService/getAdmins',
        dataType: "json",
        async: false,
        cache: true,
        success: function (data) {
            let trStr = '';
            data.forEach(function(v,i,arr) {
                if(v.ID == 1) return true;                    
                trStr += '<tr>';
                trStr += '<td><button type="button" class="delete-btn btn btn-danger btn-sm del-btn" onclick="delAdmin('+ v.ID +')"><span class="glyphicon glyphicon-trash"></span></button></td>'
                trStr += '<td>'+ v.USERNAME +'</td>';
                trStr += '<td>'+ v.YHBH +'</td></tr>';
            });
            if(trStr == ''){
                trStr = '<tr><td colspan="3">暂无其他管理员</td></tr>';
            }
            $("#admins-content").html(trStr);
        }
    });
}

function sha1(str) {
    var sha1_str = hex_sha1(str);
    return sha1_str;
}

function getRule(){
    var userMsg = GetIndexData();
    return userMsg[0];
}   
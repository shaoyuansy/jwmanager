$("#checkall").click(function () {
    var checkbox = document.getElementById('checkall');
    if (checkbox.checked) {
        $('input[type="checkbox"][name="checkrow"]').each(function () {
            this.checked = true;
        });
    } else {
        $('input[type="checkbox"][name="checkrow"]').each(function () {
            this.checked = false;
        });
    }
});

$("#upfile").change(function () {
    var filename = $(this).val().split("\\").pop();
    $(".style_upload").val(filename);
});

$(document).ready(function () {
    var columns = [
        {   
            "data": function (obj) {
                return '<input id="checkrow" name="checkrow" type="checkbox" value=' + obj.ID + '>';
            },
            "className": "text_center"
        },
        {
            "data": "ID",
            "className": "text_center"
        },
        {
            "data": "XM",
            "className": "text_center"
        },
        {
            "data": "GH",
            "className": "text_center"
        },
        {
            "data": "SFZR", 
            "className": "text_center"
        },
        {
            "data": "LXDH",
            "className": "text_center"
        },
        {
            "data": "FGFZR",
            "className": "text_center"
        },
        {
            "data": "ZYJSZC",
            "className": "text_center"
        },
        {
            "data": "XL",
            "className": "text_center"
        },
        {
            "data": "ZGXW",
            "className": "text_center"
        },
        {
            "data": "XKLB",
            "className": "text_center"
        },
        {
            "data": "DSLX",
            "className": "text_center"
        },
        {
            "data": "DWMC",
            "className": "text_center"
        },
        {
            "data": "JXXG",
            "className": "text_center"
        },
        {
            "data": function (obj) {
                var filep = obj.FJ;
                var str = "";
                if (filep == "null" || filep == null || filep == "") {
                    str += '无';
                }
                if (filep != "" && filep != null && filep != "null") {
                    var locArray = filep.split("/");
                    var fileNmae = locArray[locArray.length - 1];
                    str += '<a href="/teacherService/download?filePath=' + filep + '" > ' + fileNmae + '</a>';
                }
                return str;
            },
            "className": "text_center"
        },
        {
            "data": function (obj) {
                var str = '';
                str += '<a style="margin-left: 10px;" onclick="editTeacher(\'' + obj.ID + '\')" href="#" role="button" data-toggle="modal" title="编辑"><i class="fa fa-fw fa-pencil"></i></a>';
                str += '<a style="margin-left: 10px;" onclick="delTeacher(\'' + obj.ID + '\',\'' + obj.XM + '\')" role="button" data-toggle="modal" title="删除"><i class="fa fa-fw fa-trash-o"></i></a>';
                if(obj.SFZR=='学院教师'){
                    if(obj.RULE == 0 || obj.RULE == 1){
                        str += '<a style="margin-left: 10px;" onclick="closeTeacher(\'' + obj.XM + '\')" role="button" data-toggle="modal" title="注销"><i class="fa fa-fw fa-user-times"></i></a>';                            
                    }else{
                        str += '<a style="margin-left: 10px;" onclick="registTeacher(\'' + obj.XM + '\')" role="button" data-toggle="modal" title="激活"><i class="fa fa-fw fa-user-plus"></i></a>';
                    }
                } 
                return str;
            },
            "className": "left_center"
        }
    ];
    var mytable = CreateDataTable('#datatable', '/teacherService/getList', columns);
    //初始化当前显示列的checkbox判断是否选中
    $('input[type="checkbox"][name="checkshow"]').each(function () {
        var column = $("#datatable").DataTable().column($(this).val());
        this.checked = column.visible();
    });

    $('input[type="checkbox"][name="checkshow"]').change(function () {
        var column = $("#datatable").DataTable().column($(this).val());
        column.visible(!column.visible());
    });
});
//编辑
function editTeacher(id) {
    $.ajax({
        url: "/teacher/_editTeacher.html?id=" + id,
        type: "get",
        dataType: 'html',
        async: false,
        success: function (htmlContent) {
            //模态框
            $('#edit-teacher-modal').html(htmlContent);
            $("#edit-teacher-modal").modal('show');
        }
    });
}
//激活用户
function registTeacher(XM){
    $.ajax({
        type: "get",
        url: '/web_confService/getinitpwd',
        dataType: "json",
        cache: true,
        success: function (pwd) {
            pwd = pwd.data.value;
            $.ajax({
                type: "post",
                url: '/userService/adduser',
                dataType: "json",
                data: {name:XM, pwd:pwd},
                cache: true,
                success: function (msg) {
                    if (msg.state.affectedRows == 1) {
                        var table = $('#datatable').DataTable();
                        table.ajax.reload();
                        table.draw();		
                        $("#success_modal").modal();
                        setTimeout(function(){			
                            $("#success_modal").modal('hide');
                        },1000);
                    } else {
                        $("#faile_modal").modal();
                        setTimeout(function(){					
                            $("#faile_modal").modal('hide');
                        },1000);
                    }
                }
            })
        }   
    })
}
//删除用户
function closeTeacher(XM){
    $.ajax({
        type: "post",
        url: '/userService/deluser',
        dataType: "json",
        data: {name:XM},
        cache: true,
        success: function (msg) {
            if (msg.state.affectedRows == 1) {
                var table = $('#datatable').DataTable();
                table.ajax.reload();
                table.draw();		
                $("#success_modal").modal();
                setTimeout(function(){			
                    $("#success_modal").modal('hide');
                },1000);
            } else {
                $("#faile_modal").modal();
                setTimeout(function(){					
                    $("#faile_modal").modal('hide');
                },1000);
            }
        }
    })
}

//删除记录
function delTeacher(ID,XM) {
    $.ajax({
        type: "get",
        url: '/teacherService/delOne',
        dataType: "json",
        data: { ID: ID },
        cache: true,
        success: function (msg) {
            if (msg.state == 1) {
                $.ajax({
                    type: "post",
                    url: '/userService/deluser',
                    dataType: "json",
                    data: {name:XM},
                    cache: true,
                    success: function (m) {
                    }
                })
                var table = $('#datatable').DataTable();
                table.ajax.reload();
                table.draw();		
                $("#success_modal").modal();
                setTimeout(function(){			
                    $("#success_modal").modal('hide');
                },1000);
            } else {
                $("#faile_modal").modal();
                setTimeout(function(){					
                    $("#faile_modal").modal('hide');
                },1000);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}

//批量删除记录
function delSomeTeacher() {
    var flag = false;
    var arr = new Array();
    var names = new Array();
    //遍历所有checkbox
    $('input[type="checkbox"][name="checkrow"]:checked').each(function () {
        arr.push(this.value);
        var name= $(this).parent().parent().find("td")[2];
        name = $(name).text();
        names.push(name);
    });
    if (arr.length != 0) {
        //数组转字符串 ，拼接
        var idstr = arr.join(",");
        var namestr = names.join(",");
        $.ajax({
            type: "post",
            url: '/teacherService/delSome',
            dataType: "json",
            data: { idstr: idstr },
            cache: true,
            success: function (msg) {
                if (msg.result != 0) {
                    $.ajax({
                        type: "post",
                        url: '/userService/delSomeuser',
                        dataType: "json",
                        data: {tnames:namestr},
                        cache: true,
                        success: function (m) {
                            console.log(m);
                        }
                    })
                    var table = $('#datatable').DataTable();
                    table.ajax.reload();
                    table.draw();		
                    $("#success_modal").modal();
                    setTimeout(function(){			
                        $("#success_modal").modal('hide');
                    },1000);
                } else {
                    $("#faile_modal").modal();
                    setTimeout(function(){					
                        $("#faile_modal").modal('hide');
                    },1000);
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    } else {
        $("#warning_content").text("请选择一项删除");
        $("#warning_modal").modal("show");
    }
}

//批量导出
function exportData() {
    var flag = false;
    var arr = new Array();
    //遍历所有checkbox
    $('input[type="checkbox"][name="checkrow"]:checked').each(function () {
        arr.push(this.value);
    });
    if (arr.length != 0) {
        //数组转字符串 ，拼接
        var idstr = arr.join(",");
        window.location.href = "/teacher/_exportTeacher.html?IDstr=" + idstr;
    } else {
        $("#warning_content").text("请选择一项导出");
        $("#warning_modal").modal("show");
    }
}

//导入excel并解析
function readExcel() {
    $(".style_upload").val('');
    var formData = new FormData(); //构建formdata
    formData.append('file', $('#upfile')[0].files[0]);
    if ($('#upfile')[0].files[0]) {
        $.ajax({
            type: 'post',
            url: '/teacher/readExcel',
            enctype: 'multipart/form-data',
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            success: function (msg) {
                if(msg.success){
                    var table = $('#datatable').DataTable();
                    table.ajax.reload();
                    table.draw();		
                    $("#success_modal").modal();
                    setTimeout(function(){			
                        $("#success_modal").modal('hide');
                    },1000);
                }else{
                    $("#warning_content").text(msg.errorMassage);
                    $("#warning_modal").modal("show");
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    } else {
        $("#warning_content").text("请选择一个文件");
        $("#warning_modal").modal("show");
    }
}

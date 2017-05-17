$("#upfile").change(function () {
    var filename = $(this).val().split("\\").pop();
    $(".style_upload").val(filename);
});

$(document).ready(function () {
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

    var columns = [
        {
            "data": function (obj) {
                return '<input id="checkrow" name="checkrow" type="checkbox" value=' + obj.ID + '>';
            },
            "daclassName": "text_center"                
        },
        {
            "data": "ID",
            "daclassName": "text_center"
        },
        {
            "data": "ZYBH",
            "daclassName": "text_center"
        },
        {
            "data": "ZYMC",
            "daclassName": "text_center"
        },
        {
            "data": "SSJYS",
            "daclassName": "text_center"
        },
        {
            "data": "JYSZR",
            "daclassName": "text_center"
        },
        {
            "data": "KSNJ",
            "daclassName": "text_center"
        },
        {
            "data": "BJGS",
            "daclassName": "text_center"
        },
        {
            "data": "GBDYRS",
            "daclassName": "text_center"
        },
        {
            "data": function (obj) {
                return '<a style="margin-left: 10px;" onclick="editMajor(\'' + obj.ID + '\')" href="#" role="button" data-toggle="modal" title="编辑"><i class="fa fa-fw fa-pencil"></i></a>'
                    + '<a style="margin-left: 10px;" onclick="delMajor(\'' + obj.ID + '\')" href="#" role="button" data-toggle="modal" title="删除"><i class="fa fa-fw fa-trash-o"></i></a>';
            },
            "daclassName": "text_center"                
        }
    ];
    var mytable = CreateDataTable('#datatable', '/majorService/getList', columns);

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
function editMajor(id) {
    $.ajax({
        url: "/major/_editMajor.html?id=" + id,
        type: "get",
        dataType: 'html',
        async: false,
        success: function (htmlContent) {
            $('#modal-edit-event').html(htmlContent);
            $("#modal-edit-event").modal('show');
        }
    });
}

//导入excel并解析
function readExcel() {
    $(".style_upload").val('');
    var formData = new FormData(); //构建formdata
    formData.append('file', $('#upfile')[0].files[0]);
    if ($('#upfile')[0].files[0]) {
        $.ajax({
            type: 'post',
            url: '/major/readExcel',
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

//批量导出
function toExcel() {
    //定义一个flag判断存在单选框被选中
    var flag = false;
    $('input[type="checkbox"][name="checkrow"]').each(function () {
        if (this.checked == false) {
            this.parentNode.parentNode.classList = "noExl";
        } else if (this.checked == true) {
            this.parentNode.parentNode.classList = "";
            flag = true;
        }
    });
    if (flag) {
        $("#datatable").table2excel({
            exclude: ".noExl",
            name: "Excel Document Name",
            filename: "专业信息表" + "-" + GetTimeStr(),
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
    } else {
        $("#warning_content").text("请至少选择一项");
        $("#warning_modal").modal("show");
    }
}    

//删除与要删除记录相关的专业-课程记录
function delMajorCourse(data) {
    $.ajax({
        type: "post",
        url: '/major_courseService/delSomeByZy',
        dataType: "json",
        data: {idstr: data},
        cache: true,
        success: function (msg) {
        },
        error: function (e) {
            console.log(e);
        }
    });
}

//删除记录
function delMajor(ID) {
    delMajorCourse(ID);
    $.ajax({
        type: "post",
        url: '/majorService/delOne',
        dataType: "json",
        data: {ID: ID},
        cache: true,
        success: function (msg) {
            if (msg.state == 1) {
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
function delSomeJys() {
    var flag = false;
    var arr = new Array();
    $('input[type="checkbox"][name="checkrow"]:checked').each(function () {
        arr.push(this.value);
    });
    if (arr.length != 0) {
        var idstr = arr.join(",");
        delMajorCourse(idstr);
        $.ajax({
            type: "post",
            url: '/majorService/delSome',
            dataType: "json",
            data: {idstr: idstr},
            cache: true,
            success: function (msg) {
                if (msg.state == 1) {
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

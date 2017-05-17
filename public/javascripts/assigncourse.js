$(document).ready(function () {
    $("#datechoose").datepicker({ //构建时间选择器
        format: 'yyyy/mm',
        autoclose:true,
        language:'zh-CN',
        todayHighlight:true,
        startView:'2',
        minViewMode:'months',
        title:'--------学期选择--------'
    });

    var time = new Date();
    $('#datechoose').datepicker('setDate', time); //初始化现在时间
    build_table(time);//获取表格

    $('#datechoose').datepicker().on('hide', function(e) { //改变时间选择器重新获取当前的信息
        time = $('#datechoose').datepicker('getDate');
        build_table(time);
    });

    $('#modal-edit-xk').on('hidden.bs.modal', function () {
        build_table(time); //构建datatable
    })

    $("#upfile").change(function () {
        var filename = $(this).val().split("\\").pop();
        $(".style_upload").val(filename);
    });

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
});

function build_table(time){
    var term = get1st2nd(time);
    $('.show_term').text(term+" 授课详情");
    var columns = [
        {
            "className": "text_center",
            "data": function (obj) {
                return '<input id="checkrow" name="checkrow" type="checkbox" value=' + obj.ID + '>';
            }
        },
        {
            "data": "JSXM",
            "className": "text_center"
        },
        {
            "data": "KCMC",
            "className": "text_center"
        },
        {
            "data": "KCFZR",
            "className": "text_center"
        },
        {
            "data": "SSZY",
            "className": "text_center"
        },
        {
            "data": "SSNJ",
            "className": "text_center"
        },
        {
            "data": "SSBJ",
            "className": "text_center"
        },
        {
            "data": "BJRS",
            "className": "text_center"
        },
        {
            "data": "SKSJ",
            "className": "text_center"
        },
        {
            "data": "SKDD",
            "className": "text_center"
        },
        {
            "data": "SFWSJK",
            "className": "text_center"
        },
        {
            "data": "SFDSZ",
            "className": "text_center"
        },
        {
            "className": "text_center",
            "data": function (obj) {
                var wpjspj = obj.WPJSPJ;
                var str = "";
                if (wpjspj == "null" || wpjspj == null || wpjspj == "") {
                    str = '(非外聘教师)';
                } else {
                    str = obj.WPJSPJ;
                }
                return str;
            }
        },
        {
            "className": "text_center",
            "data": function (obj) {
                return '<a style="margin-left: 10px;" onclick="editAssign(\'' + obj.ID + '\')" href="#" role="button" data-toggle="modal" title="编辑"><i class="fa fa-fw fa-pencil"></i></a>'
                    + '<a style="margin-left: 10px;" onclick="delAssign(\'' + obj.ID + '\')" href="#" role="button" data-toggle="modal" title="删除"><i class="fa fa-fw fa-trash-o"></i></a>';
            }
        }
    ];
    if ( $.fn.dataTable.isDataTable( '#assgindatatable' ) ) { // 已经构建了database
        var table = $('#assgindatatable').DataTable();
        table.ajax.url( '/assignService/assignList?term='+encodeURI(term)).load();
        table.draw();
    } else {
        var mytable = CreateDataTable('#assgindatatable', '/assignService/assignList?term='+encodeURI(term), columns);
    }
    //初始化当前显示列的checkbox判断是否选中
    $('input[type="checkbox"][name="checkshow"]').each(function () {
        var column = $("#assgindatatable").DataTable().column($(this).val());
        this.checked = column.visible();
    });
    $('input[type="checkbox"][name="checkshow"]').change(function () {
        var column = $("#assgindatatable").DataTable().column($(this).val());
        column.visible(!column.visible());
    });
}

//编辑
function editAssign(id) {
    $.ajax({
        url: "/assigncourse/_editAssign.html?id=" + id,
        type: "get",
        dataType: 'html',
        async: false,
        success: function (htmlContent) {
            $('#modal-edit-event').html(htmlContent);
            $("#modal-edit-event").modal('show');
        }
    });
}

//删除记录
function delAssign(ID) {
    $.ajax({
        type: "post",
        url: '/assignService/delOne',
        dataType: "json",
        data: {ID: ID},
        cache: true,
        success: function (msg) {
            if (msg.state == 1) {
                var table = $('#assgindatatable').DataTable();
                table.ajax.reload();
                table.draw();		
                $("#success_modal").modal();
                setTimeout(function(){			
                    $("#success_modal").modal('hide');
                },1000);
            } else {
                $("#warning_content").text(msg.errorMassage);
                $("#warning_modal").modal("show");
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}

//批量删除记录
function delSomeAssign() {
    var flag = false;
    var arr = new Array();
    //遍历所有checkbox
    $('input[type="checkbox"][name="checkrow"]:checked').each(function () {
        arr.push(this.value);
    });
    if (arr.length != 0) {
        //数组转字符串 ，拼接
        var idstr = arr.join(",");
        $.ajax({
            type: "post",
            url: '/assignService/delSome',
            dataType: "json",
            data: {idstr: idstr},
            cache: true,
            success: function (msg) {
                if (msg.result != 0) {
                    var table = $('#assgindatatable').DataTable();
                    table.ajax.reload();
                    table.draw();		
                    $("#success_modal").modal();
                    setTimeout(function(){			
                        $("#success_modal").modal('hide');
                    },1000);
                } else {
                    $("#warning_content").text(msg.errorMassage);
                    $("#warning_modal").modal("show");
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

//导入excel并解析
function readExcel() {
    $(".style_upload").val("");
    var formData = new FormData(); //构建formdata
    formData.append('file', $('#upfile')[0].files[0]);    
    var time = $('#datechoose').datepicker('getDate');
    var term = get1st2nd(time);
    formData.append('term', term);

    if ($('#upfile')[0].files[0]) {
        $.ajax({
            type: 'post',
            url: '/assigncourse/readExcel',
            enctype: 'multipart/form-data',
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            success: function (msg) {
                if(msg.success){
                    var table = $('#assgindatatable').DataTable();
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

//批量导出(非IE浏览器)
function toExcel() {
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
        $("#assgindatatable").table2excel({
            exclude: ".noExl",//有class = “noExl” 的行不被导出；
            name: "Excel Document Name",
            filename: "授课信息表" + "-" + GetTimeStr(),
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
    } else {
        $("#warning_content").text("请选择一项导出");
        $("#warning_modal").modal("show");
    }
}

function get1st2nd(d){
    if(d==""){
        var nowDate = new Date();
    }else {
        var nowDate = new Date(d);
    }
    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth() + 1;
    var xueqi = '';
    if (nowDate) {
        if (nowMonth < 8 && nowMonth > 1) {
            xueqi = (nowYear-1) + "-" + nowYear + "第二学期";
        }else if (nowMonth >= 8 && nowMonth <= 12 ) {
            xueqi = nowYear + "-" + (nowYear + 1) + "第一学期";
        }else if(nowMonth == 1){
            xueqi = (nowYear-1) + "-" + nowYear + "第一学期";
        }
    }
    return xueqi;
}
$(document).ready(function () {
    $("#datechoose").datepicker({
        format: 'yyyy/mm',
        autoclose:true,
        language:'zh-CN',
        todayHighlight:true,
        startView:'2',
        minViewMode:'months',
        title:'--------学期选择--------'
    });

    var time = new Date();
    $('#datechoose').datepicker('setDate', time); //构建时间选择器
    bulid_table(time); //构建datatable

    $('#datechoose').datepicker().on('hide', function(e) { //改变时间选择器重新获取当前的信息
        time = $('#datechoose').datepicker('getDate');
        bulid_table(time);
    });

    $("#chenkall").click(function () {
        var checkbox = document.getElementById('chenkall');
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
});

function bulid_table(time){ // 构建表格
    var xn = get_term(time);
    var son = getSonMenu(xn);
    let xnzy = bindMenu(xn,son);
    createBynjzy(xnzy);
}

//获取当前的学期
function get_term(d) {
    if(d==""){
        var nowDate = new Date();
    }else {
        var nowDate = new Date(d);
    }
    var nowYear = nowDate.getFullYear();
    var nowMonth = nowDate.getMonth() + 1;
    if (nowMonth >= 8 && nowMonth <= 12) {
        var xuenian1 = nowYear + "级";
        var xuenian2 = nowYear - 1 + "级";
        var xuenian3 = nowYear - 2 + "级";
        var xuenian4 = nowYear - 3 + "级";
    } else if (nowMonth >= 1 && nowMonth < 2 || nowMonth >= 2 && nowMonth <= 7) {
        var xuenian1 = nowYear - 1 + "级";
        var xuenian2 = nowYear - 2 + "级";
        var xuenian3 = nowYear - 3 + "级";
        var xuenian4 = nowYear - 4 + "级";
    }
    var term = [];
    for(let i = 1; i <= 4 ; i++){
        term.push(eval('xuenian'+i));
    }
    return term;
}

//获取当前的学期的专业
function getSonMenu(xn){
    var xnStr = xn.join(",");
    var data = [];
    $.ajax({
        type: "post",
        url: '/major/getZymc',
        dataType: "json",
        data:{xn:xnStr},
        async: false,
        cache: true,
        success: function (msg) {
            if (msg.result != 0) {
                data = msg;
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
    return data;
}

//生成菜单
function bindMenu(xn,son){
    $('#mymenus').html("");
    var tempStr = "";
    var fatherMenus =xn;//获取父菜单项
    if(son.result){ // 判断是否存在这些专业
        var sonMenus =  son.result ;
    }else{
        var sonMenus = [] ;
    }
    xn.forEach(function(v,i,a) {
        var itemStr = "";
        itemStr += "<div class='box box-solid'>";
        itemStr += "<div class='box-header with-border'>";
        itemStr += "<h3 class='box-title'>"+v+"</h3>";
        itemStr += "<div class='box-tools'><button type='button' class='btn btn-box-tool' data-widget='collapse'><i class='fa fa-minus'></i></button></div>";
        itemStr += "</div>";
        itemStr += "<div class='box-body no-padding'>";
        itemStr += "<ul class='nav nav-pills nav-stacked'>";
        sonMenus.forEach(function(s,o,arr) {
            if(s.KSNJ == v){
                itemStr += '<li><a class="cursor" onclick="createBynjzy(\''+v+"-"+s.ZYMC+'\')"><i class="fa fa-fw fa-book"></i>'+s.ZYMC+'</a></li>';
                if(tempStr == "" && v != "" && s.ZYMC != ""){
                    tempStr = v+"-"+s.ZYMC;
                }
            }
        });
        itemStr += "</ul>";
        itemStr += "</div>";
        itemStr += "</div>";
        $('#mymenus').append(itemStr);
    });
    return tempStr;
}

function createBynjzy(xnzy){ 
    var xn = xnzy.split("-")[0];
    var zy = xnzy.split("-")[1];
    var columns = [
        {
            "className": "center",
            "data": function (obj) {
                return '<input id="checkrow" name="checkrow" type="checkbox" value=' + obj.ZKID + '>';
            }
        },
        {
            "data": "ZYBH",
            "className": "center"
        },
        {
            "data": "ZYMC",
            "className": "center"
        },
        {
            "data": "KSNJ",
            "className": "center"
        },
        {
            "data": "KSXQ",
            "className": "center"
        },
        {
            "data": "KCFZR",
            "className": "center"
        }, {
            "data": "KCBH",
            "className": "center"
        },
        {
            "data": "KCMC",
            "className": "center"
        },
        {
            "data": "BJGS",
            "className": "center"
        },
        {
            "data": "GBDYRS",
            "className": "center"
        },
        {
            "data": "JYSHF",
            "className": "center"
        },
        {
            "data": "ZYFZR",
            "className": "center"
        },
        {
            "data": "KCYWMC",
            "className": "center"
        },
        {
            "data": "KCLX",
            "className": "center"
        },
        {
            "data": "ZXS",
            "className": "center"
        },
        {
            "data": "SJXS",
            "className": "center"
        },
        {
            "data": "XF",
            "className": "center"
        },
        {
            "data": "SYDX",
            "className": "center"
        }, {
            "data": "XDKC",
            "className": "center"
        },
        {
            "data": "HXKC",
            "className": "center"
        },
        {
            "className": "center",
            "data": function (obj) {
                return '<a style="margin-left: 10px;" onclick="editMajorCourse(\'' + obj.ZKID + "','"+ obj.ZYID + "','"+ obj.KCID +"','"+ obj.KCMC + "','"+ obj.KSXQ + '\')" href="#" role="button" data-toggle="modal" title="编辑"><i class="fa fa-fw fa-pencil"></i></a>'
                    + '<a style="margin-left: 10px;" onclick="delMajorCourse(\'' + obj.ZKID + '\')" href="#" role="button" data-toggle="modal" title="删除"><i class="fa fa-fw fa-trash-o"></i></a>';
            }
        }
    ];
    if(xnzy == ""){
        $("#h3").text("");
        $("#warning_content").text("暂无专业信息");
        $("#warning_modal").modal("show");
    }else{
        $("#h3").text(xn+"-"+zy+" 专业选课信息");
    }
    if ( $.fn.dataTable.isDataTable( '#datatable' ) ) { // 已经构建了database
        var table = $('#datatable').DataTable();
        table.ajax.url( "/major_courseService/getList?xn="+encodeURI(xn)+"&zy="+encodeURI(zy) ).load();
        table.draw();
    } else {
        var mytable = CreateDataTable('#datatable', "/major_courseService/getList?xn="+encodeURI(xn)+"&zy="+encodeURI(zy), columns);
    }
}

//跳转到添加课程页面
function insert() {
    let xnzyStr = $("#h3").text();
    xnzyStr = xnzyStr.split(" ")[0];
    window.location.href = "/major_course/addCourse.html?data=" + xnzyStr;
}

//编辑
function editMajorCourse(id,zyid,kcid,mc,xq) {
    $("#TEMPKCMC").val(mc);
    $("#TEMPZKID").val(id);
    $("#TEMPKSXQ").val(xq);
    $("#TEMPZYID").val(zyid);
    $("#TEMPKCID").val(kcid);
    $("#edit_term").modal('show');
}
//提交编辑前查找是否有重复的记录
function checkMajorCourse(){
    var flag = false;
    $.ajax({
        type: "post",
        url: '/major_courseService/checkMajorCourse',
        dataType: "json",
        data:{zyid:$("#TEMPZYID").val(),kcid:$("#TEMPKCID").val(),term:$("#TEMPKSXQ").val()},
        async: false,
        cache: true,
        success: function (msg) {
            if(msg.result.length > 0){
                if(msg.result[0].ID != $("#TEMPKZID").val()){
                    $("#warning_content").text("已存在此条选课信息");
                    $("#warning_modal").modal("show");
                }else{
                    $("#edit_term").modal('hide');	
                    $("#success_modal").modal();
                    setTimeout(function(){			
                        $("#success_modal").modal('hide');
                    },1000);
                }
            } else {
                flag = true;
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
    return flag;
}
//提交编辑
function submitEdit(){
    if(checkMajorCourse()){
        $.ajax({
            type: "post",
            url: '/major_courseService/editMajorCourse',
            dataType: "json",
            data:{id:$("#TEMPZKID ").val(),term:$("#TEMPKSXQ").val()},
            async: false,
            cache: true,
            success: function (msg) {
                if(msg.state == 1){
                    $("#edit_term").modal('hide');
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
}

//删除记录
function delMajorCourse(ID) {
    $.ajax({
        type: "get",
        url: '/major_courseService/delOne',
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

function delSome() {
    var flag = false;
    var arr = new Array();
    $('input[type="checkbox"][name="checkrow"]:checked').each(function () {
        arr.push(this.value);
    });
    if (arr.length != 0) {
        var idstr = arr.join(",");
        $.ajax({
            type: "get",
            url: '/major_courseService/delSome',
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

//导入excel并解析返回
function ReadExcel() {
    $(".style_upload").val('');
    var formData = new FormData(); //构建formdata
    formData.append('file', $('#upfile')[0].files[0]);
    if ($('#upfile')[0].files[0]) {
        $.ajax({
            type: 'post',
            url: '/major_course/readExcel',
            enctype: 'multipart/form-data',
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            success: function (msg) {
                if(msg.success){
                    var xlsdata = msg.data;
                    if(changeSql(xlsdata)){
                        var table = $('#datatable').DataTable();
                        table.ajax.reload();
                        table.draw();		
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
//将解析过来的数据进行分析查询 写入数据库
function changeSql(xlsdata){
    var insertStr = '';
    var flag = false;
    xlsdata.forEach(function(v,i,arr) {
        if(i == 0){return true};
        insertStr += '(';
        let zyid = getZyId(v[1]+","+v[0]);
        if(!zyid){
            $("#warning_content").text(v[1]+v[0]+"专业不存在");
            $("#warning_modal").modal("show");
            return;
        }else{
            insertStr += '"' + zyid + '",';
        }
        let kcid = getKcId(v[3]);
        if(!kcid){
            $("#warning_content").text(v[3]+"课程不存在");
            $("#warning_modal").modal("show");
            return;
        }else{
            insertStr += '"' + kcid + '",';
        }
        insertStr += '"' + v[2] + '"),'
    });

    if(insertStr != ""){
        insertStr = insertStr.substr(0, insertStr.length - 1);
        $.ajax({
            type: "post",
            url: '/major_course/insertSome',
            dataType: "json",
            data: {insertStr: insertStr},
            cache: false,
            async: false,//同步
            success: function (result) {
                if(result.success){
                    flag = true;
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    }
    return flag;
}

//由年级专业名获取专业ID
function getZyId(zynj) {
    var zyid = false;
    $.ajax({
        type: "post",
        url: '/major/getZyId',
        dataType: "json",
        data: {zynj: zynj},
        cache: false,
        async: false,//同步
        success: function (result) {
            zyid = result.result[0].ID;
        },
        error: function (e) {
            console.log(e);
        }
    });
    return zyid;
}

//由课程名称获取课程ID
function getKcId(kcmc) {
    var kcid = false;
    $.ajax({
        type: "post",
        url: '/course/getKcId',
        dataType: "json",
        data: {kcmc: kcmc},
        cache: false,
        async: false,//同步
        success: function (result) {
            kcid = result.result[0].ID;
        },
        error: function (e) {
            console.log(e);
        }
    });
    return kcid;
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
        var title = $("#h3").text();
        $("#datatable").table2excel({
            exclude: ".noExl",//有class = “noExl” 的行不被导出；
            name: "Excel Document Name",
            filename: title+"表" + "-" + GetTimeStr(),
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
    } else {
        $("#warning_content").text("请至少选择一项");
        $("#warning_modal").modal("show");
    }
}

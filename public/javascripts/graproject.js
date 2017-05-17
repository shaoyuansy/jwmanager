var mytable;

$(document).ready(function () {
    $("#datechoose").datepicker({
        format: 'yyyy',
        autoclose:true,
        language:'zh-CN',
        todayHighlight:true,
        startView:'2',
        minViewMode:'years',
        title:'--------年级选择--------'
    });

    var nowtime = new Date();
    var time = new Date((nowtime.getFullYear()-4)+"-01-01");
    $('#datechoose').datepicker('setDate', time); //构建时间选择器
    bulid_table(time);

    $('#datechoose').datepicker().on('hide', function(e) { //改变时间选择器重新获取当前的信息
        time = $('#datechoose').datepicker('getDate');
        bulid_table(time);
    });

    //全选  全反选处理
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
    })
});
//添加课程
function addGra(){
    if(getGra()){
        $("#addGraproject").modal('show');
    }      
}
//编辑
function editGra(id,jsid,zyid,rs) {
    if(getGra()){
        $("#EDITID").val(id);
        $("#EDITZDJS").val(jsid);
        $("#EDITZY").val(zyid);
        $("#EDITRS").val(rs);
        $("#editGraproject").modal('show');
    }        
}

function submmiteditGra(){
    var jsid = $("#EDITZDJS").val();
    var zyid = $("#EDITZY").val();
    var rs = $("#EDITRS").val();
    var id = $("#EDITID").val();
    var exid = checkGra(jsid,zyid);
    if(exid != "" && exid != id){
        $("#warning_content").text("该记录已存在");
        $("#warning_modal").modal("show");
        return false;
    }else if(rs == ""){
        $("#warning_content").text("人数不能为空");
        $("#warning_modal").modal("show");
        return false;
    }else{
        $.ajax({
            url: "/graService/editGra",
            type: "post",
            dataType: 'json',
            data:{ZYID:zyid,JSID:jsid,RS:rs,ID:id},
            async: false,
            success: function (data) {
                if(data.state && data.state.affectedRows>0){
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
            }
        });
    }
}

function submmitaddGra(){
    var jsid = $("#ZDJS").val();
    var zyid = $("#ZY").val();
    var rs = $("#RS").val();
    if(checkGra(jsid,zyid)!=""){
        $("#warning_content").text("该记录已存在");
        $("#warning_modal").modal("show");
        return false;
    }else if(jsid == "null" || zyid == "null" || jsid == null || zyid == null){
        return false;
    }else if(rs == ""){
        $("#warning_content").text("人数不能为空");
        $("#warning_modal").modal("show");
        return false;
    }else{
        $.ajax({
            url: "/graService/addGra",
            type: "post",
            dataType: 'json',
            data:{ZYID:zyid,JSID:jsid,RS:rs},
            async: false,
            success: function (data) {
                if(data.state && data.state.affectedRows>0){
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
            }
        });
    }
}

var getGraflag = false;
function getGra() { // 获取教师与专业
    var flag = 2;
    var time = $('#datechoose').datepicker('getDate');
    time = time.getFullYear()+"级";
    $.ajax({ // 获取专任教师
        url: "/teacherService/getZRteacher",
        type: "get",
        async: false,
        success: function (data) {
            if(data.result){
                var options = "";
                data.result.forEach(function(v,i,arr) {
                    options += '<option value='+ v.ID +'>'+ v.XM +'</option>';
                });
                if(options == ""){
                    $("#ZDJS").html("");
                    $("#EDITZDJS").html("");
                    $("#ZDJS").attr("disabled","disabled");
                    $("#EDITZDJS").attr("disabled","disabled")
                }else{
                    $("#ZDJS").removeAttr("disabled");
                    $("#EDITZDJS").removeAttr("disabled");
                    $("#ZDJS").html(options);
                    $("#EDITZDJS").html(options);
                }
                flag--;
            }
        }
    });
    $.ajax({ // 获取专业
        url: "/majorService/getListByYear",
        type: "post",
        dataType: 'json',
        data:{KSNJ:time},
        async: false,
        success: function (data) {
            if(data.data){
                var options = "";
                data.data.forEach(function(v,i,arr) {
                    options += '<option value='+ v.ID +'>'+ v.ZYMC +'</option>';
                });
                if(options == ""){
                    $("#ZY").html("");
                    $("#EDITZY").html("");
                    $("#ZY").attr("disabled","disabled");
                    $("#EDITZY").attr("disabled","disabled")
                }else{
                    $("#ZY").html(options);
                    $("#EDITZY").html(options);
                    $("#ZY").removeAttr("disabled");
                    $("#EDITZY").removeAttr("disabled");
                }
                flag--;
            }
        }
    });
    flag > 0 ? getGraflag = false : getGraflag = true;
    return getGraflag;
}

var flaggra = "";
function checkGra(jsid,zyid){ // 验证是否存在
    $.ajax({
        url: "graService/exGra",
        type: "post",
        dataType: 'json',
        data:{ZYID:zyid,JSID:jsid},
        async: false,
        success: function (data) {
            if(data.data && data.data.length>0){
                flaggra = data.data[0].ID;
            }
        }
    });
    return flaggra;
}

//删除记录
function delGra(ID) {
    $.ajax({
        type: "post",
        url: '/graService/delOne',
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
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}

//批量删除记录
function delSomeGra() {
    var flag = false;
    var arr = new Array();
    $('input[type="checkbox"][name="checkrow"]:checked').each(function () {
        arr.push(this.value);
    });
    if (arr.length != 0) {
        var idstr = arr.join(",");
        $.ajax({
            type: "post",
            url: '/graService/delSome',
            dataType: "json",
            data: {idstr: idstr},
            cache: true,
            success: function (msg) {
                if (msg.state && msg.state.affectedRows>0) {
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

function bulid_table(time){ 
    time = time.getFullYear()+"级";
    var columns = [
        {
            "data": function (obj) {
                return '<input id="checkrow" name="checkrow" type="checkbox" value=' + obj.ID + '>';
            },
            "className": "text_center"
        },
        {
            "data": "JSXM",
            "className": "text_center"
        },
        {
            "data": "ZYMC",
            "className": "text_center"
        },
        {
            "data": "RS",
            "className": "text_center"
        },
        {
            "data": function (obj) {
                return '<a style="margin-left: 10px;" onclick="editGra(\'' + obj.ID +'\',\''+ obj.JSID +'\',\''+ obj.ZYID +'\',\''+ obj.RS +'\')" href="#" role="button" data-toggle="modal" title="编辑"><i class="fa fa-fw fa-pencil"></i></a>'
                    + '<a style="margin-left: 10px;" onclick="delGra(\'' + obj.ID + '\')" href="#" role="button" data-toggle="modal" title="删除"><i class="fa fa-fw fa-trash-o"></i></a>';
            },
            "className": "text_center"
        }
    ];
    if ( $.fn.dataTable.isDataTable( '#datatable' ) ) { // 已经构建了database
        var table = $('#datatable').DataTable();
        table.ajax.url( '/graService/getList?TERM='+encodeURI(time) ).load();
        table.draw();
    } else {
        var mytable = CreateDataTable('#datatable', '/graService/getList?TERM='+encodeURI(time), columns);
    }
}

//批量导出
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
        $("#datatable").table2excel({
            exclude: ".noExl",
            name: "Excel Document Name",
            filename: "毕业设计分配信息表" + "-" + GetTimeStr(),
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
    } else {
        $("#warning_content").text("请至少选择一项");
        $("#warning_modal").modal("show");
    }
}
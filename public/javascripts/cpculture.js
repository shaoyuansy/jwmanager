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

    $('#teachername').val(getSessionUser());
    var nowxn = get1st2nd('');
    var time = new Date(nowxn+"-01-01");
    $('#datechoose').datepicker('setDate', time); //构建时间选择器
    build_table();//获取表格
    getZKT();
    getassignMsg();

    $('#datechoose').datepicker().on('hide', function(e) { //改变时间选择器重新获取当前的信息
        build_table();
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

    $(".ZJMC").change(function () {
        if($(".ZJMC").val() == "绪论"){
            $(".SKSJ").val('第3周');
        }else if($(".ZJMC").val() == "数据在计算机中的表示"){
            $(".SKSJ").val('第4周');
        }else if($(".ZJMC").val() == "计算机硬件系统"){
            $(".SKSJ").val('第5周');
        }else if($(".ZJMC").val() == "计算机软件系统"){
            $(".SKSJ").val('第7周');
        }else if($(".ZJMC").val() == "操作系统和文件管理"){
            $(".SKSJ").val('第8周');
        }else if($(".ZJMC").val() == "计算机网络"){
            $(".SKSJ").val('第9周');
        }else if($(".ZJMC").val() == "数字媒体技术基础"){
            $(".SKSJ").val('第10周');
        }else if($(".ZJMC").val() == "计算机信息安全"){
            $(".SKSJ").val('第11周');
        }
    });

    $(".SKSJ").change(function () {
        if($(".SKSJ").val() == "第3周"){
            $(".ZJMC").val('绪论');
        }else if($(".SKSJ").val() == "第4周"){
            $(".ZJMC").val('数据在计算机中的表示');
        }else if($(".SKSJ").val() == "第5周"){
            $(".ZJMC").val('计算机硬件系统');
        }else if($(".SKSJ").val() == "第7周"){
            $(".ZJMC").val('计算机软件系统');
        }else if($(".SKSJ").val() == "第8周"){
            $(".ZJMC").val('操作系统和文件管理');
        }else if($(".SKSJ").val() == "第9周"){
            $(".ZJMC").val('计算机网络');
        }else if($(".SKSJ").val() == "第10周"){
            $(".ZJMC").val('数字媒体技术基础');
        }else if($(".SKSJ").val() == "第11周"){
            $(".ZJMC").val('计算机信息安全');
        }
    });

    var rule = getRule();
    if(rule == 1){
        $(".adminshow").show();
    }

});

function build_table(){
    var time = $('#datechoose').datepicker('getDate');
    $('.show_term').text(time.getFullYear()+"级 《计算机文化》课程安排信息表");
    var nj = time.getFullYear()+"级";
    var columns = [
        {
            "className": "text_center",
            "data": function (obj) {
                return '<input id="checkrow" name="checkrow" type="checkbox" value=' + obj.ID + '>';
            }
        },
        {
            "data": "ZJMC",
            "className": "text_center"
        },
        {
            "data": "KS",
            "className": "text_center"
        },
        {
            "data": "ZKT",
            "className": "text_center"
        },
        {
            "data": "SJ",
            "className": "text_center"
        },
        {
            "className": "text_center",
            "data": function (obj) {
                return obj.SSZY +" "+ obj.SSBJ +" "+ obj.SKSJ +" "+ obj.SKDD;
            }
        },
        {
            "data": "SKJS",
            "className": "text_center"
        },
        {
            "className": "text_center",
            "defaultContent": '',
            "data": function (obj) {
                var rule = getRule();
                if($("#teachername").val() == obj.SKJS || rule == 1){
                    return '<a style="margin-left: 10px;" onclick="delCulture(\'' + obj.ID + '\')" href="#" role="button" data-toggle="modal" title="删除"><i class="fa fa-fw fa-trash-o"></i></a>';  
                }
            }
        }
    ];
    if ( $.fn.dataTable.isDataTable( '#culturedatatable' ) ) { // 已经构建了database
        var table = $('#culturedatatable').DataTable();
        table.ajax.url( '/cpcultureService/cpcultureList?nj='+encodeURI(nj)).load();
        table.draw();
    } else {
        var mytable = CultureDataTable('#culturedatatable', '/cpcultureService/cpcultureList?nj='+encodeURI(nj), columns);
    }
}

function assignCpculture(){
    var time = $('#datechoose').datepicker('getDate');
    var SSNJ = time.getFullYear()+"级";
    var ZJMC = $(".ZJMC").val();
    var KS = $(".KS").val();
    var ZKT = $(".ZKT").val();
    var SJ = $(".SKSJ").val();
    var SKXXArr = $(".SKXX").val().split(" ");
    var rule = getRule();
    if(rule == 1){
        var SKJS = $("#A_SKJS").val();
        if(SKJS == ""){
            $("#warning_content").text('授课教师不可为空');
            $("#warning_modal").modal("show");
            return false;
        }
    }else{
        var SKJS = getSessionUser();
    }        
    var SSZY = SKXXArr[0];
    var SSBJ = SKXXArr[1];
    var SKSJ = SKXXArr[2];
    var SKDD = SKXXArr[3];
    $.ajax({
        url: "/cpcultureService/existCulture",
        type: "post",
        dataType: 'json',
        data:{ZJMC:ZJMC,KS:KS,ZKT:ZKT,SJ:SJ,SSNJ:SSNJ,SSZY:SSZY,SSBJ:SSBJ,SKSJ:SKSJ,SKDD:SKDD},
        async: false,
        success: function (data) {
            if(data.result && data.result.length>0){
                $("#warning_content").text("不可重复选课");
                $("#warning_modal").modal("show");
            }else{
                $.ajax({
                    url: "/cpcultureService/assignCulture",
                    type: "post",
                    dataType: 'json',
                    data:{ZJMC:ZJMC,KS:KS,ZKT:ZKT,SJ:SJ,SSNJ:SSNJ,SSZY:SSZY,SSBJ:SSBJ,SKSJ:SKSJ,SKDD:SKDD,SKJS:SKJS},
                    async: false,
                    success: function (data) {
                        if(data.result && data.result.affectedRows > 0){
                            var table = $('#culturedatatable').DataTable();
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
                });
            }
        }
    });
}

function delCulture(ID){
    $.ajax({
        type: "post",
        url: '/cpcultureService/delOne',
        dataType: "json",
        data: {ID: ID},
        cache: true,
        success: function (msg) {
            if (msg.state == 1) {
                var table = $('#culturedatatable').DataTable();
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
        }
    });
}

//批量删除记录
function delSomeCulture() {
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
            url: '/cpcultureService/delSome',
            dataType: "json",
            data: {idstr: idstr},
            cache: true,
            success: function (msg) {
                if (msg.result != 0) {
                    var table = $('#culturedatatable').DataTable();
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

function getZKT(){
    time = $('#datechoose').datepicker('getDate');
    time = time.getFullYear()+"级";
    $.ajax({
        url: "/cpcultureService/getZTS",
        type: "post",
        dataType: 'json',
        data:{SSNJ:time},
        async: false,
        success: function (data) {
            if(data.result.length > 0){
                $(".ZKT").html('<option>'+ data.result[0].ZKT +'</option>');                        
            }
        }
    });
}

function getassignMsg(){
    time = $('#datechoose').datepicker('getDate');
    time = time.getFullYear()+"级";
    $.ajax({
        url: "/cpcultureService/getassignMsg",
        type: "post",
        dataType: 'json',
        data:{SSNJ:time},
        async: false,
        success: function (data) {
            if(data.result.length > 0){
                var str = '';
                data.result.forEach(function(v,i,arr) {
                    str += '<option>'+ v.SSZY +" "+ v.SSBJ +" "+ v.SKSJ +" "+ v.SKDD +'</option>';
                });
                $(".SKXX").html(str);                        
            }
        }
    });
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
            xueqi = nowYear-1;
        }else if (nowMonth >= 8 && nowMonth <= 12 ) {
            xueqi = nowYear;
        }else if(nowMonth == 1){
            xueqi = nowYear-1;
        }
    }
    return xueqi;
}

function getSessionUser(){ //获取当前登录教师
    var userMsg = GetIndexData();
    return userMsg[0].USERNAME;
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
        $("#culturedatatable").table2excel({
            exclude: ".noExl",//有class = “noExl” 的行不被导出；
            name: "Excel Document Name",
            filename: "计算机文化授课信息表" + "-" + GetTimeStr(),
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
    } else {
        $("#warning_content").text("请选择一项导出");
        $("#warning_modal").modal("show");
    }
}

function getRule(){
    var userMsg = GetIndexData();
    return userMsg[0].RULE;
}    
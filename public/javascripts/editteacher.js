$(document).ready(function () {
    if ($("#ID").val() > 0) {
        $('#XM').attr("readonly", true);
    }
    $("#XB").val($("#XBTEMP").val());
    $("#MZ").val($("#MZTEMP").val());
    $("#JYSMC").val($("#JYSMCTEMP").val());
    $("#ZYJSZC").val($("#ZYJSZCTEMP").val());
    $("#RZZT").val($("#RZZTTEMP").val());
    $("#GZDWLB").val($("#GZDWLBTEMP").val());
    $("#XL").val($("#XLTEMP").val());
    $("#ZGXW").val($("#ZGXWTEMP").val());
    $("#SFZR").val($("#SFZRTEMP").val());
    $("#DSLX").val($("#DSLXTEMP").val());
    $("#XY").val($("#XYTEMP").val());
    $("#DQ").val($("#DQTEMP").val());
    $("#JXXG").val($("#JXXGTEMP").val());
    $("#SFWSSX").val($("#SFWSSXTEMP").val());
    $("#SFJYHYBJ").val($("#SFJYHYBJTEMP").val());
    $("#SFJYGCBJ").val($("#SFJYGCBJTEMP").val());
    $("#SFSJSFZFYJ").val($("#SFSJSFZFYJTEMP").val());
    $("#SFSJGZZFYJ").val($("#SFSJGZZFYJTEMP").val());
    $("#SFSJJSZGZFYJ").val($("#SFSJJSZGZFYJTEMP").val());
    $("#SFSJXWZFYJ").val($("#SFSJXWZFYJTEMP").val());
    $("#SFSJBYZFYJ").val($("#SFSJBYZFYJTEMP").val());
    $("#SFSJZCZFYJ").val($("#SFSJZCZFYJTEMP").val());
    $("#SFSJXYS").val($("#SFSJXYSTEMP").val());

    //判断是否有附件 有则显示文件名
    var filePath = document.getElementById("FJ").value;
    if (filePath != "" && filePath != "null") {
        var locArray = filePath.split("/");
        var fileName = locArray[locArray.length - 1];
        $updatefilea = $('<a href="javascript:void(0)" onclick="aclick(\'/teacherService/download?filePath=' + filePath + '\')"  ondblclick="adblclick(this)" > ' + fileName + '</a>');
        $('#fileList').append($updatefilea);
    }
    //上传事件
    $('#upload_append').uploadify({
        'auto': false,//自动上传
        'uploader': '/tools/uploadFile/uploadFile.html',
        'swf': '/javascripts/uploadify3.2.1/uploadify.swf',
        'buttonClass':'upload-button',
        'height':'28',
        'width':'75',
        'buttonText': '浏览文件',//显示在浏览按钮上的文本
        'removeTimeout': "0.5",//清除延迟
        'fileTypeExts': '*.zip; *.rar; *.7z',//格式
        'fileTypeDesc': '请选择10MB以下的zip、rar、7z文件',//格式
        'folder': '/uploads',//上传到的文件路径
        'fileSizeLimit': '10MB',//文件大小上限
        'progressData': 'percentage',//上传进度更新队列项目中显示数据的类型
        'method'   : 'post',
        //'formData' : { 'someKey' : 'someValue' },
        'multi': false,//多文件上传
        'onDialogClose':function(queueData){ //关闭对话框触发
            if(queueData.queueLength > 0){
                let filefullname = queueData.files.SWFUpload_0_0.name;
                let filename = filefullname.split('.')[0];
                if(filename != $('#XM').val()){
                    $("#warning_content").text("请将文件命名为："+$('#XM').val()+"."+filefullname.split('.')[1]+" 后，重新添加上传");
                    $("#warning_modal").modal("show");
                    $('#upload_append').uploadify('cancel','*');
                    return false;
                }
                $("#goto_upload").show();
            }
        },
        'onUploadSuccess':function (fileObj, dataObj, response) { //上传完成后事件
            if (response == true) {
                $("#goto_upload").hide();
                var fileName = fileObj.name;
                var filePath = '/uploads/' + fileName;
                //将上传的附件链接显示在附件栏中
                $('#fileList').html('<a href="javascript:void(0)" onclick="aclick(\'/teacherService/download?filePath=' + filePath + '\')" '+
                ' ondblclick="adblclick(this)" > ' + fileName + '</a><input id="hidfj" name="hidfj" type="hidden" value="' + filePath + '"/>');
            } else {
                $("#warning_content").text("文件上传出错");
                $("#warning_modal").modal("show");
            }
        }
    });
});

var TimeFn = null;

function aclick(url) {
    clearTimeout(TimeFn);
    TimeFn = setTimeout(function () {
        window.location.href = url;
    }, 300);
}

function adblclick(_this) {
    clearTimeout(TimeFn)
    $(_this).next().remove();
    $(_this).remove();
    $("#FJ").val("");
}


function submitForm() {
    var verge = true;
    var regCSNY = /[12]\d{3}.?(?:0[1-9]|1[0-2])$/;
    var regSFZHM = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    var regSJH = /^[1][358][0-9]{9}$/;
    var regGH = /([0-9]{3,4}-)?[0-9]{7,8}/;
    var regRXSJ = /^((?:19|20)\d\d).(0[1-9]|1[012]).(0[1-9]|[12][0-9]|3[01])$/;
    var valID = $("#ID").val();
    if ($('#XM').val() == "") {
        $("#warning_content").text("姓名不能为空");
        $("#warning_modal").modal("show");
        var verge = false;
    } else if ($('#SFZR').val() == "") {
        $("#warning_content").text("是否专任不能为空");
        $("#warning_modal").modal("show");
        var verge = false;
    } else if ($('#CSNY').val() != "" && !regCSNY.test($('#CSNY').val())) {
        $("#warning_content").text("出生年月格式不正确，如：1980.12");
        $("#warning_modal").modal("show");
        var verge = false;
    } else if ($('#SFZHM').val() != "" && !regSFZHM.test($('#SFZHM').val())) {
        $("#warning_content").text("身份证格式不正确，请仔细检查");
        $("#warning_modal").modal("show");
        var verge = false;
    } else if ($('#LXDH').val() != "" && !(regSJH.test($('#LXDH').val()) || regGH.test($('#LXDH').val()))) {
        $("#warning_content").text("联系电话格式或位数不正确，若固话：xxxx-xxxxxxx 或 （无区号）xxxxxxx");
        $("#warning_modal").modal("show");
        var verge = false;
    } else if ($('#RXSJ').val() != "" && !(regRXSJ.test($('#RXSJ').val()))) {
        $("#warning_content").text("入校时间格式不正确，如：2005.09.09");
        $("#warning_modal").modal("show");
        var verge = false;
    } else if ($('#DZSJ').val() != "" && !regRXSJ.test($('#DZSJ').val())) {
        $("#warning_content").text("定职时间格式不正确，如：2005.09.09");
        $("#warning_modal").modal("show");
        var verge = false;
    } else if ($('#BYSJ').val() != "" && !(regRXSJ.test($('#BYSJ').val()))) {
        $("#warning_content").text("毕业时间格式不正确，如：2001.07.02");
        $("#warning_modal").modal("show");
        var verge = false;
    } else if ($('#CSDKSJ').val() != "" && !(regRXSJ.test($('#CSDKSJ').val()))) {
        $("#warning_content").text("初始代课时间格式不正确，如：2005.09.09");
        $("#warning_modal").modal("show");
        var verge = false;
    }
    if (verge && valID == 0) {
        if ( !getNAME($('#XM').val()) ) {
            $("#warning_content").text("此教师已存在，请重新填写");
            $("#warning_modal").modal("show");
            var verge = false;
        }
    }
    if ($('#FGFZR').val() != "" && verge) {
        if ( !getFZR($('#FGFZR').val()) ) {
            $("#warning_content").text("分管负责人非专任教师，请重新填写");
            $("#warning_modal").modal("show");
            var verge = false;
        }
    }
    if( ($("#SFSJSFZFYJ").val()=='有' || $("#SFSJGZZFYJ").val()=='有' || $("#SFSJJSZGZFYJ").val()=='有' || $("#SFSJXWZFYJ").val()=='有'
        || $("#SFSJBYZFYJ").val()=='有' || $("#SFSJZCZFYJ").val()=='有' || $("#SFSJXYS").val()=='有' ) && $("#fileList").html() == '') {
            $("#warning_content").text("请上传附件");
            $("#warning_modal").modal("show");
            return false;
    }
    if (verge) {
        //获取服务器上的附件的值
        var filePath = document.getElementById("FJ").value;
        //如果本次修改未重新上传附件，则附件值还为原来的值
        if (typeof($('#hidfj').val()) == "undefined") {
            document.getElementById("FJ").value = filePath;
            //如果重新上传附件，则附件值为新的上传的值
        } else {
            document.getElementById("FJ").value = $('#hidfj').val();
        }
        $.ajax({
            type: "post",
            url: '/teacher/_editTeacher.html',
            dataType: "json",
            data: $('#teacherform').serialize(),
            async: false,
            cache: true,
            success: function (msg) {
                if (msg.result != 0) {
                    var table = $('#datatable').DataTable();
                    table.ajax.reload();
                    table.draw();		
                    $("#success_modal").modal();
                    setTimeout(function(){			
                        $("#success_modal").modal('hide');
                    },1000);
                    $("#edit-teacher-modal").modal('hide');                        
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    }
}

function getNAME(tname) {//判断姓名和是否重复
    var flag = true;
    $.ajax({
        type: "post",
        url: '/teacherService/getNAME',
        dataType: "json",
        data: {TNAME: tname},
        async: false,
        cache: true,
        success: function (msg) {
            if(msg.data.length>0){
                flag = false;
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
    return flag;
}

function getFZR(tname) {//判断分管负责人
    var flag = true;
    $.ajax({
        type: "post",
        url: '/teacherService/getFZR',
        dataType: "json",
        data: {TNAME: tname},
        async: false,
        cache: true,
        success: function (msg) {
            if(msg.data.length>0){
                if(msg.data[0]['SFZR'] != "学院教师"){
                    flag = false;
                }
            }else{
                flag = false;
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
    return flag;
}
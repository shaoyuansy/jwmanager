$(document).ready(function () {
    var term = $('.show_term').text().split(" ")[0];
    $("#TERM").val(term);
    $("#JSXM").val($("#JSXMTEMP").val());
    $("#SSKC").val($("#SSKCTEMP").val());
    $("#KCFZR").val($("#KCFZRTEMP").val());
    $("#SSZY").val($("#SSZYTEMP").val());
    $("#SSNJ").val($("#SSNJTEMP").val());
    $("#SSBJ").val($("#SSBJTEMP").val());
    $("#SFWSJK").val($("#SFWSJKTEMP").val());
    $("#SFDSZ").val($("#SFDSZTEMP").val());
    var JSXM = $('#JSXM');
    var SSKC = $('#SSKC');
    var KCFZR = $('#KCFZR');
    var SSZY = $('#SSZY');
    var SSNJ = $('#SSNJ');
    var SSBJ = $('#SSBJ');
    kcStr = "";
    fzrStr = "";
    $.ajax({
        type: "post",
        url: '/assignService/getkcStr',
        dataType: "json",
        data: {JSXM: JSXM.val()},
        async: true,
        success: function (data) {
            if (data) {
                for (var i = 0; i < data.state.length; i++) {
                    kcStr += "<option value='" + data.state[i].KCMC + "'>" + data.state[i].KCMC + "</option>";
                    if (data.state[i].SFZR == '学院教师') {
                        $('#WPJSPJ').val("");
                        $('#WPJSPJ').attr("placeholder", "（非外聘教师）");
                        $('#WPJSPJ').attr("disabled", true);
                    } else {
                        $('#WPJSPJ').attr("disabled", false);
                    }
                }
            }
            SSKC.html(kcStr);
            $.ajax({
                type: "post",
                url: '/assignService/getfzrStr',
                dataType: "json",
                data: {KCMC: $('#SSKC').val()},
                async: true,
                success: function (fzrdata) {
                    if (fzrdata.state[0]) {
                        fzrStr = "<option value='" + fzrdata.state[0]['KCFZR'] + "'>" + fzrdata.state[0].KCFZR + "</option>";
                    }
                    KCFZR.html(fzrStr);
                }
            });
            var zyStr = "";
            $.ajax({
                type: "post",
                url: '/assignService/getzyStr',
                dataType: "json",
                data: {JSXM: JSXM.val(), KCMC: SSKC.val()},
                async: true,
                success: function (data) {
                    if (data) {
                        for (var i = 0; i < data.state.length; i++) {
                            zyStr += "<option value='" + data.state[i].ZYMC + "'>" + data.state[i].ZYMC + "</option>";
                        }
                    }
                    SSZY.html(zyStr);
                    var njStr = "";
                    $.ajax({
                        type: "post",
                        url: '/assignService/getnjStr',
                        dataType: "json",
                        data: {JSXM: JSXM.val(), KCMC: SSKC.val(), ZYMC: SSZY.val()},
                        async: true,
                        success: function (data) {
                            if (data) {
                                for (var i = 0; i < data.state.length; i++) {
                                    njStr += "<option value='" + data.state[i].KSNJ + "'>" + data.state[i].KSNJ + "</option>";
                                }
                                SSNJ.html(njStr);
                                var bjStr = "";
                                $.ajax({
                                    type: "post",
                                    url: '/assignService/getbjStr',
                                    dataType: "json",
                                    data: {JSXM: JSXM.val(), KCMC: SSKC.val(), ZYMC: SSZY.val(), SSNJ: SSNJ.val()},
                                    async: true,
                                    success: function (data) {
                                        if (data.state.length>0) {                                                
                                        for (var b = 1; b <= data.state[0].BJGS; b++){
                                            bjStr += "<option value='" + b + "大班'>" + b + "大班</option>";
                                        }                                              
                                        SSBJ.html(bjStr);
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    });

});

var JSXM = $('#JSXM');
var SSKC = $('#SSKC');
var KCFZR = $('#KCFZR');
var SSZY = $('#SSZY');
var SSNJ = $('#SSNJ');
var SSBJ = $('#SSBJ');
JSXM.change(function () {
    kcStr = "";
    fzrStr = "";
    $.ajax({
        type: "post",
        url: '/assignService/getkcStr',
        dataType: "json",
        data: {JSXM: JSXM.val()},
        async: true,
        success: function (data) {
            if (data) {
                for (var i = 0; i < data.state.length; i++) {
                    kcStr += "<option value='" + data.state[i].KCMC + "'>" + data.state[i].KCMC + "</option>";
                    if (data.state[i].SFZR == '学院教师') {
                        $('#WPJSPJ').val("");
                        $('#WPJSPJ').attr("placeholder", "（非外聘教师）");
                        $('#WPJSPJ').attr("disabled", true);
                    } else {
                        $('#WPJSPJ').attr("placeholder", "请输入评价");
                        $('#WPJSPJ').attr("disabled", false);
                    }
                }
            }
            SSKC.html(kcStr);
            $.ajax({
                type: "post",
                url: '/assignService/getfzrStr',
                dataType: "json",
                data: {KCMC: $('#SSKC').val()},
                async: true,
                success: function (fzrdata) {
                    if (fzrdata.state[0]) {
                        fzrStr = "<option value='" + fzrdata.state[0]['KCFZR'] + "'>" + fzrdata.state[0].KCFZR + "</option>";
                    }
                    KCFZR.html(fzrStr);
                }
            });
            var zyStr = "";
            $.ajax({
                type: "post",
                url: '/assignService/getzyStr',
                dataType: "json",
                data: {JSXM: JSXM.val(), KCMC: SSKC.val()},
                async: true,
                success: function (data) {
                    if (data) {
                        for (var i = 0; i < data.state.length; i++) {
                            zyStr += "<option value='" + data.state[i].ZYMC + "'>" + data.state[i].ZYMC + "</option>";
                        }
                    }
                    SSZY.html(zyStr);
                    var njStr = "";
                    $.ajax({
                        type: "post",
                        url: '/assignService/getnjStr',
                        dataType: "json",
                        data: {JSXM: JSXM.val(), KCMC: SSKC.val(), ZYMC: SSZY.val()},
                        async: true,
                        success: function (data) {
                            if (data) {
                                for (var i = 0; i < data.state.length; i++) {
                                    njStr += "<option value='" + data.state[i].KSNJ + "'>" + data.state[i].KSNJ + "</option>";
                                }
                                SSNJ.html(njStr);
                                var bjStr = "";
                                $.ajax({
                                    type: "post",
                                    url: '/assignService/getbjStr',
                                    dataType: "json",
                                    data: {JSXM: JSXM.val(), KCMC: SSKC.val(), ZYMC: SSZY.val(), SSNJ: SSNJ.val()},
                                    async: true,
                                    success: function (data) {
                                        if (data.state.length>0) {                                                
                                            for (var b = 1; b <= data.state[0].BJGS; b++){
                                                bjStr += "<option value='" + b + "大班'>" + b + "大班</option>";
                                            }                                              
                                            SSBJ.html(bjStr);
                                            $.ajax({
                                                type: "post",
                                                url: '/majorService/getRS',
                                                dataType: "json",
                                                data: {ZYMC: SSZY.val(), SSNJ: SSNJ.val()},
                                                async: true,
                                                success: function (data) {
                                                    if (data && data.result.length > 0) {
                                                    $("#BJRS").val(data.result[0].GBDYRS);
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    });
});

SSKC.change(function () {
    $.ajax({
        type: "post",
        url: '/assignService/getfzrStr',
        dataType: "json",
        data: {KCMC: $('#SSKC').val()},
        async: true,
        success: function (fzrdata) {
            if (fzrdata) {
                fzrStr = "<option value='" + fzrdata.state[0].KCFZR + "'>" + fzrdata.state[0].KCFZR + "</option>";
            }
            KCFZR.html(fzrStr);
        }
    });
});

SSZY.change(function () {
    var njStr = "";
    $.ajax({
        type: "post",
        url: '/assignService/getnjStr',
        dataType: "json",
        data: {JSXM: JSXM.val(), KCMC: SSKC.val(), ZYMC: SSZY.val()},
        async: true,
        success: function (data) {
            if (data) {
                for (var i = 0; i < data.state.length; i++) {
                    njStr += "<option value='" + data.state[i].KSNJ + "'>" + data.state[i].KSNJ + "</option>";
                }
                SSNJ.html(njStr);
                var bjStr = "";
                $.ajax({
                    type: "post",
                    url: '/assignService/getbjStr',
                    dataType: "json",
                    data: {JSXM: JSXM.val(), KCMC: SSKC.val(), ZYMC: SSZY.val(), SSNJ: SSNJ.val()},
                    async: true,
                    success: function (data) {
                        if (data.state.length>0) {                                                
                            if (data.state[0].BJGS > 0) {
                                for (var b = 1; b <= data.state[0].BJGS; b++){
                                    bjStr += "<option value='" + b + "大班'>" + b + "大班</option>";
                                }
                            }                                                
                            SSBJ.html(bjStr);
                            $.ajax({
                                type: "post",
                                url: '/majorService/getRS',
                                dataType: "json",
                                data: {ZYMC: SSZY.val(), SSNJ: SSNJ.val()},
                                async: true,
                                success: function (data) {
                                    if (data && data.result.length > 0) {
                                        $("#BJRS").val(data.result[0].GBDYRS);
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
});

SSNJ.change(function () {
    var bjStr = "";
    $.ajax({
        type: "post",
        url: '/assignService/getbjStr',
        dataType: "json",
        data: {JSXM: JSXM.val(), KCMC: SSKC.val(), ZYMC: SSZY.val(), SSNJ: SSNJ.val()},
        async: true,
        success: function (data) {
            if (data.state.length>0) {                                                
                for (var b = 1; b <= data.state[0].BJGS; b++){
                    bjStr += "<option value='" + b + "大班'>" + b + "大班</option>";
                }                                              
                SSBJ.html(bjStr);
            }
            $.ajax({
                type: "post",
                url: '/majorService/getRS',
                dataType: "json",
                data: {ZYMC: SSZY.val(), SSNJ: SSNJ.val()},
                async: true,
                success: function (data) {
                    if (data && data.result.length > 0) {
                    $("#BJRS").val(data.result[0].GBDYRS);
                    }
                }
            });
        }
    });
});

function submitForm() {
    $.ajax({
        type: "post",
        url: '/assigncourse/_editAssign.html',
        dataType: "json",
        data: $('#assignform').serialize(),// 你的formid 注：后台req.body由控件name获取数据
        async: false,
        cache: true,
        success: function (msg) {
            if (msg.result != 0) {
                $("#modal-edit-event").modal('hide');
                var table = $('#assgindatatable').DataTable();
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
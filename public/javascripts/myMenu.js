/**
 * Created by peng on 2016/9/27.
 */

$(document).ready(function () {
    var menus = getFatherMenu();
    var son = getSonMenu();
    bindMenu(menus,son);
    createTable();
});

function getFatherMenu(){
    var data = [];
    $.ajax({
        type: "get",
        url: '/major/_getKsnj.html',
        dataType: "json",
        async: false,
        cache: true,
        success: function (msg) {
            if (msg.result != 0) {
                //alert(JSON.stringify(msg.result[0].KSNJ));
                data = msg;
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
    return data;
}

function  getSonMenu(){
    var data = [];
    $.ajax({
        type: "get",
        url: '/major/_getZymc.html',
        dataType: "json",
        async: false,
        cache: true,
        success: function (msg) {
            if (msg.result != 0) {
                //alert(JSON.stringify(msg.result[0].ZYMC));
                data = msg;
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
    return data;
}

function bindMenu(menus,son){

    var fatherMenus =menus.result;//获取父菜单项
    var sonMenus = son.result;
    var itemStr = "";

    for(var i = 0;i < fatherMenus.length;i++){
        //alert(fatherMenus[i].KSNJ);
        itemStr += "<div class='box box-solid'>";
        itemStr += "<div class='box-header with-border'>";
        itemStr += "<h3 class='box-title'>"+fatherMenus[i].KSNJ+"</h3>";
        itemStr += "<div class='box-tools'><button type='button' class='btn btn-box-tool' data-widget='collapse'><i class='fa fa-minus'></i></button></div>";
        itemStr += "</div>";
        itemStr += "<div class='box-body no-padding'>";
        itemStr += "<ul id='top_menu' class='nav nav-pills nav-stacked'>";
        for(var j = 0;j < sonMenus.length;j++){
            if(fatherMenus[i].KSNJ == sonMenus[j].KSNJ){
                if(tempStr == ""){
                    tempStr = fatherMenus[i].KSNJ+","+sonMenus[j].ZYMC;
                }
                itemStr += "<li><a href='/major_course/getData.html?ksnj="+fatherMenus[i].KSNJ+"&zymc="+sonMenus[j].ZYMC+"'><i class='fa fa-caret-right text-blue'></i>"+sonMenus[j].ZYMC+"</a></li>";
            }
        }
        itemStr += "</ul>";
        itemStr += "</div>";
        itemStr += "</div>";
    }
    $('#mymenus').append(itemStr);
    //$("#top_menu li:first a").click();
}
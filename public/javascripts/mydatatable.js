function CreateDataTable(id,url,columns) {
    var data_table=    $(id).dataTable({
        //"sScrollX": "100%", //表格的宽度
        "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 0 ] }],//第一列checkbox不排序
        "sScrollXInner": "100%", //表格的内容宽度
        "bScrollCollapse": true, //当显示的数据不足以支撑表格的默认的高度时，依然显示纵向的滚动条。(默认是false)
        "bPaginate": true, //是否显示分页
        "bLengthChange": true, //每页显示的记录数
        "bFilter": true, //搜索栏
        "bSort": true, //是否支持排序功能
        "bInfo": true, //显示表格信息
        "bAutoWidth": false, //自适应宽度
        "sAjaxSource": url, //mvc后台ajax调用接口。
        "aoColumns": columns,
        "bStateSave": true, //保存状态到cookie
        "bDestroy": false,
        "bRetrieve": false,
        //"sPaginationType": "full_numbers", //分页，一共两种样式，full_numbers和two_button(默认)
        "bDeferRender":true,//延迟渲染
        "oLanguage": {
            "sLengthMenu": "_MENU_ 条",
            "sZeroRecords": "对不起，查询不到任何相关数据",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
            "sInfoEmtpy": "找不到相关数据",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
            "sProcessing": "正在加载中...",
            "sSearch": "搜索",
            "oPaginate": {
                "sFirst": "第一页",
                "sPrevious": " 上一页 ",
                "sNext": " 下一页 ",
                "sLast": " 最后一页 "
            }
        },
        "aLengthMenu": [[10, 25, 50, -1, 1], ["10", "25", "50", "100", "200"]]  //设置每页显示记录的下拉菜单
    });
    return data_table;
}